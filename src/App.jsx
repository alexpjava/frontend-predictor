import { useState, useEffect } from 'react';
import { Container, TextField, Box, AppBar, Toolbar, Typography, InputAdornment, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ApartmentForm from './components/ApartmentForm';
import ApartmentList from './components/ApartmentList';

function App() {
  const [apartamentos, setApartamentos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  // ESTADO INICIAL COMPLETO (Sincronizado con Apartment.java)
  const estadoInicial = {
    area: '', price: '', bedrooms: '', bathrooms: '', stories: '',
    mainroad: 'no', guestroom: 'no', basement: 'no',
    hotwaterheating: 'no', airconditioning: 'no',
    parking: '', prefarea: 'no', furnishingstatus: 'unfurnished'
  };

  const [nuevoApto, setNuevoApto] = useState(estadoInicial);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/apartment/getAll')
      .then(res => res.json())
      .then(data => {
        setApartamentos(Array.isArray(data) ? [...data].reverse() : []);
        setCargando(false);
      });
  }, []);

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
    setNuevoApto({ ...apt }); // Copiamos todos los campos del objeto que viene de Java
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cargando) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f0f2f5', minHeight: '100vh', pb: 4 }}>
      <AppBar position="static" sx={{ mb: 4, bgcolor: '#1565c0' }}>
        <Toolbar><Typography variant="h6">🏢 Apartment Predictor Engine</Typography></Toolbar>
      </AppBar>

      <Container>
        <ApartmentForm 
          nuevoApto={nuevoApto} setNuevoApto={setNuevoApto} 
          handleSubmit={handleSubmit} editandoId={editandoId} 
          cancelarEdicion={() => { setEditandoId(null); setNuevoApto(estadoInicial); }} 
          enviando={enviando} 
        />

        <TextField fullWidth sx={{ mb: 4, bgcolor: 'white' }} 
          placeholder="Buscar por ID, Área o Estado..." 
          onChange={(e) => setBusqueda(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} 
        />

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
      </Container>
    </Box>
  );
}

export default App;