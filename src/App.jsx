import { useState, useEffect } from 'react';
// Importaciones de MUI corregidas
import { Container, Box, Typography, Button, Divider } from '@mui/material';

// Importaciones de componentes locales
import ApartmentForm from './components/ApartmentForm';
import ApartmentList from './components/ApartmentList';
import FilterPanel from './components/FilterPanel';

function App() {
  // 1. ESTADOS
  const [apartamentos, setApartamentos] = useState([]);
  const [apartamentoEdit, setApartamentoEdit] = useState(null);
  const [filtros, setFiltros] = useState({
    minPrice: '', 
    maxPrice: '', 
    bedrooms: '', 
    bathrooms: '',
    parking: '',
    ac: 'all', 
    heating: 'all'
  });

  const API_URL = "http://127.0.0.1:8080/api/apartment";

  // 2. CARGAR DATOS
  const cargarApartamentos = async () => {
    try {
      const res = await fetch(`${API_URL}/getAll`);
      if (!res.ok) throw new Error("Error en la respuesta de la red");
      const data = await res.json();
      setApartamentos(data);
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  };

  useEffect(() => {
    cargarApartamentos();
  }, []);

  // 3. ACCIONES
  const eliminarApartamento = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este apartamento?")) return;
    try {
      await fetch(`${API_URL}/deleteById?id=${id}`, { method: 'DELETE' });
      cargarApartamentos();
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const prepararEdicion = (apt) => {
    setApartamentoEdit(apt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePopulate = async () => {
    try {
      await fetch(`${API_URL}/populate?qty=5`);
      cargarApartamentos();
    } catch (err) {
      console.error("Error al poblar base de datos:", err);
    }
  };

  // 4. RENDERIZADO
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* CABECERA CON BOTÓN DE POBLAR RESTAURADO */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" fontWeight="bold" color="primary">
            Predictor Engine
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Gestión Inmobiliaria Full-Stack | Alex Picanyol
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handlePopulate}
          sx={{ fontWeight: 'bold' }}
        >
          Poblar Base de Datos (5)
        </Button>
      </Box>

      {/* FORMULARIO DE ALTA / EDICIÓN */}
      <ApartmentForm 
        actualizarLista={cargarApartamentos} 
        editData={apartamentoEdit} 
        setEditData={setApartamentoEdit}
      />

      <Divider sx={{ my: 4 }} />

      {/* PANEL DE FILTROS COMPLETO */}
      <FilterPanel filtros={filtros} setFiltros={setFiltros} />

      {/* LISTADO DE RESULTADOS CON REVIEWS */}
      <ApartmentList 
        apartamentos={apartamentos} 
        filtros={filtros}
        eliminarApartamento={eliminarApartamento}
        prepararEdicion={prepararEdicion}
        actualizarLista={cargarApartamentos}
      />
    </Container>
  );
}

// EXPORTACIÓN OBLIGATORIA
export default App;