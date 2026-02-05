import { useState, useEffect } from 'react';
import { 
  Container, Typography, TextField, Button, Card, CardContent, 
  CardActions, Box, AppBar, Toolbar, InputAdornment, CircularProgress,
  Grid, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddHomeIcon from '@mui/icons-material/AddHome';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [apartamentos, setApartamentos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  
  // 1. Estado sincronizado con tu modelo Java Apartment.java
  const [nuevoApto, setNuevoApto] = useState({ 
    area: '', 
    price: '', 
    bedrooms: '', 
    bathrooms: '',
    furnishingstatus: 'unfurnished' // valor por defecto
  });
  const [editandoId, setEditandoId] = useState(null);

  const fetchApartments = () => {
    fetch('http://127.0.0.1:8080/api/apartment/getAll')
      .then(res => res.json())
      .then(data => {
        setApartamentos(Array.isArray(data) ? [...data].reverse() : []);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setCargando(false);
      });
  };

  useEffect(() => { fetchApartments(); }, []);

  const prepararEdicion = (apt) => {
    setEditandoId(apt.id);
    setNuevoApto({ 
      area: apt.area || '', 
      price: apt.price || '', 
      bedrooms: apt.bedrooms || '', 
      bathrooms: apt.bathrooms || '',
      furnishingstatus: apt.furnishingstatus || 'unfurnished'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNuevoApto({ area: '', price: '', bedrooms: '', bathrooms: '', furnishingstatus: 'unfurnished' });
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
      cancelarEdicion();
      setEnviando(false);
    })
    .catch(err => {
      alert("Error al guardar");
      setEnviando(false);
    });
  };

  const eliminarApartamento = (id) => {
    if (window.confirm("¿Borrar?")) {
      fetch(`http://127.0.0.1:8080/api/apartment/deleteById?id=${id}`, { method: 'DELETE' })
      .then(() => setApartamentos(apartamentos.filter(apt => apt.id !== id)));
    }
  };

  // 2. Filtrado por área o estado de amueblado
  const filtrados = apartamentos.filter(apt => {
    const areaStr = (apt.area || "").toString();
    const status = (apt.furnishingstatus || "").toLowerCase();
    const termino = busqueda.toLowerCase();
    return areaStr.includes(termino) || status.includes(termino);
  });

  if (cargando) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f7fa', minHeight: '100vh', pb: 4 }}>
      <AppBar position="static" sx={{ mb: 4, bgcolor: '#2c3e50' }}>
        <Toolbar><Typography variant="h6">🏠 Apartment Predictor</Typography></Toolbar>
      </AppBar>

      <Container>
        {/* FORMULARIO ADAPTADO A TU MODELO */}
        <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 3, mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>{editandoId ? 'Editar Apartamento' : 'Nuevo Registro'}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="Área (m²)" type="number" value={nuevoApto.area}
                onChange={(e) => setNuevoApto({...nuevoApto, area: e.target.value})} required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="Precio (€)" type="number" value={nuevoApto.price}
                onChange={(e) => setNuevoApto({...nuevoApto, price: e.target.value})} required />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField fullWidth label="Habitaciones" type="number" value={nuevoApto.bedrooms}
                onChange={(e) => setNuevoApto({...nuevoApto, bedrooms: e.target.value})} required />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField fullWidth label="Baños" type="number" value={nuevoApto.bathrooms}
                onChange={(e) => setNuevoApto({...nuevoApto, bathrooms: e.target.value})} required />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField select fullWidth label="Estado" value={nuevoApto.furnishingstatus}
                onChange={(e) => setNuevoApto({...nuevoApto, furnishingstatus: e.target.value})}>
                <MenuItem value="furnished">Amueblado</MenuItem>
                <MenuItem value="semi-furnished">Semi</MenuItem>
                <MenuItem value="unfurnished">Sin amueblar</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
              <Button fullWidth variant="contained" type="submit" color={editandoId ? "warning" : "primary"} disabled={enviando}>
                {enviando ? <CircularProgress size={24} /> : (editandoId ? 'Actualizar' : 'Guardar')}
              </Button>
              {editandoId && <Button variant="outlined" onClick={cancelarEdicion}>Cancelar</Button>}
            </Grid>
          </Grid>
        </Box>

        <TextField fullWidth sx={{ mb: 4, bgcolor: 'white' }} placeholder="Buscar por área o estado..." value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />

        <Grid container spacing={3}>
          {filtrados.map((apt) => (
            <Grid item xs={12} sm={6} md={4} key={apt.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="text.secondary" variant="caption" sx={{ textTransform: 'uppercase' }}>
                    {apt.furnishingstatus}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Apartamento de {apt.area} m²
                  </Typography>
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item><Typography variant="body2">🛏️ {apt.bedrooms} Hab.</Typography></Grid>
                    <Grid item><Typography variant="body2">🚿 {apt.bathrooms} Baños</Typography></Grid>
                  </Grid>
                  <Typography variant="h5" sx={{ mt: 2, color: '#1b5e20', fontWeight: 'bold' }}>
                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(apt.price)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button size="small" startIcon={<EditIcon />} onClick={() => prepararEdicion(apt)}>Editar</Button>
                  <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => eliminarApartamento(apt.id)}>Borrar</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;