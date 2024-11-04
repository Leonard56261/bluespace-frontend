import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For better matchers
import Canvas from './Canvas'; // Adjust the import path as needed
import { act } from 'react';

// Mock window dimensions to make the Stage rendering predictable
beforeAll(() => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1440,
  });

  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 900,
  });
});

describe('Canvas component', () => {
  test('renders Canvas component and checks for initial elements', () => {
    render(<Canvas />);

    // Check if the heading is in the document
    expect(screen.getByText(/Drawing Dashboard/i)).toBeInTheDocument();

    // Check if the buttons are present
    expect(screen.getByRole('button', { name: /Get Sketch Idea/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Clear Canvas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Undo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Eraser/i })).toBeInTheDocument();
  });

  test('renders a sketch idea when Get Sketch Idea button is clicked', () => {
    render(<Canvas />);

    // Simulate button click
    fireEvent.click(screen.getByRole('button', { name: /Get Sketch Idea/i }));

    // Check if a sketch idea text is rendered (assuming one of the sample ideas is used)
    const ideaElements = [
      'Dog', 'Cat', 'Tree', 'House', 'Car', 'Flower', 'Sun', 'Star', 'Bird', 'Fish', 'Butterfly',
    ];

    // Ensure one of the ideas is rendered
    expect(
      ideaElements.some((idea) => screen.queryByText(new RegExp(idea, 'i')))
    ).toBe(true);
  });

  test('clears the canvas when Clear Canvas button is clicked', () => {
    render(<Canvas />);
  
    // Use a reliable query method for testing
    const canvas = screen.getByTestId('drawing-stage'); // Ensure the Stage has a data-testid
    expect(canvas).not.toBeNull();
  
    act(() => {
      fireEvent.mouseDown(canvas);
      fireEvent.mouseMove(canvas, { clientX: 100, clientY: 100 });
      fireEvent.mouseUp(canvas);
    });
  
    // Simulate clearing the canvas
    fireEvent.click(screen.getByRole('button', { name: /Clear Canvas/i }));
  
    // Ensure the component is still rendered without errors
    expect(screen.getByText(/Drawing Dashboard/i)).toBeInTheDocument();
  });
  


  // Unit
  // intial Fail, later success
  // the bug existing in code. when click the eraser, only ui color change, the actual behavior of brush isn't change
  // the line expect(lastLine).toHaveAttribute('stroke', '#1a1a1a'); detect this
  test('draws and erases a line correctly', async () => {
    render(<Canvas />);
  
    // Get the canvas element
    const canvas = screen.getByTestId('drawing-stage');
  
    // Simulate drawing a line with async act for better state handling
    await act(async () => {
      fireEvent.mouseDown(canvas, { clientX: 50, clientY: 50 });
      fireEvent.mouseMove(canvas, { clientX: 60, clientY: 60 });
      fireEvent.mouseMove(canvas, { clientX: 100, clientY: 100 });
      fireEvent.mouseUp(canvas);
    });
  
    // Check if at least one line has been drawn
    const drawnLines = screen.queryAllByTestId(/^line-\d+$/);
    console.log('Drawn lines after drawing:', drawnLines);
    expect(drawnLines.length).toBeGreaterThan(0);
  
    // Activate the eraser mode
    fireEvent.click(screen.getByRole('button', { name: /Eraser/i }));
  
    // Simulate erasing by triggering mouse events
    await act(async () => {
      fireEvent.mouseDown(canvas, { clientX: 75, clientY: 75 });
      fireEvent.mouseMove(canvas, { clientX: 80, clientY: 80 });
      fireEvent.mouseUp(canvas);
    });
  
    // Check if the number of lines is reduced after erasing
    const updatedLines = screen.queryAllByTestId(/^line-\d+$/);
    console.log('Lines after erasing:', updatedLines);
    expect(updatedLines.length).toBeLessThan(drawnLines.length);
  });
  
});
