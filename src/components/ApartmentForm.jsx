import { useState, useEffect } from 'react';
import { 
  TextField, Button, Grid, Paper, Typography, Box, 
  MenuItem, FormControlLabel, Switch 
} from '@mui/material';

const ApartmentForm = ({ actualizarLista, editData, setEditData }) => {
  const initialState = {
    price: '', area: '', bedrooms: '', bathrooms: '',
    stories: '', mainroad: 'no', guestroom: 'no',
    basement: 'no', hotwaterheating: 'no', airconditioning: 'no',
    parking: '', prefarea: 'no', furnishingstatus: 'unfurnished'
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData(initialState);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editData 
      ? `http://127.0.0.1:8080/api/apartment/updateById?id=${editData.id}` 
      : `http://127.0.0.1:8080/api/apartment/create`;
    
    const method = editData ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setEditData(null);
        setFormData(initialState);
        actualizarLista();
      }
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
        {editData ? "📝 Editar Propiedad" : "🏠 Registrar Nueva Propiedad"}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Campos Numéricos Principales */}
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Precio (€)" name="price" type="number" value={formData.price || ''} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Área (m²)" name="area" type="number" value={formData.area || ''} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField fullWidth label="Habitaciones" name="bedrooms" type="number" value={formData.bedrooms || ''} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField fullWidth label="Baños" name="bathrooms" type="number" value={formData.bathrooms || ''} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField fullWidth label="Plantas" name="stories" type="number" value={formData.stories || ''} onChange={handleChange} required />
          </Grid>

          {/* Características Adicionales (Selects) */}
          <Grid item xs={12} sm={3}>
            <TextField select fullWidth label="Parking" name="parking" value={formData.parking || ''} onChange={handleChange} required>
              {[0, 1, 2, 3].map(n => <MenuItem key={n} value={n}>{n} Plazas</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField select fullWidth label="Estado Muebles" name="furnishingstatus" value={formData.furnishingstatus || 'unfurnished'} onChange={handleChange}>
              <MenuItem value="furnished">Amueblado</MenuItem>
              <MenuItem value="semi-furnished">Semi-amueblado</MenuItem>
              <MenuItem value="unfurnished">Sin amueblar</MenuItem>
            </TextField>
          </Grid>

          {/* Switches / Selects de Sí/No para booleanos de la DB */}
          {[
            { name: 'mainroad', label: 'Carretera Principal' },
            { name: 'guestroom', label: 'Hab. Invitados' },
            { name: 'basement', label: 'Sótano' },
            { name: 'hotwaterheating', label: 'Agua Caliente' },
            { name: 'airconditioning', label: 'A/C' },
            { name: 'prefarea', label: 'Zona Preferente' }
          ].map((item) => (
            <Grid item xs={6} sm={2} key={item.name}>
              <TextField select fullWidth label={item.label} name={item.name} value={formData[item.name] || 'no'} onChange={handleChange} size="small">
                <MenuItem value="yes">Sí</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            </Grid>
          ))}

          <Grid item xs={12} sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              {editData ? "Guardar Cambios" : "Crear Apartamento"}
            </Button>
            {editData && (
              <Button onClick={() => setEditData(null)} variant="outlined" color="inherit">
                Cancelar Edición
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ApartmentForm;