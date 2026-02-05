import { Card, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ApartmentCard = ({ apt, prepararEdicion, eliminarApartamento }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography color="text.secondary" variant="caption" sx={{ textTransform: 'uppercase' }}>
          {apt.furnishingstatus}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Apartamento de {apt.area} m²
        </Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item><Typography variant="body2">🛏️ {apt.bedrooms} Hab.</Typography></Grid>
          <Grid item><Typography variant="body2">🚿 {apt.bathrooms} Baños</Typography></Grid>
        </Grid>
        <Typography variant="h5" sx={{ mt: 2, color: '#1b5e20', fontWeight: 'bold' }}>
          {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(apt.price)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button size="small" startIcon={<EditIcon />} onClick={() => prepararEdicion(apt)}>Editar</Button>
        <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => eliminarApartamento(apt.id)}>Borrar</Button>
      </CardActions>
    </Card>
  );
};

export default ApartmentCard;