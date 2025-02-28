import * as dotenv from 'dotenv';
dotenv.config();

const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const REGION = process.env.REGION;
const ENVIRONMENT = process.env.ENVIRONMENT;
const SECRET_KEY_AUTH = process.env.SECRET_KEY_AUTH;
const SLACK_WEBHOOK_ERROR = process.env.SLACK_WEBHOOK_ERROR;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
const SOURCE_LOCATION = process.env.SOURCE_LOCATION;

const config = {
    ALLOWED_ORIGINS: ALLOWED_ORIGINS,
    ENVIRONMENT: ENVIRONMENT,
    SECRET_KEY_AUTH: SECRET_KEY_AUTH,
    SLACK_WEBHOOK_ERROR: SLACK_WEBHOOK_ERROR,
    SOURCE_LOCATION: SOURCE_LOCATION,
    aws_local_config: {
        //Provide details for local configuration
    },
    aws_remote_config: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
        region: REGION,
    }
};


export { config };
