import { SpotifyApi, IAuthStrategy } from '@spotify/web-api-ts-sdk';
import express from "express";
import { URLSearchParams } from 'url';
let open: any;
(async () => {
  try {
    const openModule = await import('open');
    open = openModule.default || openModule;  // In case 'openModule' doesn't have a 'default' export    
  } catch (error) {
    console.error('Error importing open module:', error);
  }
})();
declare global {
  var spotifySdk: SpotifyApi;
}

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
export interface SpotifyIAuthStrategy extends IAuthStrategy { }

export const startAuthentication = async (req: express.Request, res: express.Response) => {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email';
  let url = new URL("https://accounts.spotify.com/authorize?");
  url.searchParams.append("response_type", "code");
  url.searchParams.append("client_id", globalThis.configurationObject.SPOTIFY_CLIENT_ID);
  url.searchParams.append("scope", scope);
  url.searchParams.append("redirect_uri", globalThis.configurationObject.SPOTIFY_REDIRECT_URI);
  url.searchParams.append("state", state);

  // await open('https://accounts.spotify.com/authorize?' +
  //   queryString.stringify({
  //     response_type: 'code',
  //     client_id: globalThis.configurationObject.SPOTIFY_CLIENT_ID,
  //     scope: scope,
  //     redirect_uri: globalThis.configurationObject.SPOTIFY_REDIRECT_URI,
  //     state: state,
  //   }));
  res.redirect(url.href);
}

export const getAuthenticationToken = async (req: express.Request, res: express.Response) => {
  const { code, state } = req.query;
  console.log({ code, state })
  // globalThis.spotifySdk = SpotifyApi.withClientCredentials(globalThis.configurationObject.SPOTIFY_CLIENT_ID, globalThis.configurationObject.SPOTIFY_CLIENT_SECRET);
  res.send(200);
  // globalThis.spotifySdk.users.
  // globalThis.spotifySdk = SpotifyApi.withUserAuthorization(globalThis.configurationObject.SPOTIFY_CLIENT_ID, globalThis.configurationObject.SPOTIFY_REDIRECT_URI, ["user-read-private"])
  // globalThis.spotifySdk.
  // const abc = await globalThis.spotifySdk.users.profile("uQ16ZMWvQriBOqwYC978lQ");
  // console.log({ abc })

  // const authOptions: {
  //   url: string;
  //   form: {
  //     code: string | null;
  //     redirect_uri: string;
  //     grant_type: string;
  //   };
  //   headers: {
  //     'content-type': string;
  //     Authorization: string;
  //   };
  //   json: boolean;
  // } = {
  //   url: 'https://accounts.spotify.com/api/token',
  //   form: {
  //     code: code as string, // Assuming code is always a string
  //     redirect_uri,
  //     grant_type: 'authorization_code',
  //   },
  //   headers: {
  //     'content-type': 'application/x-www-form-urlencoded',
  //     Authorization: 'Basic ' + Buffer.from(globalThis.configurationObject.SPOTIFY_CLIENT_ID + ':' + globalThis.configurationObject.SPOTIFY_CLIENT_SECRET).toString('base64'),
  //   },
  //   json: true,
  // };
} 
