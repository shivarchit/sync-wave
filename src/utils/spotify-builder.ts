import SpotifyWebApi from 'spotify-web-api-node';
import * as dotenv from 'dotenv';
import { Buffer } from 'buffer';
import axios, { AxiosRequestConfig } from 'axios';
import { SpotifyCurrentUser, Response, SpotifyAccessTokenObject } from '../interfaces/spotify-interfaces';
// const axiosClient = new Axios();
// Now you can use SpotifyCurrentUser, CurrentUsersProfileResponse, and SomeCustomType in this file.

dotenv.config();

export default class SpotifyBuilder extends SpotifyWebApi {
    spotifyAccessTokenObject: SpotifyAccessTokenObject | undefined;
    spotifyCurrentUser: Response<SpotifyCurrentUser> | undefined;
    base64String: string | undefined;
    constructor() {
        super({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI,
        });



        // this.authorizationCodeGrant("user-read-private", async (error: Error, response: Response<SpotifyAccessTokenObject>) => {
        //     if (!error && response.statusCode === 200 && response.body?.access_token) {
        //         this.spotifyAccessTokenObject = response.body;
        //         this.setAccessToken(response.body.access_token);
        //         const abc = await this.getMyDevices();
        //         console.log({ ab: abc })
        //     }
        // });

        this.requestUserAuthentication()


    }

    private async requestUserAuthentication() {

        this.base64String = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

        const authOptions: AxiosRequestConfig = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'post', // Corrected placement of 'method'
            headers: {
                'Authorization': `Basic ${this.base64String}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: new URLSearchParams({
                grant_type: 'client_credentials',
            }).toString(), // Corrected usage of 'data' and added '.toString()'
        };

        axios(authOptions)
            .then((response) => {
                if (response.status === 200) {
                    const token = response.data.access_token;                    
                    this.setAccessToken(token)
                    console.log({ token })
                    this.getArtists(['0oSGxfWSnnOXhD2fKuz2Gy', '3dBVyJ7JuOMt4GE9607Qin'])
                        .then((ac) => {
                            console.log({ ac })
                            this.getUserPlaylists()
                                .then((ac) => {
                                    console.log({ ac })
                                })
                        })
                }
            })
            .catch((error) => {
                // Handle errors
                console.error(error);
            });

    }


}
