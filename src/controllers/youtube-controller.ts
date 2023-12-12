import express from "express";
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import { youtubePuppeteer } from "../controllers/puppeteer-controller"

const CLIENT_ID = globalThis.configurationObject.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = globalThis.configurationObject.YOUTUBE_CLIENT_SECRET;
const REDIRECT_URL = globalThis.configurationObject.YOUTUBE_REDIRECT_URI;

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

async function getPlaylists(accessToken: string): Promise<any> {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
            params: {
                part: 'id,snippet,contentDetails',
                mine: true,
                maxResults: 50
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (response.data && response.data.items) {
            return response.data.items;
        } else {
            throw new Error('Failed to get playlists');
        }
    } catch (error) {
        // handle error
    }
}

export const startAuthentication = async (req: express.Request, res: express.Response) => {
    const youtubeRedirectUrl = client.generateAuthUrl({
        access_type: 'offline',
        prompt: "consent",
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/youtube.readonly']
    });
    res.redirect(youtubeRedirectUrl);
}

export const getAuthenticationToken = async (req: express.Request, res: express.Response) => {
    const { code, state } = req.query;
    const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URL,
        grant_type: 'authorization_code'
    });

    if (response.data && response.data.access_token) {
        console.log(response.data.access_token);
    } else {
        throw new Error('Failed to get authentication token');
    }
    console.log(await getPlaylists(response.data.access_token));
    res.send(200);
}