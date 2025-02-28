import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { sendSlackNotification } from "services";

// Middleware to check secret key authorization
export const b2bMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const secretKeyFromHeader = req.headers['secret-key-auth'];
    const secretKeyFromEnv = config.SECRET_KEY_AUTH;

    // Compare the secret keys
    if (secretKeyFromHeader === secretKeyFromEnv) {
        next(); // The keys match, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Forbidden: Invalid secret key' }); // Keys don't match, send a 403 response
    }
};

// Utility function to handle 500 errors and send Slack notification
export const handleError500 = async (res: Response, errorMessage: string) => {
    // Send Slack notification with the error message
    //await sendSlackNotification(`Error 500: ${errorMessage}`, config.SLACK_WEBHOOK_ERROR);

    // Return 500 response with the error message
    return res.status(500).json({
        result: {},
        message: errorMessage,
    });
};
