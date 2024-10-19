import React, { useRef, useEffect } from 'react';
import { Container, Typography, Divider, Box, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLocation } from 'react-router-dom';

const AboutPage = () => {
  const aboutRef = useRef(null);
  const trainingRef = useRef(null);
  const usageRef = useRef(null);
  const questionsRef = useRef(null);
  const helpfulRef = useRef(null);
  const securityRef = useRef(null);
  
  const location = useLocation(); // Use the location hook to get current path
  useEffect(() => {
    if (location.pathname === '/chat') {
      const botpressScript = document.createElement('script');
      botpressScript.src = process.env.REACT_APP_BOTPRESS_SCRIPT_SRC;
      botpressScript.async = true;
  
      botpressScript.onload = () => {
        console.log('Botpress script loaded successfully.');
        window.botpressWebChat.init({
          botId: '04f745d6-7d79-4904-9b73-f48d1b0d3f85',
          userId: 'user123',  // Ensure userId is set
          email: '123@gmail.com',
          botAvatar: 'https://files.bpcontent.cloud/2024/10/19/03/20241019030720-HHSKP3FS.jpeg'  // Ensure botAvatar is set
        });
      };
  
      botpressScript.onerror = () => {
        console.error('Error loading Botpress script.');
      };
  
      document.body.appendChild(botpressScript);
      return () => {
        document.body.removeChild(botpressScript);
      };
    }
  }, [location.pathname]);
  

  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionRefs = [
    { ref: aboutRef, id: "about", title: "About the Virtual Therapist" },
    { ref: trainingRef, id: "training", title: "Training Data" },
    { ref: usageRef, id: "usage", title: "How to Use the Bot" },
    { ref: questionsRef, id: "questions", title: "What You Can Ask" },
    { ref: helpfulRef, id: "helpful", title: "Why It’s Helpful" },
    { ref: securityRef, id: "security", title: "Security Concerns" },
  ];

  const scrollToSection = (ref) => {
    const navbarHeight = 69; // Adjust this value based on the actual height of your navbar
    const topOffset = ref.current.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: topOffset,
      behavior: 'smooth',
    });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1a1a1a' }}>
      {/* Sidebar */}
      <Box sx={{ width: '178px', backgroundColor: '#1a1a1a', padding: '1.5rem', position: 'fixed', height: '100vh', borderRight: '2px solid #ff4081', marginTop: "55px" }}>
        <Typography
          variant="h6"
          sx={{ color: '#ffffff', marginBottom: '1rem' }}
          component={motion.h6}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Contents
        </Typography>
        <List>
          {sectionRefs.map((section) => (
            <ListItem
              key={section.id}
              onClick={() => scrollToSection(section.ref)}
              sx={{
                color: '#ffffff',
                backgroundColor: window.location.hash === `#${section.id}` ? '#ff4081' : 'transparent',
                '&:hover': { backgroundColor: '#ff4081' },
              }}
            >
              <ListItemText primary={section.title} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Content */}
      <Box sx={{ marginLeft: '220px', width: 'calc(100% - 220px)', padding: '1.5rem', backgroundColor: '#1a1a1a', marginTop: "55px"}}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          style={{ color: '#ffffff' }}
          component={motion.h3}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Know About Your Virtual Therapist
        </Typography>

        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem', textAlign: 'left' }}
            ref={aboutRef}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#ff4081', marginTop: '1rem' }}>
              About the Virtual Therapist
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffffcc' }}>
              Our virtual therapist is here to support you through various challenges, including stress, anxiety, and relationship issues. Equipped with advanced training and empathetic responses, it aims to offer personalized support to help you navigate through tough times.
            </Typography>
            <Divider style={{ margin: '1.5rem 0', backgroundColor: '#ff4081' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem', textAlign: 'left' }}
            ref={trainingRef}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#ff4081', marginTop: '1rem' }}>
              Training Data
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffffcc' }}>
              The virtual therapist has been meticulously trained on a broad range of data from various articles related to these topics, This diverse training ensures that the responses are both scientifically grounded and highly relevant.
            </Typography>
            <Divider style={{ margin: '1.5rem 0', backgroundColor: '#ff4081' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem', textAlign: 'left' }}
            ref={usageRef}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#ff4081', marginTop: '1rem' }}>
              How to Use the Bot
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffffcc' }}>
              To get started with the bot, follow these simple steps:
              <ul>
                
                <li>Click on the chat widget located in the bottom-right corner of the screen.</li>
                <li>Engage in a conversation by typing your questions or sharing your thoughts.</li>
                <li>The bot will provide tailored guidance and support based on your inputs.</li>
              
              </ul>
            </Typography>
            <Divider style={{ margin: '1.5rem 0', backgroundColor: '#ff4081' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem', textAlign: 'left' }}
            ref={questionsRef}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#ff4081', marginTop: '1rem' }}>
              What You Can Ask
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffffcc' }}>
              The bot can assist you with a wide range of queries, including:
              <ul>
                <li>How to manage feelings of overwhelm.</li>
                <li>Strategies to stay motivated towards your goals.</li>
                <li>Support for any ongoing issues or challenges you are facing.</li>
                <li>Ways to improve your mental well-being and handle stress.</li>
                <li>Advice on building and maintaining healthy relationships.</li>
              </ul>
            </Typography>
            <Divider style={{ margin: '1.5rem 0', backgroundColor: '#ff4081' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem', textAlign: 'left' }}
            ref={helpfulRef}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#ff4081', marginTop: '1rem' }}>
              Why It’s Helpful
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffffcc' }}>
              The virtual therapist is available around the clock, offering immediate support whenever you need it. Its continuous availability helps you manage emotions, provides effective stress management techniques, and delivers a reassuring presence whenever you seek comfort.
            </Typography>
            <Divider style={{ margin: '1.5rem 0', backgroundColor: '#ff4081' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem', textAlign: 'left' }}
            ref={securityRef}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#ff4081', marginTop: '1rem' }}>
              Security Concerns
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffffcc' }}>
              Your privacy and security are paramount. Here’s how we protect your data:
              <ul>
                <li>Your chat history is not saved. Each time you refresh the chat by clicking the refresh button on the bot toolbar, all previous messages are cleared.</li>
                <li>All communication with the bot is encrypted to ensure that your conversations remain confidential and secure.</li>
              </ul>
              <Typography variant="body2" style={{ color: '#ff4081', fontStyle: 'italic' }}>
                * For optimal security, we recommend refreshing the chat before you leave the site to ensure no data remains in the session.
              </Typography>
            </Typography>
            <Divider style={{ margin: '1.5rem 0', backgroundColor: '#ff4081' }} />
          </motion.div>

          <Typography variant="h5" gutterBottom style={{ color: '#ff4081', marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
            Start by clicking on the chat widget in the right end corner of the page
            <ArrowForwardIcon style={{ marginLeft: '0.5rem' }} />
          </Typography>
        </Container>
        <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box 
        sx={{
          bgcolor: '', 
          p: 3, 
          borderRadius: 2, 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
          Disclaimer
        </Typography>
        <Typography variant="body1" sx={{ color: 'white' }}>
          This chatbot is designed to assist and provide information to the best of its ability. However, it is not 100% accurate and is constantly learning. The responses generated by this chatbot are not intended to offend, harm, or provide personalized advice. If you have specific concerns or require expert guidance, please consult a qualified professional. Your understanding and patience are appreciated.
        </Typography>
      </Box>
    </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
