import { Paper, Grid, TextField, MenuItem, Typography, Box, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const FilterPanel = ({ filtros, setFiltros, resetFiltros, totalVisibles }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: '#f8f9fa', borderLeft: '5px solid #1565c0' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Filtros Avanzados</Typography>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            Mostrando: {totalVisibles} propiedades
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Habitaciones */}
        <Grid item xs={6} sm={2.4}>
          <TextField select fullWidth label="Habitaciones" name="bedrooms" value={filtros.bedrooms} onChange={handleChange} size="small">
            <MenuItem value="all">Cualquiera</MenuItem>
            {[1, 2, 3, 4, 5, 6].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </TextField>
        </Grid>

        {/* Baños */}
        <Grid item xs={6} sm={2.4}>
          <TextField select fullWidth label="Baños" name="bathrooms" value={filtros.bathrooms} onChange={handleChange} size="small">
            <MenuItem value="all">Cualquiera</MenuItem>
            {[1, 2, 3, 4].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </TextField>
        </Grid>

        {/* Parking */}
        <Grid item xs={6} sm={2.4}>
          <TextField select fullWidth label="Parking" name="parking" value={filtros.parking} onChange={handleChange} size="small">
            <MenuItem value="all">Cualquiera</MenuItem>
            {[0, 1, 2, 3].map(n => <MenuItem key={n} value={n}>{n} plazas</MenuItem>)}
          </TextField>
        </Grid>

        {/* Aire Acondicionado */}
        <Grid item xs={6} sm={2.4}>
          <TextField select fullWidth label="Aire Acond." name="airconditioning" value={filtros.airconditioning} onChange={handleChange} size="small">
            <MenuItem value="all">Indiferente</MenuItem>
            <MenuItem value="yes">Con Aire</MenuItem>
            <MenuItem value="no">Sin Aire</MenuItem>
          </TextField>
        </Grid>

        {/* Botón Reset */}
        <Grid item xs={12} sm={2.4}>
          <Button fullWidth variant="outlined" startIcon={<RestartAltIcon />} onClick={resetFiltros} color="error" size="medium">
            Limpiar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterPanel;