import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DecadeSelect = ({ decade, setDecade, decades }) => (
  <FormControl fullWidth>
    <InputLabel sx={{ color: 'white' }}>Decade</InputLabel>
    <Select
      value={decade}
      onChange={(e) => setDecade(e.target.value)}
      label="Decade"
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
      {decades.map((dec) => (
        <MenuItem key={dec.value} value={dec.value}>
          {dec.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default DecadeSelect;
