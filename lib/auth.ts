// lib/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

interface JwtPayload {
  username: string;
  iat: number;
  exp: number;
}

export const authenticate = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    (req as any).user = decoded; // Attach user info to the request object
    next(); // Continue to the API endpoint
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
