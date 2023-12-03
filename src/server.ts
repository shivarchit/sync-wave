import express from 'express';
import * as dotenv from 'dotenv';
import spotifySyncRouter from './';
import youtubeSyncRouter from './youtube-music-sync.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/api/spotify', spotifySyncRouter);
app.use('/api/youtube', youtubeSyncRouter);
app.get('/', (req, res) => {

  res.json("Running on port")
  res.status(200);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
