import * as express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import * as dotenv from 'dotenv';
// server.ts
let open: any;  // Assuming that 'open' has an 'any' type

(async () => {
  try {
    const openModule = await import('open');
    open = openModule.default || openModule;  // In case 'openModule' doesn't have a 'default' export

    // Now you can use 'open' in your server logic
    // For example:
    open('https://www.example.com');
  } catch (error) {
    console.error('Error importing open module:', error);
  }
})();

dotenv.config();

const router = express.Router();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Spotify authentication route
router.get('/auth', async (req, res) => {
  const authorizeURL = spotifyApi.createAuthorizeURL(['user-read-private', 'playlist-read-private', 'playlist-modify-private'], 'state', false);
  await open(authorizeURL)
  res.redirect(authorizeURL);
});

// Spotify callback route
router.get('/callback-redirect', async (req, res) => {
  const { code } = req.query;

  try {
    const data = await spotifyApi.authorizationCodeGrant(code as string);
    const { access_token, refresh_token } = data.body;

    // Set the access token on the API object
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    const me = await spotifyApi.getMe()
    console.log({ me })
    res.send('Authentication successful! You can close this window.');
  } catch (error) {
    console.error('Error getting access token:', error);
    res.status(500).send('Error getting access token.');
  }
});

// Spotify playlist sync route
router.post('/sync', async (req, res) => {
  try {
    // Implement Spotify playlist synchronization logic here
    res.status(200).json({ message: 'Sync successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default (): express.Router => {
  return router;
};
