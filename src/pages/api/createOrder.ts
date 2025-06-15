import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  key: string;
  success: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed', key: '' });
    return;
  }

  try {
    // Simulate server processing time
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const { recipient, occasion, customKey } = req.body;
    
    // Basic validation
    if (!recipient || !occasion) {
      res.status(400).json({ success: false, error: 'Missing required fields', key: '' });
      return;
    }
    
    // Validate customKey pattern if provided
    if (customKey && !/^[A-Za-z0-9-]{3,20}$/.test(customKey)) {
      res.status(400).json({ 
        success: false, 
        error: 'Custom key must be 3-20 characters and contain only letters, numbers, or hyphens',
        key: ''
      });
      return;
    }
    
    // Use customKey if provided, otherwise generate a demo key
    const orderKey = customKey || `demo-${Math.random().toString(36).substring(2, 7)}`;
    
    // In a real app, you would:
    // 1. Store the order data in a database
    // 2. Process payment
    // 3. Generate the actual wish page
    
    res.status(200).json({ success: true, key: orderKey });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Internal server error', key: '' });
  }
}
