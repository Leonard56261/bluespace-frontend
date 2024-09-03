import React, { useState, useRef } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { motion } from 'framer-motion';
import BrushIcon from '@mui/icons-material/Brush';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import DownloadIcon from '@mui/icons-material/Download';
import { Stage, Layer, Line } from 'react-konva';

const sketchIdeas = ['Dog', 'Cat', 'Tree', 'House', 'Car', 'Flower', 'Sun', 'Star', 'Bird', 'Fish', 'Butterfly'];

const Canvas = () => {
  const [sketchIdea, setSketchIdea] = useState('');
  const [brushColor, setBrushColor] = useState('#FFFFFF'); // Default to white
  const [brushRadius, setBrushRadius] = useState(5);
  const [eraser, setEraser] = useState(false);
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  const stageRef = useRef(null);

  // Randomly select a sketch idea
  const getRandomIdea = () => {
    const randomIdea = sketchIdeas[Math.floor(Math.random() * sketchIdeas.length)];
    setSketchIdea(randomIdea);
  };

  // Clear the canvas
  const clearCanvas = () => {
    setLines([]);
  };

  // Undo the last drawn line
  const undo = () => {
    setLines((prevLines) => prevLines.slice(0, -1));
  };

  // Download the drawing as an image
  const downloadCanvas = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.href = uri;
    link.download = 'drawing.png';
    link.click();
  };

  // Toggle eraser mode
  const toggleEraser = () => {
    setEraser(!eraser);
  };

  // Handle drawing on canvas
  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    setCurrentLine([...currentLine, pos]);
  };

  const handleMouseMove = (e) => {
    if (currentLine.length > 0) {
      const pos = e.target.getStage().getPointerPosition();
      setCurrentLine([...currentLine, pos]);
    }
  };

  const handleMouseUp = () => {
    if (currentLine.length > 0) {
      setLines([...lines, { color: brushColor, radius: brushRadius, points: currentLine }]);
      setCurrentLine([]);
    }
  };

  return (
    <Container maxWidth="lg" style={{ backgroundColor: 'transparent', color: 'white', height: '90vh', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', top: '45px', marginBottom: "60px" }}>
      <Box display="flex" flexDirection="column" alignItems="center" borderRadius="12px" style={{ overflow: 'hidden', width: '100%', height: '100%', padding: "10px" }}>
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
              InputLabelProps={{ style: { color: 'white' } }}
              style={{ backgroundColor: '#333', color: 'white', width: '140px' }} // Wider color picker
            />
            <TextField
              type="number"
              label="Brush Size"
              value={brushRadius}
              onChange={(e) => setBrushRadius(parseInt(e.target.value, 10))}
              variant="outlined"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }} // White text color
              style={{ backgroundColor: '#333', color: 'white', width: '140px' }} // Wider input field
              inputProps={{ min: 1 }} // Set minimum value to 1
            />
          </Box>
          <Typography variant="h6" style={{ margin: '20px 0' }}>
            Sketch Idea: {sketchIdea}
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" style={{ gap: '10px', marginBottom: '20px' }}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="contained" style={{ backgroundColor: '#333', color: 'white' }} onClick={getRandomIdea} startIcon={<BrushIcon />}>
                Get Sketch Idea
              </Button>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="contained" style={{ backgroundColor: '#333', color: 'white' }} onClick={clearCanvas} startIcon={<DeleteIcon />}>
                Clear Canvas
              </Button>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="contained" style={{ backgroundColor: '#333', color: 'white' }} onClick={undo} startIcon={<UndoIcon />}>
                Undo
              </Button>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="contained" style={{ backgroundColor: '#333', color: 'white' }} onClick={downloadCanvas} startIcon={<DownloadIcon />}>
                Download
              </Button>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="contained" style={{ backgroundColor: '#333', color: 'white' }} onClick={toggleEraser} startIcon={<BrushIcon />}>
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
            <Stage
              width={window.innerWidth * 0.6}
              height={window.innerHeight * 0.48}
              ref={stageRef}
              style={{ border: '2px solid #333', backgroundColor: '#1a1a1a', borderRadius: '12px', marginBottom: '120px' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <Layer>
                {lines.map((line, index) => (
                  <Line
                    key={index}
                    points={line.points.flatMap(point => [point.x, point.y])}
                    stroke={line.color}
                    strokeWidth={line.radius}
                    lineCap="round"
                    lineJoin="round"
                    shadowBlur={10}
                  />
                ))}
                {currentLine.length > 0 && (
                  <Line
                    points={currentLine.flatMap(point => [point.x, point.y])}
                    stroke={brushColor}
                    strokeWidth={brushRadius}
                    lineCap="round"
                    lineJoin="round"
                  />
                )}
              </Layer>
            </Stage>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

export default Canvas;
