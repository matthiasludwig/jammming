let access_token = '';

const clientID = '';
const redirectURL = 'http://localhost:3000';

const Spotify = {
    getAccessToken() {
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (access_token.length > 0) {
            return access_token;
        }
        else if (accessTokenMatch && expiresInMatch) {
            access_token = accessTokenMatch[1];
            const expires_in = expiresInMatch[1];

            window.setTimeout(() => access_token='', expires_in * 1000);
            window.history.pushState('Access Token', null, '/');

            return access_token;
        }
        else {
            const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
            window.location(spotifyURL);
        }
    }
};

export default Spotify;