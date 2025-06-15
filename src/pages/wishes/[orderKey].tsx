import React, { useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import styles from '@/styles/WishPage.module.scss';
import Link from 'next/link';

interface WishPageProps {
  order: {
    template: string;
    recipient: string;
    occasion: string;
    photoUrl: string;
    voiceUrl: string;
  };
}

export default function WishPage({ order }: WishPageProps) {
  const router = useRouter();
  const { orderKey } = router.query;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Dynamically import the template component based on order.template
  const TemplateComponent = dynamic(() => 
    import(`@/components/templates/${order.template}`).catch(() => 
      import('@/components/templates/Birthday')
    )
  );

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Create scratch-off overlay
      ctx.fillStyle = '#CCCCCC';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;
      
      const draw = (e: MouseEvent | TouchEvent) => {
        if (!isDrawing) return;
        
        let x, y;
        if (e instanceof MouseEvent) {
          x = e.offsetX;
          y = e.offsetY;
        } else {
          const touch = e.touches[0];
          const rect = canvas.getBoundingClientRect();
          x = touch.clientX - rect.left;
          y = touch.clientY - rect.top;
        }
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 40;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        lastX = x;
        lastY = y;
      };
      
      const startDraw = (e: MouseEvent | TouchEvent) => {
        isDrawing = true;
        
        if (e instanceof MouseEvent) {
          lastX = e.offsetX;
          lastY = e.offsetY;
        } else {
          const touch = e.touches[0];
          const rect = canvas.getBoundingClientRect();
          lastX = touch.clientX - rect.left;
          lastY = touch.clientY - rect.top;
        }
        
        // Start playing audio when user starts scratching
        if (audioRef.current) {
          audioRef.current.play().catch(console.error);
        }
      };
      
      canvas.addEventListener('mousedown', startDraw);
      canvas.addEventListener('touchstart', startDraw);
      
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('touchmove', draw);
      
      canvas.addEventListener('mouseup', () => isDrawing = false);
      canvas.addEventListener('touchend', () => isDrawing = false);
      
      return () => {
        canvas.removeEventListener('mousedown', startDraw);
        canvas.removeEventListener('touchstart', startDraw);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('touchmove', draw);
        canvas.removeEventListener('mouseup', () => isDrawing = false);
        canvas.removeEventListener('touchend', () => isDrawing = false);
      };
    }
  }, []);
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} className={styles.wishCard}>
        <Box className={styles.cardContent}>
          <TemplateComponent order={order} />
          
          <audio ref={audioRef} src={order.voiceUrl} preload="auto" />
          
          <Box textAlign="center" mt={3}>
            <Typography variant="body1" color="text.secondary">
              Scratch to reveal your special message!
            </Typography>
          </Box>
          
          <Box className={styles.canvasContainer}>
            <canvas 
              ref={canvasRef} 
              className={styles.scratchCanvas} 
              width={300} 
              height={400}
            />
          </Box>
        </Box>
        
        <Box textAlign="center" mt={3} pb={2}>
          <Button 
            component={Link} 
            href="/" 
            variant="contained" 
            color="primary"
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orderKey } = context.params || {};
  
  // Stub data - in a real app, this would fetch from a database
  const mockOrder = {
    template: 'Birthday',
    recipient: 'Sarah',
    occasion: 'Birthday',
    photoUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=500',
    voiceUrl: '/assets/dummy-audio.mp3',
  };
  
  // Simulate server delay
  await new Promise(r => setTimeout(r, 100));
  
  return {
    props: {
      order: mockOrder,
    },
  };
};
