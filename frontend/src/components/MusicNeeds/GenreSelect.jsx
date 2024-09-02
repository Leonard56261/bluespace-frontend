import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const GenreSelect = ({ genre, setGenre, genres }) => (
  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel sx={{ color: 'white' }}>Genre</InputLabel>
    <Select
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
      label="Genre"
      sx={{ bgcolor: '#333', color: 'white', maxHeight: '300px', overflowY: 'auto' }}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: '300px', // Set a max height
            backgroundColor: '#333', // Dropdown list background color
            color: "white"
          },
        },
      }}
    >
      {genres.map((gen) => (
        <MenuItem key={gen} value={gen}>{gen}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default GenreSelect;
