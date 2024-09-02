import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Check } from '@mui/icons-material';
import { HexColorPicker } from 'react-colorful';

const ColorPicker = ({ open, toggleColorPicker, color, onColorChange, onApply }) => (
  <>
    <IconButton
      onClick={toggleColorPicker}
      variant="contained"
      sx={{ backgroundColor: '#333', '&:hover': { backgroundColor: '#555' } }}
    >
      Change Background Color
    </IconButton>
    {open && (
      <Box sx={{ position: 'absolute', top: '50px', right: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <HexColorPicker color={color} onChange={onColorChange} />
        <IconButton
          onClick={onApply}
          sx={{ color: '#ffffff', marginTop: '10px' }}
        >
          <Check />
        </IconButton>
      </Box>
    )}
  </>
);

export default ColorPicker;
