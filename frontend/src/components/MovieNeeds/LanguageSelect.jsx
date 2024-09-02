import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const LanguageSelect = ({ selectedLanguage, setSelectedLanguage, languages }) => (
  <FormControl fullWidth>
    <InputLabel sx={{ color: 'white' }}>Language</InputLabel>
    <Select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      label="Language"
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
      {languages.map((lang) => (
        <MenuItem key={lang.iso_639_1} value={lang.iso_639_1}>
          {lang.english_name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default LanguageSelect;
