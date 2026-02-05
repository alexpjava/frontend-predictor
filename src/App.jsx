import { useState, useEffect } from 'react';
import { 
  Container, Typography, TextField, Button, Card, CardContent, 
  CardActions, Box, AppBar, Toolbar, InputAdornment, CircularProgress,
  Grid 
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
  
  // Estado para el formulario (Crear/Editar)
  const [nuevoApto, setNuevoApto] = useState({ title: '', location: '', price: '' });
  const [editandoId, setEditandoId] = useState(null);

  // 1. Cargar lista desde Java
  const fetchApartments = () => {
    fetch('http://127.0.0.1:8080/api/apartment/getAll')
      .then(res => res.json())
      .then(data => {
        setApartamentos(Array.isArray(data) ? [...data].reverse() : []);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al cargar:", err);
        setCargando(false);
      });
  };

  useEffect(() => { fetchApartments(); }, []);

  // 2. Cargar datos en el formulario para editar
  const prepararEdicion = (apt) => {
    setEditandoId(apt.id);
    setNuevoApto({ 
      title: apt.title || '', 
      location: apt.location || '', 
      price: apt.price || '' 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Limpiar formulario y volver a modo "Crear"
  const cancelarEdicion = () => {
    setEditandoId(null);
    setNuevoApto({ title: '', location: '', price: '' });
  };

  // 4. Enviar datos (POST para crear, PUT para editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);

    // Sincronizado con tu ApartmentRestController.java -> @PutMapping("/updateById")
    const url = editandoId 
      ? `http://127.0.0.1:8080/api/apartment/updateById?id=${editandoId}` 
      : 'http://127.0.0.1:8080/api/apartment/create';
    
    const method = editandoId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoApto)
    })
    .then(res => {
      if (!res.ok) throw new Error("Error en la respuesta del servidor");
      return res.json();
    })
    .then(data => {
      if (editandoId) {
        // Actualizar en la lista localmente
        setApartamentos(apartamentos.map(apt => apt.id === editandoId ? data : apt));
      } else {
        // Añadir nuevo a la lista
        setApartamentos([data, ...apartamentos]);
      }
      cancelarEdicion();
      setEnviando(false);
    })
    .catch(err => {
      console.error(err);
      alert("Error al guardar. Verifica que el servidor Java esté activo y acepte la ruta.");
      setEnviando(false);
    });
  };

  // 5. Eliminar apartamento
  const eliminarApartamento = (id) => {
    if (window.confirm("¿Seguro que quieres borrarlo?")) {
      fetch(`http://127.0.0.1:8080/api/apartment/deleteById?id=${id}`, { method: 'DELETE' })
      .then(() => {
        setApartamentos(apartamentos.filter(apt => apt.id !== id));
      })
      .catch(err => console.error("Error al borrar:", err));
    }
  };

  // 6. Filtrar por búsqueda (Blindado contra nulos)
  const filtrados = apartamentos.filter(apt => {
    const titulo = (apt.title || "").toLowerCase();
    const ubicacion = (apt.location || "").toLowerCase();
    const termino = busqueda.toLowerCase();
    return titulo.includes(termino) || ubicacion.includes(termino);
  });

  if (cargando) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
      <Typography sx={{ ml: 2 }}>Conectando con API Java...</Typography>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f7fa', minHeight: '100vh', pb: 4 }}>
      <AppBar position="static" sx={{ mb: 4, bgcolor: '#2c3e50' }}>
        <Toolbar>
          <Typography variant="h6">🏢 Apartment Predictor FullStack</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        {/* FORMULARIO */}
        <Box component="form" onSubmit={handleSubmit} sx={{ 
          bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 3, mb: 4,
          borderLeft: editandoId ? '6px solid #ed6c02' : 'none' 
        }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            {editandoId ? 'Editar Apartamento' : 'Nuevo Apartamento'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth label="Título" 
                value={nuevoApto.title || ''} 
                onChange={(e) => setNuevoApto({...nuevoApto, title: e.target.value})} 
                required 
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth label="Ubicación" 
                value={nuevoApto.location || ''} 
                onChange={(e) => setNuevoApto({...nuevoApto, location: e.target.value})} 
                required 
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth label="Precio (€)" type="number"
                value={nuevoApto.price || ''} 
                onChange={(e) => setNuevoApto({...nuevoApto, price: e.target.value})} 
                required 
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
              <Button 
                fullWidth variant="contained" type="submit" 
                color={editandoId ? "warning" : "primary"}
                startIcon={enviando ? <CircularProgress size={20} color="inherit"/> : (editandoId ? <EditIcon /> : <AddHomeIcon />)}
                disabled={enviando}
              >
                {enviando ? 'Enviando...' : (editandoId ? 'Actualizar' : 'Guardar')}
              </Button>
              {editandoId && (
                <Button variant="outlined" color="inherit" onClick={cancelarEdicion}>
                  Cancelar
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>

        {/* BUSCADOR */}
        <TextField
          fullWidth placeholder="Filtrar por nombre o ubicación..."
          value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
          sx={{ mb: 4, bgcolor: 'white' }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        />

        {/* LISTADO */}
        <Grid container spacing={3}>
          {filtrados.map((apt) => (
            <Grid item xs={12} sm={6} md={4} key={apt.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="caption" color="text.secondary">📍 {apt.location}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{apt.title}</Typography>
                  <Typography variant="h5" sx={{ mt: 1, color: '#1b5e20', fontWeight: 'bold' }}>
                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(apt.price)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button size="small" startIcon={<EditIcon />} onClick={() => prepararEdicion(apt)}>
                    Editar
                  </Button>
                  <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => eliminarApartamento(apt.id)}>
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