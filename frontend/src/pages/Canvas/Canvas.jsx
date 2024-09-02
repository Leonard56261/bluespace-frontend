import React, { useEffect, useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { motion } from 'framer-motion';
import BrushIcon from '@mui/icons-material/Brush';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import DownloadIcon from '@mui/icons-material/Download';


const sketchIdeas = ['Dog', 'Cat', 'Tree', 'House', 'Car', 'Flower', 'Sun', 'Star', 'Bird', 'Fish', 'Butterfly'];

const Canvas = () => {
  const [sketchIdea, setSketchIdea] = useState('');
  const [brushColor, setBrushColor] = useState('#FFFFFF'); // Default to white
  const [brushRadius, setBrushRadius] = useState(5);
  const [eraser, setEraser] = useState(false);
  const canvasRef = useRef(null);


  // Randomly select a sketch idea
  const getRandomIdea = () => {
    const randomIdea = sketchIdeas[Math.floor(Math.random() * sketchIdeas.length)];
    setSketchIdea(randomIdea);
  };

  // Clear the canvas
  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  // Undo the last drawn line
  const undo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  // Download the drawing as an image
  const downloadCanvas = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.getDataURL();
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'drawing.png';
      link.click();
    }
  };

  // Toggle eraser mode
  const toggleEraser = () => {
    setEraser(!eraser);
  };

  // Render the brush or eraser icon based on mode
  const EraserIcon = eraser ? BrushIcon : DeleteIcon;

  // Ensure brush size is greater than 0
  const handleBrushSizeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setBrushRadius(value);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <Container maxWidth="lg" style={{ backgroundColor: 'transparent', color: '#E0E0E0', height: '90vh', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', top: '45px',marginBottom:"60px" }}> {/* Adjust top position */}
      <Box display="flex" flexDirection="column" alignItems="center" borderRadius="12px" style={{ overflow: 'hidden', width: '100%', height: '100%',padding:"10px" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '20px' }}
        >
          <Typography variant="h4" gutterBottom>
            Drawing Dashboard
          </Typography>
        </motion.div>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Box display="flex" flexDirection="row" alignItems="center" mb={1} style={{ gap: '10px' }}>
            <TextField
              type="color"
              label="Brush Color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              variant="outlined"
              InputLabelProps={{ style: { color: '#E0E0E0' } }}
              style={{ backgroundColor: '#333', color: '#E0E0E0', width: '140px' }} // Wider color picker
            />
            <TextField
              type="number"
              label="Brush Size"
              value={brushRadius}
              onChange={handleBrushSizeChange}
              variant="outlined"
              InputLabelProps={{ style: { color: '#E0E0E0' } }}
              InputProps={{ style: { color: '#E0E0E0' } }} // White text color
              style={{ backgroundColor: '#333', color: '#E0E0E0', width: '140px' }} // Wider input field
              inputProps={{ min: 1 }} // Set minimum value to 1
            />
          </Box>
          <Typography variant="h6" style={{ margin: '20px 0' }}>
            Sketch Idea: {sketchIdea}
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" style={{ gap: '10px', marginBottom: '20px'}}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="contained" style={{ backgroundColor: '#333', color: '#E0E0E0' }} onClick={getRandomIdea} startIcon={<BrushIcon />}>
                Get Sketch Idea
              </Button>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="contained" style={{ backgroundColor: '#333', color: '#E0E0E0' }} onClick={clearCanvas} startIcon={<DeleteIcon />}>
                Clear Canvas
              </Button>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="contained" style={{ backgroundColor: '#333', color: '#E0E0E0' }} onClick={undo} startIcon={<UndoIcon />}>
                Undo
              </Button>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="contained" style={{ backgroundColor: '#333', color: '#E0E0E0' }} onClick={downloadCanvas} startIcon={<DownloadIcon />}>
                Download
              </Button>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="contained" style={{ backgroundColor: '#333', color: '#E0E0E0' }} onClick={toggleEraser} startIcon={<EraserIcon />}>
                {eraser ? 'Brush' : 'Eraser'}
              </Button>
            </motion.div>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" style={{ width: '100%', height: '80%' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: 'transparent', padding: '20px', borderRadius: '12px', width: '100%', height: '80%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} // Darker black background with padding
          >
            <CanvasDraw
              ref={canvasRef}
              brushColor={eraser ? '#1a1a1a' : brushColor} // Eraser color
              brushRadius={brushRadius}
              lazyRadius={0}
              canvasWidth={window.innerWidth * 0.6} // Increased canvas width
              canvasHeight={window.innerHeight * 0.48} // Increased canvas height
              style={{ border: '2px solid #333', backgroundColor: '#1a1a1a', borderRadius: '12px', marginBottom:"120px" }} // Thicker border and darker background
              hideGrid
              onChange={() => {}}
            />
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

export default Canvas;
