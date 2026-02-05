import { useState, useEffect } from 'react';
import { 
  Container, Typography, TextField, Button, Card, CardContent, 
  CardActions, Grid, Box, AppBar, Toolbar, IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddHomeIcon from '@mui/icons-material/AddHome';

function App() {
  const [apartamentos, setApartamentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nuevoApto, setNuevoApto] = useState({ title: '', location: '', price: '' });

  const fetchApartments = () => {
    fetch('http://127.0.0.1:8080/api/apartment/getAll')
      .then(res => res.json())
      .then(data => {
        setApartamentos(data);
        setCargando(false);
      })
      .catch(err => setCargando(false));
  };

  useEffect(() => { fetchApartments(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8080/api/apartment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoApto)
    })
    .then(res => res.json())
    .then(data => {
      setApartamentos([...apartamentos, data]);
      setNuevoApto({ title: '', location: '', price: '' });
    });
  };

  const eliminarApartamento = (id) => {
    if (window.confirm("¿Borrar este apartamento?")) {
      fetch(`http://127.0.0.1:8080/api/apartment/deleteById?id=${id}`, { method: 'DELETE' })
      .then(() => setApartamentos(apartamentos.filter(apt => apt.id !== id)));
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh', pb: 4 }}>
      {/* Barra de navegación superior */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🏢 Apartment Predictor
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        {/* Formulario Material UI */}
        <Box component="form" onSubmit={handleSubmit} sx={{ 
          bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 3, mb: 5 
        }}>
          <Typography variant="h5" gutterBottom color="primary">
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
                startIcon={<AddHomeIcon />} size="large"
              >
                Guardar Apartamento
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Listado en Grid de Material UI */}
        <Grid container spacing={3}>
          {apartamentos.map((apt) => (
            <Grid item xs={12} sm={6} md={4} key={apt.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { boxShadow: 10 } }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {apt.title}
                  </Typography>
                  <Typography color="text.secondary">
                    📍 {apt.location}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', color: '#2e7d32' }}>
                    {apt.price} €
                  </Typography>
                </CardContent>
                <CardActions>
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