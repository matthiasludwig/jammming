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
                }
            ],
            playlistTracks: [
                {
                    name: "My Father's Eyes",
                    artist: "Eric Clapton",
                    album: "Unplugged",
                    id: 3
                }
            ],
            playlistName: "New Playlist"
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
    }

    addTrack(track) {
        console.log(track);
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

    render() {
        return (
          <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
              <SearchBar />
              <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults}
                               onAdd={this.addTrack}/>
                <Playlist playlistTracks={this.state.playlistTracks}
                          playlistName={this.state.playlistName}
                          onRemove={this.removeTrack}
                          onNameChange={this.updatePlaylistName}
                />
              </div>
            </div>
          </div>
        );
    }
}

export default App;
