import React, { useEffect, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './BirthdayCard1.module.css';

interface FullscreenBirthdayCardProps {
  userName: string;
  onClose: () => void;
}

const FullscreenBirthdayCard: React.FC<FullscreenBirthdayCardProps> = ({ userName, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to fullscreen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * 0.9;
      canvas.height = window.innerHeight * 0.9;
    };

    resizeCanvas();

    // Enhanced confetti for fullscreen
    let confetti: any[] = [];
    const confettiCount = 500; // More confetti for fullscreen
    const gravity = 0.3;
    const terminalVelocity = 4;
    const drag = 0.05;
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

    const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const initConfetti = () => {
      for (let i = 0; i < confettiCount; i++) {
        confetti.push({
          color: colors[Math.floor(randomRange(0, colors.length))],
          dimensions: {
            x: randomRange(15, 25),
            y: randomRange(15, 35)
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
            x: randomRange(-30, 30),
            y: randomRange(0, -60)
          }
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;

        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate(confetto.rotation);

        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
        confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;

        if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

        if (confetto.position.x > canvas.width) confetto.position.x = 0;
        if (confetto.position.x < 0) confetto.position.x = canvas.width;

        confetto.scale.y = Math.cos(confetto.position.y * 0.1);
        ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      });

      if (confetti.length <= 10) initConfetti();
      requestAnimationFrame(render);
    };

    const handleClick = () => {
      initConfetti();
    };

    const handleResize = () => {
      resizeCanvas();
    };

    initConfetti();
    render();

    canvas.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 3,
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      <canvas
        ref={canvasRef}
        className={styles.fullscreenCanvas}
      />
      
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          textTransform: 'uppercase',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'rebeccapurple',
          fontFamily: '"Righteous", cursive',
          fontSize: { md: '4rem', lg: '6rem', xl: '8rem' },
          letterSpacing: '15px',
          textShadow: '3px 6px 15px rgba(0, 0, 0, 0.3)',
          WebkitTextStroke: '2px white',
          zIndex: 1000,
          pointerEvents: 'none',
          background: 'rgba(255, 255, 255, 0.25)',
          borderRadius: '20px',
          border: '3px solid rgba(255, 255, 255, 0.4)',
          padding: '40px 60px',
          whiteSpace: 'nowrap'
        }}
      >
        Happy Birthday
        <br />
        <Box 
          component="span" 
          sx={{ 
            fontSize: '0.7em', 
            color: '#ff1744',
            fontWeight: 800,
            display: 'block',
            marginTop: '20px',
            letterSpacing: '8px',
            textShadow: '2px 4px 12px rgba(0, 0, 0, 0.5)',
            WebkitTextStroke: '1px white'
          }}
        >
          {userName}
        </Box>
      </Typography>

      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          zIndex: 1001,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default FullscreenBirthdayCard;
