import { Grid, Typography, Box } from '@mui/material';
import ApartmentCard from './ApartmentCard';

const ApartmentList = ({ apartamentos, filtros, eliminarApartamento, prepararEdicion, actualizarLista }) => {
  
  const filtrados = apartamentos.filter(apt => {
    return (
      (!filtros.minPrice || apt.price >= parseInt(filtros.minPrice)) &&
      (!filtros.maxPrice || apt.price <= parseInt(filtros.maxPrice)) &&
      (!filtros.bedrooms || apt.bedrooms === parseInt(filtros.bedrooms)) &&
      (!filtros.bathrooms || apt.bathrooms === parseInt(filtros.bathrooms)) &&
      (!filtros.parking || apt.parking === parseInt(filtros.parking)) &&
      (filtros.ac === 'all' || apt.airconditioning === filtros.ac) &&
      (filtros.heating === 'all' || apt.hotwaterheating === filtros.heating)
    );
  });

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'medium' }}>
        Propiedades Disponibles ({filtrados.length})
      </Typography>
      <Grid container spacing={3}>
        {filtrados.map(apt => (
          <Grid item key={apt.id} xs={12} sm={6} md={4}>
            <ApartmentCard 
              apt={apt} 
              eliminarApartamento={eliminarApartamento} 
              prepararEdicion={prepararEdicion}
              actualizarLista={actualizarLista}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ApartmentList;