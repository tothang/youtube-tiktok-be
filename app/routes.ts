import express, { Request, Response, NextFunction } from 'express';
import { handleError500 } from './middleware';
import { searchYouTube,searchTikTok } from "services";

const router = express.Router();

router.post(
    "/query/search",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { keywords } = req.body;

            if (!keywords) {
                return res.status(400).json({
                    result: {},
                    message: "vodName and path are required",
                });
            }

            // Call both search functions
            const [youtubeResults, tiktokResults] = await Promise.all([
                searchYouTube(keywords),
                searchTikTok(keywords),
            ]);

            return res.status(200).json({
                result: {
                    youtubeResults,
                    tiktokResults
                },
                message: "success",
            });
        } catch (err) {
            return handleError500(
                res,
                err instanceof Error ? err.message : "Unknown error"
            );
        }
    }
);


export default router;
