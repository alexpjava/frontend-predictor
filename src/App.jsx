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
  const [nuevoApto, setNuevoApto] = useState({ area: '', price: '', bedrooms: '', bathrooms: '', furnishingstatus: 'unfurnished' });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/apartment/getAll')
      .then(res => res.json())
      .then(data => {
        setApartamentos(Array.isArray(data) ? [...data].reverse() : []);
        setCargando(false);
      })
      .catch(() => setCargando(false));
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
      setNuevoApto({ area: '', price: '', bedrooms: '', bathrooms: '', furnishingstatus: 'unfurnished' });
      setEnviando(false);
    });
  };

  const eliminarApartamento = (id) => {
    if (window.confirm("¿Borrar?")) {
      fetch(`http://127.0.0.1:8080/api/apartment/deleteById?id=${id}`, { method: 'DELETE' })
      .then(() => setApartamentos(apartamentos.filter(apt => apt.id !== id)));
    }
  };

  const prepararEdicion = (apt) => {
    setEditandoId(apt.id);
    setNuevoApto({ area: apt.area, price: apt.price, bedrooms: apt.bedrooms, bathrooms: apt.bathrooms, furnishingstatus: apt.furnishingstatus });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filtrados = apartamentos.filter(apt => 
    apt.area?.toString().includes(busqueda) || apt.furnishingstatus?.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f7fa', minHeight: '100vh', pb: 4 }}>
      <AppBar position="static" sx={{ mb: 4, bgcolor: '#2c3e50' }}>
        <Toolbar><Typography variant="h6">🏠 Apartment Predictor</Typography></Toolbar>
      </AppBar>

      <Container>
        <ApartmentForm 
          nuevoApto={nuevoApto} 
          setNuevoApto={setNuevoApto} 
          handleSubmit={handleSubmit} 
          editandoId={editandoId} 
          cancelarEdicion={() => setEditandoId(null)} 
          enviando={enviando} 
        />

        <TextField fullWidth sx={{ mb: 4, bgcolor: 'white' }} placeholder="Buscar..." value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />

        <ApartmentList 
          apartamentos={filtrados} 
          prepararEdicion={prepararEdicion} 
          eliminarApartamento={eliminarApartamento} 
        />
      </Container>
    </Box>
  );
}

export default App;