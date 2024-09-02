import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FlipCard.css'; // Import the updated CSS file
import { useNavigate } from 'react-router-dom';

const FlipCard = ({ title, description, imageUrl, buttonText }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent click event from flipping the card
    navigate("/login");
  };

  return (
    <motion.div
      className="flip-card"
      initial={{ scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="flip-card-inner"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
        onClick={handleCardClick}
      >
        <div className="flip-card-front">
          <div
            className="card-media"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="card-content">
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{description.slice(0, 100)}...</p>
          </div>
        </div>
        <div className="flip-card-back">
          <div className="card-back-content">
            <h2 className='card-title'>{title}</h2>
            <p className='card-description'>{description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;
