import { Paper, Grid, TextField, MenuItem, Typography, Box, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const FilterPanel = ({ filtros, setFiltros, resetFiltros }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: '#f8f9fa' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
        <FilterListIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Filtros Avanzados</Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Filtro por Habitaciones */}
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Habitaciones"
            name="bedrooms"
            value={filtros.bedrooms}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="all">Cualquiera</MenuItem>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <MenuItem key={n} value={n}>{n} Habitaciones</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Filtro por Aire Acondicionado */}
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Aire Acondicionado"
            name="airconditioning"
            value={filtros.airconditioning}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="all">Indiferente</MenuItem>
            <MenuItem value="yes">Con Aire</MenuItem>
            <MenuItem value="no">Sin Aire</MenuItem>
          </TextField>
        </Grid>

        {/* Filtro por Calefacción */}
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Calefacción"
            name="hotwaterheating"
            value={filtros.hotwaterheating}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="all">Indiferente</MenuItem>
            <MenuItem value="yes">Con Calefacción</MenuItem>
            <MenuItem value="no">Sin Calefacción</MenuItem>
          </TextField>
        </Grid>

        {/* Botón Reset */}
        <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            fullWidth 
            variant="outlined" 
            startIcon={<RestartAltIcon />} 
            onClick={resetFiltros}
            color="inherit"
          >
            Limpiar Filtros
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterPanel;