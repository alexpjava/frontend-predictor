import { Grid, TextField, MenuItem, Paper, Typography } from '@mui/material';

const FilterPanel = ({ filtros, setFiltros }) => {
  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  return (
    <Paper sx={{ p: 3, mb: 4, bgcolor: '#f8f9fa', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>Panel de Búsqueda Avanzada</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Precio Mín" name="minPrice" type="number" value={filtros.minPrice} onChange={handleChange} size="small" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField fullWidth label="Precio Máx" name="maxPrice" type="number" value={filtros.maxPrice} onChange={handleChange} size="small" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label="Habitaciones" name="bedrooms" select value={filtros.bedrooms} onChange={handleChange} size="small">
            <MenuItem value="">Todas</MenuItem>
            {[1, 2, 3, 4, 5, 6].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label="Baños" name="bathrooms" select value={filtros.bathrooms} onChange={handleChange} size="small">
            <MenuItem value="">Todos</MenuItem>
            {[1, 2, 3, 4].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label="Parking" name="parking" select value={filtros.parking} onChange={handleChange} size="small">
            <MenuItem value="">Todos</MenuItem>
            {[0, 1, 2, 3].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Aire Acondicionado" name="ac" select value={filtros.ac} onChange={handleChange} size="small">
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="yes">Con A/C</MenuItem>
            <MenuItem value="no">Sin A/C</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Agua Caliente" name="heating" select value={filtros.heating} onChange={handleChange} size="small">
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="yes">Con Calefacción</MenuItem>
            <MenuItem value="no">Sin Calefacción</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterPanel;