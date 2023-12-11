import express from "express";
import { startAuthentication } from "../controllers/youtube-music-controller";
export default (router: express.Router) => {
    router.get('/auth', startAuthentication);
};