import React from "react";
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <img className={"Track-Image"} src={this.props.track.albumSrc} alt={this.props.track.album} />
                <div className="Track-information">
                    <h3>{ this.props.track.name }</h3>
                    <p>{ this.props.track.artist } | { this.props.track.album }</p>
                </div>
                {this.props.isRemoval
                    ? <button className="Track-action" onClick={this.removeTrack}><i className="fas fa-music-alt-slash"></i></button>
                    : <button className="Track-action" onClick={this.addTrack}><i className="fas fa-list-music"></i></button>

                }
            </div>
        );
    }
}

export default Track;