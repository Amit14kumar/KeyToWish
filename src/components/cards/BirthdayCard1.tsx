import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Paper, IconButton, Dialog, useMediaQuery, useTheme } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '@/contexts/AuthContext';
import FullscreenBirthdayCard from './FullscreenBirthdayCard';
import styles from './BirthdayCard1.module.css';

interface BirthdayCard1Props {
  userName?: string;
}

const BirthdayCard1: React.FC<BirthdayCard1Props> = ({ userName }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { user } = useAuth();
  const [isMaximized, setIsMaximized] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Use provided userName or fallback to logged-in user or default
  const displayName = userName || user?.name || 'Friend';

  const handleMaximize = () => {
    if (isDesktop) {
      setIsMaximized(true);
    }
  };

  const handleMinimize = () => {
    setIsMaximized(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    // Confetti variables
    let confetti: any[] = [];
    const confettiCount = 300;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
      { front: 'red', back: 'darkred' },
      { front: 'green', back: 'darkgreen' },
      { front: 'blue', back: 'darkblue' },
      { front: 'yellow', back: 'darkyellow' },
      { front: 'orange', back: 'darkorange' },
      { front: 'pink', back: 'darkpink' },
      { front: 'purple', back: 'darkpurple' },
      { front: 'turquoise', back: 'darkturquoise' }
    ];

    // Helper functions
    const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const initConfetti = () => {
      for (let i = 0; i < confettiCount; i++) {
        confetti.push({
          color: colors[Math.floor(randomRange(0, colors.length))],
          dimensions: {
            x: randomRange(10, 20),
            y: randomRange(10, 30)
          },
          position: {
            x: randomRange(0, canvas.width),
            y: canvas.height - 1
          },
          rotation: randomRange(0, 2 * Math.PI),
          scale: {
            x: 1,
            y: 1
          },
          velocity: {
            x: randomRange(-25, 25),
            y: randomRange(0, -50)
          }
        });
      }
    };

    // Render function
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;

        // Move canvas to position and rotate
        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate(confetto.rotation);

        // Apply forces to velocity
        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
        confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

        // Set position
        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;

        // Delete confetti when out of frame
        if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

        // Loop confetto x position
        if (confetto.position.x > canvas.width) confetto.position.x = 0;
        if (confetto.position.x < 0) confetto.position.x = canvas.width;

        // Spin confetto by scaling y
        confetto.scale.y = Math.cos(confetto.position.y * 0.1);
        ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

        // Draw confetti
        ctx.fillRect(-width / 2, -height / 2, width, height);

        // Reset transform matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      });

      // Fire off another round of confetti
      if (confetti.length <= 10) initConfetti();

      requestAnimationFrame(render);
    };

    // Event handlers
    const handleClick = () => {
      initConfetti();
    };

    const handleResize = () => {
      resizeCanvas();
    };

    // Initialize
    initConfetti();
    render();

    // Add event listeners
    canvas.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Normal Card View */}
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          width: '100%',
          height: '400px',
          overflow: 'hidden',
          borderRadius: 2,
          cursor: 'pointer',
          backgroundColor: '#f5f5f5'
        }}
        onClick={handleMaximize}
      >
        <canvas
          ref={canvasRef}
          className={styles.birthdayCardCanvas}
        />
        
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            textTransform: 'uppercase',
            padding: '36px',
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
            top: '37%',
            color: 'rebeccapurple',
            fontFamily: '"Righteous", cursive',
            fontSize: { xs: '2rem', sm: '3rem', md: '5rem' },
            letterSpacing: '10px',
            textShadow: '2px 4px 11px rgba(0, 0, 0, 0.28)',
            WebkitTextStroke: '1px white',
            zIndex: 1000,
            pointerEvents: 'none',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          Happy Birthday
          <br />
          <Box 
            component="span" 
            sx={{ 
              fontSize: '0.8em', 
              color: '#ff1744',
              fontWeight: 800,
              textShadow: '2px 4px 8px rgba(0, 0, 0, 0.4)',
              WebkitTextStroke: '0.5px white',
              display: 'block',
              marginTop: '8px'
            }}
          >
            {displayName}
          </Box>
        </Typography>

        {/* Maximize Button - Desktop Only */}
        {isDesktop && (
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              zIndex: 1001,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleMaximize();
            }}
          >
            <FullscreenIcon />
          </IconButton>
        )}
      </Paper>

      {/* Fullscreen Dialog - Desktop Only */}
      {isDesktop && (
        <Dialog
          open={isMaximized}
          onClose={handleMinimize}
          maxWidth={false}
          fullScreen
          PaperProps={{
            sx: {
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '95vw',
              height: '95vh',
              maxWidth: '1400px',
              maxHeight: '900px'
            }}
          >
            <FullscreenBirthdayCard 
              userName={displayName} 
              onClose={handleMinimize}
            />
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default BirthdayCard1;
