import express from 'express';

import { getAuthenticationToken, startAuthentication } from "../controllers/spotify-controller"

export default (router: express.Router) => {
    router.get('/auth', startAuthentication);
    router.get("/callback-redirect", getAuthenticationToken)    
};
