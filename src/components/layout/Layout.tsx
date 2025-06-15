import React from 'react';
import Box from '@mui/material/Box';
import AppBar from './AppBar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AppBar />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 144px)' }}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
