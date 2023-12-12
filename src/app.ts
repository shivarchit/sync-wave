import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
declare global {
    var configurationObject: NodeJS.ProcessEnv;
}
global.configurationObject = process.env;
import router from './router';

const app = express();

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
