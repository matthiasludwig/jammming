let accessToken = '';

const clientID = 'ab109e91247f4e6ba3386f66da5ba81e';
const redirectURL = 'https://d2kiztbld5brey.cloudfront.net/';

const Spotify = {
    // Method to set the accessToken
    getAccessToken() {
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessToken.length > 0) {
            return accessToken;
        }
        else if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expires_in = expiresInMatch[1];

            window.setTimeout(() => accessToken='', expires_in * 1000); // Clears the variable after expired time
            window.history.pushState('Access Token', null, '/');

            return accessToken;
        }
        else {
            // Open the spotifyURL for the User
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
        }
    },
    // Function to format the jsonResponse from searchSongs()
    formatJSON(jsonResponse) {
        const formattedJSON = [];
        // console.log(jsonResponse);
        jsonResponse.tracks.items.forEach(item => {
            let song = {
                name: item.name,
                artist: (item.artists.map(artist => artist.name)).join(' & '),
                album: item.album.name,
                albumSrc: item.album.images[2].url,
                id: item.id,
                uri: item.uri
            }
            formattedJSON.push(song);
        })
        return formattedJSON;
    },


    // Method to search for Songs
    async searchSongs(term) {
        const urlRequest = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const requestHeader = {'Authorization': `Bearer ${accessToken}`};
        try {
            const response = await fetch(urlRequest, {method: 'GET', headers: requestHeader});
            if (response.ok) {
                const jsonResponse = await response.json();
                return this.formatJSON(jsonResponse);
            }
            throw new Error(`Request to ${urlRequest} failed!`);
        }
        catch (error) {
            console.log("Error in searchSongs() ", error);
        }
    },
    // Get and set UserID
    async getUserID() {
        const urlRequest = 'https://api.spotify.com/v1/me';
        const requestHeader = {'Authorization': `Bearer ${accessToken}`};
        try {
            const response = await fetch(urlRequest, {method: 'GET', headers: requestHeader});
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.id;
            }
            throw new Error(`Request to ${urlRequest} failed!`);
        }
        catch (error) {
            console.log("Error in getUserID() ", error);
        }
    },
    // Create Playlist
    async createPlaylist(userID, playlistName) {
        const urlRequest = `https://api.spotify.com/v1/users/${userID}/playlists`;
        const requestHeader = {'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'};
        try {
            const response = await fetch(urlRequest, {method: 'POST', headers: requestHeader, body: JSON.stringify({name: playlistName})});
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.id;
            }
            throw new Error(`Request to ${urlRequest} failed!`);
        }
        catch (error) {
            console.log("Error in createPlaylist() ", error);
        }
    },
    // Add Tracks to the Playlist
    async addTracksToPlaylist(playlistID, uriArray) {
        const urlRequest = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
        const requestHeader = {'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'};
        try {
            const response = await fetch(urlRequest, {method: 'POST', headers: requestHeader, body: JSON.stringify({uris: uriArray})});
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse)
                return jsonResponse;
            }
            throw new Error(`Request to ${urlRequest} failed!`);
        }
        catch (error) {
            console.log("Error in addTracksToPlaylist() ", error);
        }
    },

    // Save Playlist to Spotify
    async savePlaylist(playlistName, uriArray) {
        if (playlistName.length === 0 || uriArray.length === 0) {
            return "playlistName or uriArray have not been defined in savePlaylist()!";
        }

        const userID = await this.getUserID();
        const playlistID = await this.createPlaylist(userID, playlistName);
        const tracksAdded = await this.addTracksToPlaylist(playlistID, uriArray);
        return tracksAdded;
    }
};

export default Spotify;
