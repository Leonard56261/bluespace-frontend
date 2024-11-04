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
  const backgroundColor = '#1a1a1a'; // Background color for the canvas

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

  // Handle mouse down event to start drawing
  const handleMouseDown = (e) => {
    if (e.target.getStage) {
      const pos = e.target.getStage().getPointerPosition();
      console.log('Mouse down at:', pos);
      if (pos) {
        setCurrentLine([pos]);
        console.log('Initial currentLine:', [pos]); // Log initial currentLine
      }
    }
  };

  const handleMouseMove = (e) => {
    if (currentLine.length > 0 && e.target.getStage) {
      const pos = e.target.getStage().getPointerPosition();
      console.log('Mouse move at:', pos);
      if (pos) {
        setCurrentLine((prev) => {
          const newLine = [...prev, pos];
          console.log('Updated currentLine:', newLine); // Log updated currentLine
          return newLine;
        });
      }
    }
  };
  
  // new changes that satisfy changing to the eraser could help to remove the existing line
  // Define the isPointNear function
  const isPointNear = (point1, point2, threshold = 5) => {
    const distance = Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
    return distance <= threshold;
  };

  const shouldEraseLine = (line, currentLine) => {
    const updatedPoints = line.points.filter(
      linePoint => !currentLine.some(currentPoint => isPointNear(currentPoint, linePoint))
    );
  
    // If any points were removed, return the modified line
    if (updatedPoints.length < line.points.length) {
      return { ...line, points: updatedPoints };
    }
    return null; // If no points were removed, return null to indicate this line should be removed
  };
  
  const handleMouseUp = () => {
    console.log('Mouse up');
    console.log('Current line points before saving:', currentLine);
  
    if (eraser && currentLine.length > 0) {
      // Use filter to remove lines that should be erased
      const newLines = lines.map(line => shouldEraseLine(line, currentLine)).filter(Boolean);
      setLines(newLines);
    } else if (currentLine.length > 0) {
      setLines((prevLines) => [
        ...prevLines,
        {
          color: eraser ? backgroundColor : brushColor,
          radius: brushRadius,
          points: currentLine,
        },
      ]);
    }
    setCurrentLine([]);
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
              data-testid="drawing-stage"
              ref={stageRef}
              width={window.innerWidth * 0.6}
              height={window.innerHeight * 0.48}
              style={{ border: '2px solid #333', backgroundColor, borderRadius: '12px', marginBottom: '120px' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <Layer data-testid="lines-layer">
              {lines.map((line, index) => {
                  console.log(`Rendering line ${index}:`, line); // Add this log to check line data
                  return (
                    <Line
                      key={index}
                      data-testid={`line-${index}`} // For test identification
                      points={line.points.flatMap((point) => [point.x, point.y])}
                      stroke={line.color}
                      strokeWidth={line.radius}
                      lineCap="round"
                      lineJoin="round"
                      shadowBlur={10}
                    />
                  );
                })}
                {currentLine.length > 0 && (
                  <Line
                    points={currentLine.flatMap(point => [point.x, point.y])}
                    stroke={eraser ? backgroundColor : brushColor} // Show current drawing in eraser mode
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
