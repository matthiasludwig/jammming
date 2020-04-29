import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [
                {
                    name: "Tears in  Heaven",
                    artist: "Eric Clapton",
                    album: "Unplugged",
                    id: 1
                },
                {
                    name: "Running on Faith",
                    artist: "Eric Clapton",
                    album: "Unplugged",
                    id: 2
                },
                {
                    name: "Audie Song",
                    artist: "Mattiddle",
                    album: "Unplugged",
                    id: 4
                }
            ],
            playlistTracks: [
                {
                    name: "My Father's Eyes",
                    artist: "Eric Clapton",
                    album: "Unplugged",
                    id: 3,
                    uri: 'spotify:track:6rqhFgbbKwnb9MLmUQDhG6'
                }
            ],
            playlistName: "New Playlist"
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.search = this.search.bind(this);
        this.savePlaylist = this.search.bind(this);
    }

    addTrack(track) {
        console.log("Add Track: ", track);
        let playlistContent = this.state.playlistTracks;
        if (!(playlistContent.find(song => song.id === track.id))) {
            playlistContent.push(track);
            this.setState({playlistTracks: playlistContent});
        }
    }

    removeTrack(track) {
        console.log("Remove Track: ", track);
        let playlistContent = this.state.playlistTracks.filter(song => song.id !== track.id);
        this.setState({playlistTracks: playlistContent});
    }

    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    search(term) {
        console.log(term);
    }

    savePlaylist() {
        const trackURIs = [];
        this.state.playlistTracks.map(track => trackURIs.push(track.uri));
        console.log(trackURIs);
        return trackURIs;
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
