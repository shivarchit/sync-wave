import express from 'express';
import spotifySync from './spotify-sync';
import youtubeSync from './youtube-sync';

const router = express.Router();

export default (): express.Router => {
  // Create separate routers for Spotify and YouTube
  const spotifyRouter = express.Router();
  const youtubeRouter = express.Router();

  // Mount Spotify routes at /spotify
  spotifySync(spotifyRouter);
  router.use('/spotify', spotifyRouter);

  // Mount YouTube routes at /youtube
  youtubeSync(youtubeRouter);
  router.use('/youtube', youtubeRouter);

  return router;
};
