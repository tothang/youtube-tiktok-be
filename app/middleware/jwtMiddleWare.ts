import jwt from 'jsonwebtoken';
import {config} from "../config";
import { NextFunction, Request, Response } from 'express';

// Define the secret
const secret:string = config.JWT_SECRET as string;

// Extend the Express Request type to include userId
declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

// Function to verify the JWT
const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the authorization header
    const authHeader = req.headers['authorization'];


    if (!authHeader && !authHeader?.startsWith('Bearer ')) {
        console.log('No token provided. Anonymous access is allowed.');
        req.userId = -1
        return next();

    }

    // Bearer token format
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, secret) as { id: number; exp: number; iat: number };

        // Extract user ID from the decoded token and attach it to the request object
        req.userId = decoded.id;

        // Check if the token is expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp < currentTime) {
            return res.status(401).json({ message: 'Token expired' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Export the middleware
export default verifyJwt;
