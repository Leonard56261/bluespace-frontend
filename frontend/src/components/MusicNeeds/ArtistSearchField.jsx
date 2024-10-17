import React from 'react';
import { TextField } from '@mui/material';

const ArtistSearchField = ({ artistSearch, setArtistSearch }) => (
  <TextField
    label="Favorite Artist"
    variant="outlined"
    value={artistSearch}
    onChange={(e) => setArtistSearch(e.target.value)}
    fullWidth
    sx={{
      backgroundColor: '#333',
      color: 'white',
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'transparent' // Invisible border by default
        },
        '&.Mui-focused fieldset': {
          borderColor: '#D3D3D3' // Dark white border when focused
        }
      }
    }}
    InputLabelProps={{ style: { color: 'white' } }}
    InputProps={{ style: { color: 'white' } }}
  />
);

export default ArtistSearchField;
