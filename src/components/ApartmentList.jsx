import Grid from '@mui/material/Grid';
import ApartmentCard from './ApartmentCard';

const ApartmentList = ({ apartamentos, prepararEdicion, eliminarApartamento }) => {
  return (
    <Grid container spacing={3}>
      {apartamentos.map((apt) => (
        <Grid item xs={12} sm={6} md={4} key={apt.id}>
          <ApartmentCard 
            apt={apt} 
            prepararEdicion={prepararEdicion} 
            eliminarApartamento={eliminarApartamento} 
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ApartmentList;