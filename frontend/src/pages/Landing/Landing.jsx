import React, { useEffect } from 'react';
import { Typography, Button, Box, Container, Grid, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MusicIcon from '@mui/icons-material/LibraryMusic';
import MovieIcon from '@mui/icons-material/LocalMovies';
import DrawingIcon from '@mui/icons-material/Create';
import BotIcon from '@mui/icons-material/Chat';
import JournalIcon from '@mui/icons-material/Book';
import Step1Icon from '@mui/icons-material/CheckCircle';
import Step2Icon from '@mui/icons-material/Settings';
import Step3Icon from '@mui/icons-material/Star';
import background from "../../components/imgs/home-background.jpg";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useAuth } from '../../hooks/AuthContext';

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isLoggedIn = useAuth();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut", staggerChildren: 0.3 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        id="hero-section"
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#121212',
          color: '#fff',
          textAlign: 'center',
          paddingTop: '64px',
          backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0.7)), url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="md">
          <motion.div variants={itemVariants}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: "#D3D3D3" }}>
              Welcome to BlueSpace
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 4, color: "#D3D3D3" }}>
              Comprehensive mental health support for international and first-year students.
            </Typography>
          </motion.div>

          {!isLoggedIn && (
            <motion.div variants={itemVariants}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variant="contained"
                sx={{
                  fontSize: '1.2rem',
                  padding: '10px 20px',
                  backgroundColor: '#001f3f',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#003366' },
                  transition: 'background-color 0.3s ease',
                }}
                onClick={() => navigate("/login")}
              >
                Get Started
              </Button>
            </motion.div>
          )}

          {isLoggedIn && (
            <motion.div variants={itemVariants}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variant="contained"
                sx={{
                  fontSize: '1.2rem',
                  padding: '10px 20px',
                  backgroundColor: '#001f3f',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#003366' },
                  transition: 'background-color 0.3s ease',
                }}
                onClick={() => navigate("/user/home")}
              >
                Get Started
              </Button>
            </motion.div>
          )}
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: '#1b1b1b', color: '#D3D3D3', width: '100vw' }}>
        <Container maxWidth="lg">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
              Features
            </Typography>
            <Typography variant="body1" align="center" sx={{ marginBottom: 6 }}>
              Tools to support your mental well-being and help you adapt to college life.
            </Typography>
            <Grid container spacing={6}>
              {[
                { title: 'Mental Health Resources', description: 'Access articles and videos tailored to your needs.', icon: <JournalIcon fontSize="large" /> },
                { title: 'Virtual Support Chat', description: 'Engage anonymously with a virtual therapist.', icon: <BotIcon fontSize="large" /> },
                { title: 'Social Connection Activities', description: 'Join well-being activities and connect with peers.', icon: <DrawingIcon fontSize="large" /> },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    viewport={{ once: true }}
                    sx={{
                      padding: 4,
                      backgroundColor: '#2b2b2b',
                      borderRadius: 2,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                      textAlign: 'center',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1">{feature.description}</Typography>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 8, backgroundColor: '#121212', color: '#D3D3D3', width: '100vw' }}>
        <Container maxWidth="lg">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
              How It Works
            </Typography>
            <Grid container spacing={4}>
              {[
                { title: 'Step 1', description: 'Sign up and create your profile.', icon: <Step1Icon fontSize="large" /> },
                { title: 'Step 2', description: 'Access personalized content and resources.', icon: <Step2Icon fontSize="large" /> },
                { title: 'Step 3', description: 'Engage with peers and professionals for support.', icon: <Step3Icon fontSize="large" /> },
              ].map((step, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={itemVariants}
                    viewport={{ once: true }}
                    sx={{
                      padding: 4,
                      backgroundColor: '#1e1e1e',
                      borderRadius: 2,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': { boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)' },
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{step.icon}</Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body1">{step.description}</Typography>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Scroll to Top Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          aria-label="Scroll to Top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{ color: '#D3D3D3' }}
        >
          <ArrowUpwardIcon fontSize="large" />
        </IconButton>
      </Box>
    </>
  );
}

export default LandingPage;
