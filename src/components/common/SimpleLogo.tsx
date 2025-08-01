import React from 'react';
import Image from 'next/image';
import logo from '../../public/logo.png';

interface SimpleLogoProps {
  width?: number;
  height?: number;
  inverted?: boolean;
  className?: string;
}

const SimpleLogo: React.FC<SimpleLogoProps> = ({
  width = 40,
  height = 40,
  inverted = false,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        width: width * 1.2, // Add extra space for the rotation
        height: height * 1.2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        position: 'relative',
      }}
    >
      <Image
        src={logo}
        alt="KeyToWish Logo"
        width={width * 1.3} // Make the logo 30% bigger
        height={height * 1.3}
        style={{
          objectFit: 'contain',
          transform: 'rotate(-10deg) scale(1.5)', // Tilt by -10 degrees and scale up by 50%
          filter: inverted ? 'brightness(0) invert(1)' : 'none',
          transformOrigin: 'center',
        }}
        priority
      />
    </div>
  );
};

export default SimpleLogo;
