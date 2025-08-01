import React from 'react';

// This is a utility component to generate a placeholder logo SVG
// You can use this to create and save a logo.png file

export const GenerateLogoPlaceholder = () => {
  const logoSvg = `
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" rx="100" fill="#1976D2"/>
      <path d="M66 82.5C66 70.074 76.074 60 88.5 60H131C143.426 60 153.5 70.074 153.5 82.5V120C153.5 132.426 143.426 142.5 131 142.5H88.5C76.074 142.5 66 132.426 66 120V82.5Z" fill="white"/>
      <path d="M96 88L123 106.5L96 125V88Z" fill="#1976D2"/>
      <path d="M46.5 102.5C46.5 91.73 55.23 83 66 83V82C55.23 82 46.5 73.27 46.5 62.5C46.5 73.27 37.77 82 27 82H26C37.77 82 46.5 90.73 46.5 101.5V102.5Z" fill="white"/>
    </svg>
  `;

  // Convert SVG to Base64
  const svgBase64 = btoa(logoSvg);
  const dataUri = `data:image/svg+xml;base64,${svgBase64}`;
  
  return (
    <div>
      <h2>Placeholder Logo</h2>
      <img src={dataUri} alt="Placeholder Logo" width="200" height="200" />
      <p>Right-click on the image above and 'Save Image As...' to your public folder as 'logo.png'</p>
    </div>
  );
};

export default GenerateLogoPlaceholder;
