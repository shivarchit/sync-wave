import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
// import mongoose from 'mongoose';
declare global {
    var configurationObject: NodeJS.ProcessEnv;
}
const app = express();
global.configurationObject = process.env;
app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(globalThis.configurationObject.PORT, () => {
    console.log(`Server running on http://localhost:${globalThis.configurationObject.PORT}/`);
});

const MONGO_URL = ''; // DB URI

// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL);
// mongoose.connection.on('error', (error: Error) => console.log(error));
app.get("/", (req: express.Request, res: express.Response) => {

    res.json(`Running on port ${globalThis.configurationObject.PORT}`)
})
app.use('/api', router());
