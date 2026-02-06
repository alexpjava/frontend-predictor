import { Card, CardContent, CardActions, Typography, Button, Box, Chip, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

const ApartmentCard = ({ apt, prepararEdicion, eliminarApartamento }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Chip label={apt.furnishingstatus} size="small" color="primary" variant="outlined" />
          <Typography variant="caption" color="text.secondary">ID: {apt.id.substring(0, 8)}</Typography>
        </Box>
        
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <AspectRatioIcon color="action" /> {apt.area} m²
        </Typography>

        <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: '900', mb: 2 }}>
          {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(apt.price)}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={1}>
          <Grid item xs={6}><Typography variant="body2">🛏️ {apt.bedrooms} Hab.</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">🚿 {apt.bathrooms} Baños</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">🏢 {apt.stories} Plantas</Typography></Grid>
          <Grid item xs={6}><Typography variant="body2">🚗 {apt.parking} Plazas</Typography></Grid>
        </Grid>

        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {apt.mainroad === 'yes' && <Chip label="Vía Principal" size="small" sx={{ fontSize: 10 }} />}
          {apt.airconditioning === 'yes' && <Chip label="Aire Acond." size="small" color="info" sx={{ fontSize: 10 }} />}
          {apt.hotwaterheating === 'yes' && <Chip label="Calefacción" size="small" color="warning" sx={{ fontSize: 10 }} />}
          {apt.basement === 'yes' && <Chip label="Sótano" size="small" sx={{ fontSize: 10 }} />}
        </Box>
      </CardContent>

      <CardActions sx={{ bgcolor: '#f8f9fa', justifyContent: 'space-between', p: 2 }}>
        <Button size="small" startIcon={<EditIcon />} onClick={() => prepararEdicion(apt)}>Editar</Button>
        <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => eliminarApartamento(apt.id)}>Borrar</Button>
      </CardActions>
    </Card>
  );
};

export default ApartmentCard;