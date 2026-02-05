import { useState, useEffect } from 'react';
import { 
  Container, Typography, TextField, Button, Card, CardContent, 
  CardActions, Grid, Box, AppBar, Toolbar, InputAdornment, CircularProgress 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddHomeIcon from '@mui/icons-material/AddHome';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  const [apartamentos, setApartamentos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [nuevoApto, setNuevoApto] = useState({ title: '', location: '', price: '' });

  const fetchApartments = () => {
    fetch('http://127.0.0.1:8080/api/apartment/getAll')
      .then(res => res.json())
      .then(data => {
        // Verificamos que 'data' sea un array antes de hacer reverse
        setApartamentos(Array.isArray(data) ? [...data].reverse() : []);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setCargando(false);
      });
  };

  useEffect(() => { fetchApartments(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    fetch('http://127.0.0.1:8080/api/apartment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoApto)
    })
    .then(res => res.json())
    .then(data => {
      setApartamentos([data, ...apartamentos]);
      setNuevoApto({ title: '', location: '', price: '' });
      setEnviando(false);
    })
    .catch(err => {
      alert("Error al crear");
      setEnviando(false);
    });
  };

  const eliminarApartamento = (id) => {
    if (window.confirm("¿Borrar este apartamento?")) {
      fetch(`http://127.0.0.1:8080/api/apartment/deleteById?id=${id}`, { method: 'DELETE' })
      .then(() => setApartamentos(apartamentos.filter(apt => apt.id !== id)));
    }
  };

  // --- LÓGICA DE FILTRADO BLINDADA (Aquí estaba el fallo) ---
  const apartamentosFiltrados = apartamentos.filter(apt => {
    // Si apt.title es null o undefined, usamos un string vacío "" para que no explote
    const titulo = (apt.title || "").toLowerCase();
    const ubicacion = (apt.location || "").toLowerCase();
    const termino = (busqueda || "").toLowerCase();
    
    return titulo.includes(termino) || ubicacion.includes(termino);
  });

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando datos de Java...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh', pb: 4 }}>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6">🏢 Apartment Predictor</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        {/* FORMULARIO */}
        <Box component="form" onSubmit={handleSubmit} sx={{ 
          bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 1, mb: 4 
        }}>
          <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
            Registrar Propiedad
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth label="Título" variant="outlined" 
                value={nuevoApto.title}
                onChange={(e) => setNuevoApto({...nuevoApto, title: e.target.value})}
                required 
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth label="Ubicación" variant="outlined" 
                value={nuevoApto.location}
                onChange={(e) => setNuevoApto({...nuevoApto, location: e.target.value})}
                required 
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth label="Precio (€)" variant="outlined" type="number"
                value={nuevoApto.price}
                onChange={(e) => setNuevoApto({...nuevoApto, price: e.target.value})}
                required 
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                fullWidth variant="contained" type="submit" 
                startIcon={enviando ? <CircularProgress size={20} color="inherit" /> : <AddHomeIcon />} 
                size="large"
                disabled={enviando}
              >
                {enviando ? 'Guardando...' : 'Guardar Apartamento'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* BÚSQUEDA */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Buscar por título o ubicación..."
            variant="outlined"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: 'white' }}
          />
        </Box>

        {/* LISTADO */}
        <Grid container spacing={3}>
          {apartamentosFiltrados.map((apt) => (
            <Grid item xs={12} sm={6} md={4} key={apt.id}>
              <Card sx={{ 
                height: '100%', display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', transition: '0.3s', 
                '&:hover': { boxShadow: 6, transform: 'translateY(-4px)' } 
              }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    📍 {apt.location || 'Sin ubicación'}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {apt.title || 'Sin título'}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2, color: '#2e7d32', fontWeight: 'bold' }}>
                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(apt.price || 0)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', pb: 2, pr: 2 }}>
                  <Button 
                    size="small" color="error" startIcon={<DeleteIcon />}
                    onClick={() => eliminarApartamento(apt.id)}
                  >
                    Borrar
                  </Button>
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