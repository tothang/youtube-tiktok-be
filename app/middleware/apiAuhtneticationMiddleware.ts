import { config } from 'config';
import { NextFunction, Request, Response } from 'express';

export const apiAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const secretKeyFromHeader = req.headers['x-api-key'];
    const secretKeyFromEnv = config.SECRET_KEY_AUTH;
    if (secretKeyFromHeader === secretKeyFromEnv) {
        next();
    } else {
        return res.status(401).json({ message: 'Forbidden: Invalid secret key' });
    }
};
