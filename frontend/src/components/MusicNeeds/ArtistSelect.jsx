import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ArtistSelect = ({ artist, setArtist, artists }) => (
  <FormControl fullWidth sx={{ mt: 0.5 }}>
    <InputLabel sx={{ color: 'white' }}>Artist</InputLabel>
    <Select
      value={artist}
      onChange={(e) => setArtist(e.target.value)}
      label="Artist"
      sx={{ bgcolor: '#333', color: 'white', maxHeight: '300px', overflowY: 'auto' }}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: '300px', // Set a max height
            backgroundColor: '#333', // Dropdown list background color
            color: "white",
          },
        },
      }}
    >
      {artists.map((art) => (
        <MenuItem key={art.id} value={art.id}>{art.name}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default ArtistSelect;
