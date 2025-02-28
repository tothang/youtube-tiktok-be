import serverless from "serverless-http";
import cors from "cors";
import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true); // Allow all origins
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
    credentials: true // Enable cookies or Authorization headers
}));


app.use("/", router);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send();
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

const serverlessHandler = serverless(app);

// Unified Lambda handler to detect event type
export const handler = async (event: any = {}, context: any): Promise<any> => {
    return serverlessHandler(event, context);
};

