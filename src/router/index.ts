import express from 'express';

import spotifySync from './spotify-sync';
// import users from './users';

const router = express.Router();

export default (): express.Router => {
  // spotifySync(router.use("/spotify"));
  spotifySync(router);

  // Prepend /spotify to all routes defined in the spotifyRouter
  router.use('/spotify', router);
  //   users(router);

  return router;
};