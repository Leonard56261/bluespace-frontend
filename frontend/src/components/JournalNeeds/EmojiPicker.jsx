import React from 'react';
import { Box } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerComponent = ({ onEmojiSelect }) => (
  <Box sx={{ position: 'absolute', bottom: '10px', right: '10px' }}>
    <EmojiPicker onEmojiClick={onEmojiSelect} />
  </Box>
);

export default EmojiPickerComponent;
