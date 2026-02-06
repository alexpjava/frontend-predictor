import { useState } from 'react'; // CORRECCIÓN: Importación de hook añadida
import { 
  Card, CardContent, CardActions, Typography, Button, 
  Box, Chip, Divider, List, ListItem, ListItemText, Collapse, Rating 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReviewForm from './ReviewForm';

const ApartmentCard = ({ apt, prepararEdicion, eliminarApartamento, actualizarLista }) => {
  const [expandido, setExpandido] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);

  const fotoUrl = `https://loremflickr.com/400/250/apartment,room/all?lock=${apt.id.length + apt.area}`;

  return (
    <Card sx={{ height: '100%', borderRadius: 3, display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
      <Box component="img" sx={{ height: 180, width: '100%', objectFit: 'cover' }} src={fotoUrl} alt="Apartment" />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(apt.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          ID: ...{apt.id.slice(-6)}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, my: 1 }}>
          <Chip label={`${apt.area} m²`} size="small" variant="outlined" />
          <Chip label={`${apt.bedrooms} Hab`} size="small" color="info" />
          <Chip label={`${apt.bathrooms} Baños`} size="small" />
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Button 
          size="small" 
          fullWidth
          startIcon={<ExpandMoreIcon sx={{ transform: expandido ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
          onClick={() => setExpandido(!expandido)}
        >
          Reseñas ({apt.reviews ? apt.reviews.length : 0})
        </Button>

        <Collapse in={expandido} timeout="auto">
          <List dense sx={{ bgcolor: '#f9f9f9', borderRadius: 1, mt: 1 }}>
            {apt.reviews && apt.reviews.length > 0 ? (
              apt.reviews.map((rev, idx) => (
                <ListItem key={idx} divider>
                  <ListItemText 
                    primary={<Rating value={rev.rating} readOnly size="small" />} 
                    secondary={rev.comment} 
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="caption" sx={{ p: 2, display: 'block' }}>Sin reseñas.</Typography>
            )}
          </List>
          
          <Button size="small" onClick={() => setMostrarForm(!mostrarForm)} sx={{ mt: 1 }}>
            {mostrarForm ? "Cerrar" : "Escribir Reseña"}
          </Button>

          {mostrarForm && (
            <ReviewForm apartmentId={apt.id} onReviewAdded={actualizarLista} />
          )}
        </Collapse>
      </CardContent>

      <CardActions sx={{ bgcolor: '#f0f0f0', justifyContent: 'space-between' }}>
        <Button size="small" startIcon={<EditIcon />} onClick={() => prepararEdicion(apt)}>Editar</Button>
        <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => eliminarApartamento(apt.id)}>Borrar</Button>
      </CardActions>
    </Card>
  );
};

export default ApartmentCard;