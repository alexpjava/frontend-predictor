import { useState } from 'react';
import { Box, TextField, Button, Rating, Typography } from '@mui/material';

const ReviewForm = ({ apartmentId, onReviewAdded }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(3);

  const enviar = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:8080/api/apartment/addReview?id=${apartmentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment, rating })
    });
    if (res.ok) {
      setComment('');
      onReviewAdded();
    }
  };

  return (
    <Box component="form" onSubmit={enviar} sx={{ p: 1, border: '1px solid #ddd', mt: 1, borderRadius: 1 }}>
      <Typography variant="caption">Tu valoración:</Typography>
      <Rating value={rating} onChange={(e, val) => setRating(val)} size="small" />
      <TextField 
        fullWidth multiline rows={2} size="small" placeholder="Comentario..." 
        value={comment} onChange={(e) => setComment(e.target.value)}
        sx={{ my: 1 }}
      />
      <Button type="submit" variant="contained" size="small" fullWidth>Publicar</Button>
    </Box>
  );
};

export default ReviewForm;