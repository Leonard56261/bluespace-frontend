import React from 'react'
import { Typography, Box, Container } from '@mui/material';
const Footer = ()=> {
  return (
    <Box sx={{ py: 7, backgroundColor: '#1a1a1a', color: '#D3D3D3', textAlign: 'center', width: '100vw' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            © 2024 SoulSpace. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            {/* Add icons for social media here */}
            <Typography variant="body2">Privacy Policy</Typography>
            <Typography variant="body2">Terms of Service</Typography>
          </Box>
        </Container>
      </Box>
  )
}

export default Footer;