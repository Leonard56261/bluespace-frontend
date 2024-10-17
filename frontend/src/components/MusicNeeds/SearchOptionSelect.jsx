import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SearchOptionSelect = ({ searchOption, setSearchOption }) => (
  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel sx={{ color: 'white' }}>Search Option</InputLabel>
    <Select
      value={searchOption}
      onChange={(e) => setSearchOption(e.target.value)}
      label="Search Option"
      sx={{ bgcolor: '#333', color: 'white' }}
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
      <MenuItem value="artist">Type your favorite artist</MenuItem>
      <MenuItem value="genre">Select by genre</MenuItem>
    </Select>
  </FormControl>
);

export default SearchOptionSelect;
