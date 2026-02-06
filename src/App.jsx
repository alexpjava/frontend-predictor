import { useState, useEffect } from 'react';
import { Container, TextField, Box, AppBar, Toolbar, Typography, InputAdornment, CircularProgress, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StorageIcon from '@mui/icons-material/Storage';
import ApartmentForm from './components/ApartmentForm';
import ApartmentList from './components/ApartmentList';

function App() {
  const [apartamentos, setApartamentos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const estadoInicial = {
    area: '', price: '', bedrooms: '', bathrooms: '', stories: '',
    mainroad: 'no', guestroom: 'no', basement: 'no',
    hotwaterheating: 'no', airconditioning: 'no',
    parking: '', prefarea: 'no', furnishingstatus: 'unfurnished'
  };

  const [nuevoApto, setNuevoApto] = useState(estadoInicial);
  const [editandoId, setEditandoId] = useState(null);

  // Función para obtener todos los apartamentos
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

  useEffect(() => {
    cargarApartamentos();
  }, []);

  // Función para POPULAR la base de datos
  const handlePopulate = () => {
    const cantidad = prompt("¿Cuántos registros fake deseas crear?", "10");
    if (!cantidad || isNaN(cantidad)) return;

    fetch(`http://127.0.0.1:8080/api/apartment/populate?qty=${cantidad}`)
      .then(res => {
        if (res.ok) {
          alert(`¡Éxito! Se han creado ${cantidad} registros.`);
          cargarApartamentos(); // Recargamos la lista automáticamente
        } else {
          alert("Error al popular la base de datos.");
        }
      })
      .catch(err => console.error("Error:", err));
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
      setNuevoApto(estadoInicial);
      setEnviando(false);
    });
  };

  const prepararEdicion = (apt) => {
    setEditandoId(apt.id);
    setNuevoApto({ ...apt });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', pb: 4 }}>
      <AppBar position="static" sx={{ mb: 4, bgcolor: '#1565c0' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">🏢 Apartment Predictor Engine</Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<StorageIcon />}
            onClick={handlePopulate}
            sx={{ fontWeight: 'bold' }}
          >
            Popular DB (H2)
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <ApartmentForm 
          nuevoApto={nuevoApto} setNuevoApto={setNuevoApto} 
          handleSubmit={handleSubmit} editandoId={editandoId} 
          cancelarEdicion={() => { setEditandoId(null); setNuevoApto(estadoInicial); }} 
          enviando={enviando} 
        />

        <TextField fullWidth sx={{ mb: 4, bgcolor: 'white' }} 
          placeholder="Filtrar por área..." 
          onChange={(e) => setBusqueda(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} 
        />

        {cargando ? (
           <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
        ) : (
          <ApartmentList 
            apartamentos={apartamentos.filter(a => a.area.toString().includes(busqueda))} 
            prepararEdicion={prepararEdicion} 
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