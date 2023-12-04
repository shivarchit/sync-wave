import { SpotifyApi, IAuthStrategy } from '@spotify/web-api-ts-sdk';

declare global {
  var spotifySdk: SpotifyApi;
}

export interface SpotifyIAuthStrategy extends IAuthStrategy { }

export const getAuthenticationToken = async () => {
  globalThis.spotifySdk = SpotifyApi.withClientCredentials(globalThis.configurationObject.SPOTIFY_CLIENT_ID, globalThis.configurationObject.SPOTIFY_CLIENT_SECRET);
  // globalThis.spotifySdk = SpotifyApi.withUserAuthorization(globalThis.configurationObject.SPOTIFY_CLIENT_ID, globalThis.configurationObject.SPOTIFY_REDIRECT_URI, ["user-read-private"])
  // globalThis.spotifySdk.
  const abc = await globalThis.spotifySdk.users.profile("uQ16ZMWvQriBOqwYC978lQ");
  console.log({ abc })
} 
