// spotifySync.ts
import * as express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Spotify authentication route
router.get('/auth', (req, res) => {
  const authorizeURL = spotifyApi.createAuthorizeURL(['user-read-private', 'playlist-read-private', 'playlist-modify-private'], 'state', false);
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
    
    const me=await spotifyApi.getMe()
    console.log({me})
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

export default router;
