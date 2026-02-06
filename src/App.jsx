import { useState, useEffect } from 'react';
import { Container, Box, AppBar, Toolbar, Typography, CircularProgress, Button } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import ApartmentForm from './components/ApartmentForm';
import ApartmentList from './components/ApartmentList';
import FilterPanel from './components/FilterPanel';

function App() {
  const [apartamentos, setApartamentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const estadoInicialForm = {
    area: '', price: '', bedrooms: '', bathrooms: '', stories: '',
    mainroad: 'no', guestroom: 'no', basement: 'no',
    hotwaterheating: 'no', airconditioning: 'no',
    parking: '', prefarea: 'no', furnishingstatus: 'unfurnished'
  };

  const estadoInicialFiltros = {
    bedrooms: 'all',
    airconditioning: 'all',
    hotwaterheating: 'all'
  };

  const [nuevoApto, setNuevoApto] = useState(estadoInicialForm);
  const [filtros, setFiltros] = useState(estadoInicialFiltros);
  const [editandoId, setEditandoId] = useState(null);

  const cargarApartamentos = () => {
    setCargando(true);
    fetch('http://127.0.0.1:8080/api/apartment/getAll')
      .then(res => res.json())
      .then(data => {
        setApartamentos(Array.isArray(data) ? [...data].reverse() : []);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  };

  useEffect(() => { cargarApartamentos(); }, []);

  // LÓGICA DE FILTRADO DINÁMICO
  const apartamentosFiltrados = apartamentos.filter(apt => {
    const matchBedrooms = filtros.bedrooms === 'all' || apt.bedrooms === parseInt(filtros.bedrooms);
    const matchAir = filtros.airconditioning === 'all' || apt.airconditioning === filtros.airconditioning;
    const matchHeat = filtros.hotwaterheating === 'all' || apt.hotwaterheating === filtros.hotwaterheating;
    
    return matchBedrooms && matchAir && matchHeat;
  });

  const handlePopulate = () => {
    const cantidad = prompt("¿Cuántos registros fake deseas crear?", "10");
    if (!cantidad || isNaN(cantidad)) return;
    fetch(`http://127.0.0.1:8080/api/apartment/populate?qty=${cantidad}`)
      .then(res => {
        if (res.ok) { cargarApartamentos(); }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    const url = editandoId 
      ? `http://127.0.0.1:8080/api/apartment/updateById?id=${editandoId}` 
      : 'http://127.0.0.1:8080/api/apartment/create';
    
    fetch(url, {
      method: editandoId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoApto)
    })
    .then(res => res.json())
    .then(data => {
      if (editandoId) {
        setApartamentos(apartamentos.map(apt => apt.id === editandoId ? data : apt));
      } else {
        setApartamentos([data, ...apartamentos]);
      }
      setEditandoId(null);
      setNuevoApto(estadoInicialForm);
      setEnviando(false);
    });
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', pb: 4 }}>
      <AppBar position="static" sx={{ mb: 4, bgcolor: '#1565c0' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">🏢 Apartment Engine 2026</Typography>
          <Button variant="contained" color="secondary" startIcon={<StorageIcon />} onClick={handlePopulate}>
            Popular DB
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <ApartmentForm 
          nuevoApto={nuevoApto} setNuevoApto={setNuevoApto} 
          handleSubmit={handleSubmit} editandoId={editandoId} 
          cancelarEdicion={() => { setEditandoId(null); setNuevoApto(estadoInicialForm); }} 
          enviando={enviando} 
        />

        <FilterPanel 
          filtros={filtros} 
          setFiltros={setFiltros} 
          resetFiltros={() => setFiltros(estadoInicialFiltros)} 
        />

        {cargando ? (
           <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
        ) : (
          <ApartmentList 
            apartamentos={apartamentosFiltrados} 
            prepararEdicion={(apt) => { setEditandoId(apt.id); setNuevoApto({...apt}); window.scrollTo(0,0); }} 
            eliminarApartamento={(id) => {
              if(window.confirm("¿Eliminar?")) {
                fetch(`http://127.0.0.1:8080/api/apartment/deleteById?id=${id}`, {method: 'DELETE'})
                .then(() => setApartamentos(apartamentos.filter(a => a.id !== id)));
              }
            }} 
          />
        )}
      </Container>
    </Box>
  );
}

export default App;