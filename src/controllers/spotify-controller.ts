import { SpotifyApi, IAuthStrategy } from '@spotify/web-api-ts-sdk';
import express from "express";
import axios from "axios";
import puppeteer from 'puppeteer';
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

function sleep(ms: number): Promise<VoidFunction> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export interface SpotifyIAuthStrategy extends IAuthStrategy { }

function buildSpotifyAuthUrl() {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email';
  let url = new URL("https://accounts.spotify.com/authorize?");
  url.searchParams.append("response_type", "code");
  url.searchParams.append("client_id", globalThis.configurationObject.SPOTIFY_CLIENT_ID);
  url.searchParams.append("scope", scope);
  url.searchParams.append("redirect_uri", globalThis.configurationObject.SPOTIFY_REDIRECT_URI);
  url.searchParams.append("state", state);

  return url;
}

async function performPuppeteerActions(spotifyAuthUrl: URL) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(spotifyAuthUrl.href);
  await page.setViewport({ width: 1080, height: 1024 });
  // page
  //   .on('console', message =>
  //     console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
  //   .on('pageerror', ({ message }) => console.log(message))
  //   .on("request", (a) => {
  //     console.log({ a })
  //   })
  //   .on('response', async (response) => {
  //     if (response.status() === 200) {
  //       await sleep(1000)
  //       console.log(`${response.status()} Success: ${response.url()}`)
  //     } else {
  //       console.log(`${response.status()} ${response.url()}`)
  //     }
  //   })
  //   .on('requestfailed', request =>
  //     console.log(`${request.failure().errorText} ${request.url()}`))
  await page.waitForNetworkIdle();
  await page.waitForSelector('[data-testid="login-form"]');
  await page.type('[data-testid="login-username"]', 'shivarchit');
  await page.type('[data-testid="login-password"]', 'nrqGgp1tU!W29XQQetg%T9A7j6XtdAz5K');
  await page.click('[data-testid="login-button"]');
  await page.waitForNetworkIdle();
  await page.screenshot({ path: `./screenshotLog/spotify/spotify_image_log_${Date.now()}.png` });
  await page.waitForNetworkIdle();
  await page.goto(spotifyAuthUrl.href)
  await page.waitForNetworkIdle();
  await browser.close();
}

export const startAuthentication = async (req: express.Request, res: express.Response) => {

  let spotifyAuthUrl = buildSpotifyAuthUrl();

  // await performPuppeteerActions(spotifyAuthUrl);
  res.redirect(spotifyAuthUrl.href)
}

export const getAuthenticationToken = async (req: express.Request, res: express.Response) => {
  const { code, state } = req.query;
  console.log({ code, state })

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
  //     redirect_uri: globalThis.configurationObject.SPOTIFY_REDIRECT_URI,
  //     grant_type: 'authorization_code',
  //   },
  //   headers: {
  //     'content-type': 'application/x-www-form-urlencoded',
  //     Authorization: 'Basic ' + Buffer.from(globalThis.configurationObject.SPOTIFY_CLIENT_ID + ':' + globalThis.configurationObject.SPOTIFY_CLIENT_SECRET).toString('base64'),
  //   },
  //   json: true,
  // };
  // let result = await axios.post(authOptions)
  // console.log()
  res.send(200);
} 
