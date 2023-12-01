export interface SpotifyAccessTokenObject {
    access_token: string;
    expires_in: number;
    token_type: string;
}
export interface ImageObject {
    /**
     * The image height in pixels. If unknown: `null` or not returned.
     */
    height?: number | undefined;
    /**pun
     * The source URL of the image.
     */
    url: string;
    /**
     * The image width in pixels. If unknown: null or not returned.
     */
    width?: number | undefined;
}
export interface ExternalUrlObject {
    spotify: string;
}

/**
 * Followers Object
 * [](https://developer.spotify.com/web-api/object-model/)
 */
export interface FollowersObject {
    /**
     * A link to the Web API endpoint providing full details of the followers; `null` if not available.
     * Please note that this will always be set to `null`, as the Web API does not support it at the moment.
     */
    href: null;
    /**
     * The total number of followers.
     */
    total: number;
}
export interface SpotifyCurrentUser {
    birthdate: string;
    country: string;
    email: string;
    product: string;
    display_name?: string | undefined;
    external_urls: ExternalUrlObject;
    followers?: FollowersObject | undefined;
    href: string;
    id: string;
    images?: ImageObject[] | undefined;
    type: "user";
    uri: string;
}
export type Callback<T> = (error: Error, response: Response<T>) => void;
export interface Response<T> {
    body: T;
    headers: Record<string, string>;
    statusCode: number;
}