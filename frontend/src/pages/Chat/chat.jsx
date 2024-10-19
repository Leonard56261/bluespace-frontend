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
  
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/chat') {
      const botpressScript = document.createElement('script');
      botpressScript.src = process.env.REACT_APP_BOTPRESS_SCRIPT_SRC;
      botpressScript.async = true;

      const configScript = document.createElement('script');
      configScript.src = process.env.REACT_APP_CONFIG_SCRIPT_SRC;
      configScript.async = true;

      document.body.appendChild(botpressScript);
      document.body.appendChild(configScript);

      return () => {
        document.body.removeChild(botpressScript);
        document.body.removeChild(configScript);
      };
    }
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionRefs = [
    { ref: aboutRef, id: "about", title: "About the Virtual Support Assistant" },
    { ref: trainingRef, id: "training", title: "Training and Data Sources" },
    { ref: usageRef, id: "usage", title: "How to Engage with the Assistant" },
    { ref: questionsRef, id: "questions", title: "What You Can Ask the Assistant" },
    { ref: helpfulRef, id: "helpful", title: "Why It’s Beneficial for You" },
    { ref: securityRef, id: "security", title: "Security and Privacy" },
  ];

  const scrollToSection = (ref) => {
    const navbarHeight = 69;
    const topOffset = ref.current.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: topOffset,
      behavior: 'smooth',
    });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#001f3f' }}>
      {/* Sidebar */}
      <Box sx={{ width: '178px', backgroundColor: '#001f3f', padding: '1.5rem', position: 'fixed', height: '100vh', borderRight: '2px solid #ffdd57', marginTop: "55px" }}>
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
                backgroundColor: window.location.hash === `#${section.id}` ? '#ffdd57' : 'transparent',
                '&:hover': { backgroundColor: '#ffdd57' },
              }}
            >
              <ListItemText primary={section.title} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Content */}
      <Box sx={{ marginLeft: '220px', width: 'calc(100% - 220px)', padding: '1.5rem', backgroundColor: '#001f3f', marginTop: "55px" }}>
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
          Welcome to Your Virtual Support Assistant
        </Typography>

        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem', textAlign: 'left' }}
            ref={aboutRef}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#ffdd57', marginTop: '1rem' }}>
              About the Virtual Support Assistant
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffffcc' }}>
              Our assistant is designed to support international and first-year students at college who face challenges like isolation, academic stress, and cultural adjustment. It offers personalized, empathetic guidance to help you manage these issues effectively.
            </Typography>
            <Divider style={{ margin: '1.5rem 0', backgroundColor: '#ffdd57' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem', textAlign: 'left' }}
            ref={trainingRef}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#ffdd57', marginTop: '1rem' }}>
              Training and Data Sources
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffffcc' }}>
              The assistant has been trained using data on student mental health and well-being, specifically focusing on issues like stress management, cultural adaptation, and social isolation. It draws from credible sources to offer the best possible advice.
            </Typography>
            <Divider style={{ margin: '1.5rem 0', backgroundColor: '#ffdd57' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem', textAlign: 'left' }}
            ref={usageRef}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#ffdd57', marginTop: '1rem' }}>
              How to Engage with the Assistant
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffffcc' }}>
              Get started by opening the chat widget at the bottom-right of your screen. Share your concerns or ask questions, and the assistant will provide personalized support based on your needs.
            </Typography>
            <Divider style={{ margin: '1.5rem 0', backgroundColor: '#ffdd57' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem', textAlign: 'left' }}
            ref={questionsRef}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#ffdd57', marginTop: '1rem' }}>
              What You Can Ask the Assistant
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffffcc' }}>
              You can ask about managing stress, making new friends, adapting to college life, or how to handle homesickness. The assistant is equipped to provide advice that helps ease your transition into university life.
            </Typography>
            <Divider style={{ margin: '1.5rem 0', backgroundColor: '#ffdd57' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem', textAlign: 'left' }}
            ref={helpfulRef}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#ffdd57', marginTop: '1rem' }}>
              Why It’s Beneficial for You
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffffcc' }}>
              The assistant is available 24/7, providing immediate emotional support and offering suggestions to help you manage academic or social stress. It connects you to valuable resources and helps create a path to well-being.
            </Typography>
            <Divider style={{ margin: '1.5rem 0', backgroundColor: '#ffdd57' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem', textAlign: 'left' }}
            ref={securityRef}
          >
            <Typography variant="h5" gutterBottom style={{ color: '#ffdd57', marginTop: '1rem' }}>
              Security and Privacy
            </Typography>
            <Typography variant="body1" style={{ color: '#ffffffcc' }}>
              Your privacy is our priority. All conversations are encrypted, and no data is stored after a session ends. Feel free to refresh the chat to ensure your history is cleared.
            </Typography>
            <Divider style={{ margin: '1.5rem 0', backgroundColor: '#ffdd57' }} />
          </motion.div>

          <Typography variant="h5" gutterBottom style={{ color: '#ffdd57', marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
            Click the chat widget in the bottom-right corner to begin your journey
            <ArrowForwardIcon style={{ marginLeft: '0.5rem' }} />
          </Typography>
        </Container>

        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Box 
            sx={{
              bgcolor: '#001f3f', 
              p: 3, 
              borderRadius: 2, 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
              Disclaimer
            </Typography>
            <Typography variant="body1" sx={{ color: 'white' }}>
              This assistant provides general advice and is constantly improving. For serious concerns or tailored guidance, please consult a licensed professional. Your feedback helps improve the assistant’s accuracy and relevance.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
