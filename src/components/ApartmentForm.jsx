import { Box, Typography, TextField, Button, MenuItem, Paper, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

const ApartmentForm = ({ nuevoApto, setNuevoApto, handleSubmit, editandoId, cancelarEdicion, enviando }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoApto({ ...nuevoApto, [name]: value });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
        {editandoId ? '🔧 Editando Apartamento' : '🆕 Registrar Nueva Propiedad'}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* SECCIÓN BÁSICA */}
          <Grid item xs={12}><Divider>Datos Principales</Divider></Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Área (m²)" name="area" type="number" value={nuevoApto.area} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Precio (€)" name="price" type="number" value={nuevoApto.price} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField select fullWidth label="Amueblado" name="furnishingstatus" value={nuevoApto.furnishingstatus} onChange={handleChange}>
              <MenuItem value="furnished">Amueblado</MenuItem>
              <MenuItem value="semi-furnished">Semi-Amueblado</MenuItem>
              <MenuItem value="unfurnished">Sin Amueblar</MenuItem>
            </TextField>
          </Grid>

          {/* SECCIÓN ESTRUCTURA */}
          <Grid item xs={12}><Divider>Distribución</Divider></Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Habitaciones" name="bedrooms" type="number" value={nuevoApto.bedrooms} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Baños" name="bathrooms" type="number" value={nuevoApto.bathrooms} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="Plantas" name="stories" type="number" value={nuevoApto.stories} onChange={handleChange} required />
            </Grid>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField fullWidth label="Parking" name="parking" type="number" value={nuevoApto.parking} onChange={handleChange} required />
          </Grid>

          {/* SECCIÓN CARACTERÍSTICAS (SI/NO) */}
          <Grid item xs={12}><Divider>Extras y Ubicación</Divider></Grid>
          {[
            { name: 'mainroad', label: 'Carretera Principal' },
            { name: 'guestroom', label: 'Hab. Invitados' },
            { name: 'basement', label: 'Sótano' },
            { name: 'hotwaterheating', label: 'Agua Caliente' },
            { name: 'airconditioning', label: 'Aire Acond.' },
            { name: 'prefarea', label: 'Zona Preferente' }
          ].map((item) => (
            <Grid item xs={6} sm={4} key={item.name}>
              <TextField select fullWidth label={item.label} name={item.name} value={nuevoApto[item.name]} onChange={handleChange}>
                <MenuItem value="yes">Sí</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            </Grid>
          ))}

          <Grid item xs={12} sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button fullWidth variant="contained" type="submit" startIcon={<SaveIcon />} disabled={enviando}>
              {editandoId ? 'Actualizar Registro' : 'Guardar Propiedad'}
            </Button>
            {editandoId && (
              <Button variant="outlined" color="error" onClick={cancelarEdicion} startIcon={<CloseIcon />}>
                Cancelar
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ApartmentForm;