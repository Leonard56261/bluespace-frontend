import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const GenreSelect = ({ genre, setGenre, genres }) => (
  <FormControl fullWidth>
    <InputLabel sx={{ color: 'white' }}>Genre</InputLabel>
    <Select
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
      label="Genre"
      sx={{ bgcolor: '#333', color: 'white' }}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: '#333',
            maxHeight: '200px',
            color: 'white',
            '& .MuiMenuItem-root': {
              color: 'white',
            },
          },
        },
      }}
    >
      {genres.map((gen) => (
        <MenuItem key={gen.id} value={gen.id}>
          {gen.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default GenreSelect;
