https://developer.spotify.com/documentation/web-api/tutorials/code-flow

https://developer.spotify.com/documentation/web-api/concepts/authorization


https://github.com/spotify/web-api/issues/806
import * as express from 'express';
// import SpotifyBuilder from "./utils/spotify-builder"
// const spotifyUtil = new SpotifyBuilder();
const router = express.Router();


router.get('/sync', async (req, res) => {
  try {
    try {
      //  var state = generateRandomString(16);
      var scope = 'user-read-private user-read-email';

      res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        }));
      // console.log({ abc: spotifyUtil.getAccessToken() })
    } catch (error) {
      console.log(error)
    }
    res.status(200).json({ message: 'Sync successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default router;
