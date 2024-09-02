import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

const NewEntryForm = ({ addEntry }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    addEntry({ text, backgroundColor: '#1e1e1e' });
    setText('');
  };

  return (
    <div>
      <TextField
        label="New Entry"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ marginTop: '10px' }}
      >
        <AddCircle /> Add Entry
      </Button>
    </div>
  );
};

export default NewEntryForm;
