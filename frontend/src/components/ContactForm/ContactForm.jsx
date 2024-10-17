import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Instagram, MailOutline, LinkedIn } from '@mui/icons-material'; // Import modern, black-themed icons

const ContactForm = () => {
  return (
    <Box
      
      sx={{
        py: 8,
        width: '100vw',
        bgcolor: '#1b1b1b',
        color: '#D3D3D3',
        borderRadius: 2,
        textAlign: 'center',
        
      }}
    >
      <Typography variant="h4" gutterBottom>
        Contact Me
      </Typography>
      <Typography variant="body1" gutterBottom>
        Reach out to us through any of the following platforms:
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
        <IconButton
          aria-label="Instagram"
          component="a"
          href="https://www.instagram.com/xdSushil_"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#D3D3D3' }}
        >
          <Instagram fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="Gmail"
          component="a"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=sushil.eshika@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#D3D3D3' }}
        >
          <MailOutline fontSize="small" />
        </IconButton>

        <IconButton
          aria-label="LinkedIn"
          component="a"
          href="https://www.linkedin.com/in/sushil-r-21164429b/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#D3D3D3' }}
        >
          <LinkedIn fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ContactForm;
