import express from 'express';

import spotifySync from './spotify-sync';
// import users from './users';

const router = express.Router();

export default (): express.Router => {
  spotifySync(router);
  //   users(router);

  return router;
};