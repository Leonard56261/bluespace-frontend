
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import Home from "./pages/Home/Home"
import Demo from "./pages/Demo/Demo"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Spotify from "./pages/Spotify/spotify"
import { Box } from '@mui/material';

import Journal from "./pages/Journal/journal"
import Movies from "./pages/Movies/movies"
import Chat from "./pages/Chat/chat"
import Canvas from './pages/Canvas/Canvas';
import LandingPage from './pages/Landing/Landing';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import { AuthProvider } from './hooks/AuthContext';
import backgroundImage from './components/imgs/textured-background.jpg';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <AuthProvider>
        {/* Add the Box component here */}
        <Box
        sx={{
          minHeight: '100vh',                   // Ensures the Box covers at least 100% of the viewport height
          height: '100%',                       // Covers 100% height of its parent
          display: 'flex',                      // Makes it flex to easily control the layout of its children
          flexDirection: 'column',              // Stacks children vertically
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<LandingPage />} />
              {/* Protected route */}
              <Route
                path="/user/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/Demo" element={<Demo />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/music" element={<Spotify />} />
              <Route
                path="/user/journal"
                element={
                  <ProtectedRoute>
                    <Journal />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route path="/canvas" element={<Canvas />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/chat" element={
                <ProtectedRoute>
                <Chat />
                </ProtectedRoute>
                } />
            </Routes>
          </div>
          <Footer />
        </Box>
      </AuthProvider>
    </>
  );
}

export default App;
