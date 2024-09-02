import React, { useState } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import { Edit, Delete, EmojiEmotions } from '@mui/icons-material';

const DiaryEntry = ({ entry, onEdit, onSave, onDelete, editing, toggleEmojiPicker }) => {
  const [text, setText] = useState(entry.text);

  const handleSave = () => {
    onSave(text);
  };

  return (
    <div>
      {editing ? (
        <div>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </div>
      ) : (
        <div>
          <p>{entry.text}</p>
          <IconButton onClick={toggleEmojiPicker}>
            <EmojiEmotions />
          </IconButton>
        </div>
      )}
      <IconButton onClick={onEdit}>
        <Edit />
      </IconButton>
      <IconButton onClick={onDelete}>
        <Delete />
      </IconButton>
    </div>
  );
};

export default DiaryEntry;
