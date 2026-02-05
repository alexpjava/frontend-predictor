import { Box, Typography, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import AddHomeIcon from '@mui/icons-material/AddHome';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const ApartmentForm = ({ nuevoApto, setNuevoApto, handleSubmit, editandoId, cancelarEdicion, enviando }) => {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 3, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {editandoId ? 'Editar Apartamento' : 'Nuevo Registro'}
      </Typography>
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
  );
};

export default ApartmentForm;