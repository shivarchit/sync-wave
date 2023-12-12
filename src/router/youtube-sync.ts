import express from "express";
import { startAuthentication, getAuthenticationToken } from "../controllers/youtube-controller";
export default (router: express.Router) => {
    router.get('/auth', startAuthentication);
    router.get('/callback-redirect', getAuthenticationToken);
};