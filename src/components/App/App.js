import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from "../../util/Spotify";
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            playlistTracks: [],
            playlistName: "New Playlist"
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.search = this.search.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
    }

    addTrack(track) {
        let playlistContent = this.state.playlistTracks;
        if (!(playlistContent.find(song => song.id === track.id))) {
            playlistContent.push(track);
            this.setState({playlistTracks: playlistContent});
        }
    }

    removeTrack(track) {
        let playlistContent = this.state.playlistTracks.filter(song => song.id !== track.id);
        this.setState({playlistTracks: playlistContent});
    }

    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    search(term) {
        Spotify.getAccessToken();
        const response = Spotify.searchSongs(term);
        response.then(data => {
            this.setState({searchResults: data});
        });
    }

    savePlaylist() {
        const trackURIs = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then((data) => {
            console.log(data);
            this.setState({
                playlistTracks: [],
                playlistName: "New Playlist"
            });
        });
    }

    render() {
        return (
          <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
              <SearchBar onSearch={this.search}/>
              <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults}
                               onAdd={this.addTrack}/>
                <Playlist playlistTracks={this.state.playlistTracks}
                          playlistName={this.state.playlistName}
                          onRemove={this.removeTrack}
                          onNameChange={this.updatePlaylistName}
                          onSave={this.savePlaylist}
                />
              </div>
            </div>
          </div>
        );
    }
}

export default App;
