import express from 'express';

import { getAuthenticationToken } from "../controllers/spotify-controller"


const router = express.Router();

// import { login, register } from '../controllers/authentication';

export default (router: express.Router) => {
  router.get('/auth/getToken', getAuthenticationToken);
//   router.post('/auth/login', login);
};
