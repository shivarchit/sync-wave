import express from "express";
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URL = 'YOUR_REDIRECT_URL';

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

export const startAuthentication = async (req: express.Request, res: express.Response) => {
    const url = client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile'
    });
    res.redirect(url);
}