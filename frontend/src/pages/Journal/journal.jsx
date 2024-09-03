import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconButton, TextField, Box, Typography, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Edit, Delete, Check, EmojiEmotions } from '@mui/icons-material';
import { HexColorPicker } from 'react-colorful';
import EmojiPicker from 'emoji-picker-react';
import { useAuth } from "../../hooks/AuthContext";

const Diary = () => {
  const { userName } = useAuth();

  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
      return JSON.parse(savedEntries).map(entry => ({
        ...entry,
        date: new Date(entry.date),
      }));
    }
    // Initialize with a default entry if no entries are found
    return [{ text: `${userName}'s Journal`, date: new Date(), backgroundColor: '#1e1e1e' }];
  });

  const [currentPage, setCurrentPage] = useState(entries.length > 0 ? 0 : entries.length); // Set initial page based on entries
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#1e1e1e');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
    setCurrentPage(entries.length); // Go to the new page
  };

  const updateEntry = (index, updatedEntry) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = updatedEntry;
    setEntries(updatedEntries);
    setEditingIndex(-1); // Exit edit mode
  };

  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0)); // Move back a page if deleting the last entry
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const toggleColorPicker = () => {
    setColorPickerOpen(!colorPickerOpen);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (entries[currentPage]) {
      const updatedEntries = [...entries];
      updatedEntries[currentPage] = { ...updatedEntries[currentPage], backgroundColor: color };
      setEntries(updatedEntries);
    }
  };

  const applyColorChange = () => {
    setColorPickerOpen(false);
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerOpen(!emojiPickerOpen);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.emoji);
  };

  const saveEmoji = () => {
    if (entries[currentPage]) {
      const updatedText = (entries[currentPage]?.text || '') + selectedEmoji;
      const updatedEntry = { ...entries[currentPage], text: updatedText };
      updateEntry(currentPage, updatedEntry);
      setEmojiPickerOpen(false);
      setSelectedEmoji('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <motion.div
        key={currentPage}
        initial={{ rotateY: 90 }}
        animate={{ rotateY: 0 }}
        exit={{ rotateY: -90 }}
        transition={{ duration: 0.5 }}
        className="diary-page"
        style={{
          width: '40vw',
          height: '75vh',
          backgroundColor: entries[currentPage]?.backgroundColor || '#1e1e1e',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          borderLeft: '5px solid #333',
          borderImage: 'linear-gradient(to bottom, transparent, #333 10%, transparent 40%) 1 100%',
          top: "35px"
        }}
      >
        {currentPage === entries.length ? (
          <NewEntryForm addEntry={addEntry} />
        ) : (
          <DiaryEntry
            entry={entries[currentPage]}
            onEdit={() => setEditingIndex(currentPage)}
            onSave={(updatedText) => updateEntry(currentPage, { ...entries[currentPage], text: updatedText })}
            onDelete={() => deleteEntry(currentPage)}
            editing={editingIndex === currentPage}
            toggleEmojiPicker={toggleEmojiPicker}
          />
        )}

        <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
          <Button
            onClick={toggleColorPicker}
            variant="contained"
            sx={{
              backgroundColor: '#333',
              '&:hover': { backgroundColor: '#555' },
            }}
          >
            Change Background Color
          </Button>
          {colorPickerOpen && (
            <Box sx={{ position: 'absolute', top: '50px', right: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <HexColorPicker color={selectedColor} onChange={handleColorChange} />
              <IconButton
                onClick={applyColorChange}
                sx={{ color: '#ffffff', marginTop: '10px' }}
              >
                <Check />
              </IconButton>
            </Box>
          )}
          {emojiPickerOpen && (
            <Box sx={{ position: 'absolute', bottom: '50px', right: '10px' }}>
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
              {selectedEmoji && (
                <IconButton
                  onClick={saveEmoji}
                  sx={{ color: '#ffffff', marginTop: '10px' }}
                > 
                  <Check />
                </IconButton>
              )}
            </Box>
          )}
        </Box>
      </motion.div>

      {entries.length > 0 && (
        <>
          {currentPage > 0 && (
            <IconButton
              onClick={prevPage}
              sx={{
                position: 'absolute',
                left: '5%',
                color: '#ffffff',
                '&:hover': { color: '#90caf9' }
              }}
            >
              <ArrowBackIos fontSize="large" />
            </IconButton>
          )}
          {currentPage < entries.length && (
            <IconButton
              onClick={nextPage}
              sx={{
                position: 'absolute',
                right: '5%',
                color: '#ffffff',
                '&:hover': { color: '#90caf9' }
              }}
            >
              <ArrowForwardIos fontSize="large" />
            </IconButton>
          )}
        </>
      )}

      <Box
        sx={{
          position: 'absolute',
          bottom: '10px',
          width: '100%',
          textAlign: 'center',
          color: '#ffffff',
          fontSize: '12px',
        }}
      >
        Please remember not to share personal information.
        The Journals you save are only visible to you.
      </Box>
    </Box>
  );
};

const NewEntryForm = ({ addEntry }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntry({ text, date: new Date(), backgroundColor: '#1e1e1e' }); // Default background color
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <TextField
        variant="outlined"
        multiline
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        sx={{
          backgroundColor: '#2c2c2c',
          color: '#ffffff',
          borderRadius: '10px',
          '& .MuiOutlinedInput-root': {
            color: 'white', // Set text color to white
            '& fieldset': {
              borderColor: '#ffffff',
            },
            '&:hover fieldset': {
              borderColor: '#90caf9',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#90caf9',
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          marginTop: '10px',
          color: '#ffffff',
          backgroundColor: '#333333',
          '&:hover': { backgroundColor: '#90caf9' },
          alignSelf: 'center',
        }}
      >
        Add Entry
      </Button>
    </form>
  );
};

const DiaryEntry = ({ entry, onEdit, onDelete, onSave, editing, toggleEmojiPicker }) => {
  const [text, setText] = useState(entry.text);

  const handleSave = () => {
    onSave(text);
  };

  return (
    <Box sx={{ textAlign: 'center', width: '100%' }}>
      {editing ? (
        <>
          <TextField
            variant="outlined"
            multiline
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: '#2c2c2c',
              color: '#ffffff',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                color: 'white', // Set text color to white
                '& fieldset': {
                  borderColor: '#ffffff',
                },
                '&:hover fieldset': {
                  borderColor: '#90caf9',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#90caf9',
                },
              },
            }}
          />
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              marginTop: '10px',
              color: '#ffffff',
              backgroundColor: '#333333',
              '&:hover': { backgroundColor: '#90caf9' },
            }}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: 'white' }}>
            {entry.text}
          </Typography>
          <Typography variant="caption" sx={{ color: '#ffffff' }}>
            {entry.date.toLocaleDateString()}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            <IconButton onClick={onEdit} sx={{ color: '#ffffff' }}>
              <Edit />
            </IconButton>
            <IconButton onClick={onDelete} sx={{ color: '#ffffff' }}>
              <Delete />
            </IconButton>
            <IconButton onClick={toggleEmojiPicker} sx={{ color: '#ffffff' }}>
              <EmojiEmotions />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Diary;
