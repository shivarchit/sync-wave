import express from 'express';

import spotifySync from './spotify-sync';
import youtubeSync from './youtube-sync';

const router = express.Router();

export default (): express.Router => {
  spotifySync(router);
  youtubeSync(router);
  router.use('/spotify', router);
  router.use('/youtube', router);

  return router;
};