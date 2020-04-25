import React from "react";
import './Track.css';

class Track extends React.Component {
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>Track name</h3>
                    <p>Track Artist | Track Album</p>
                </div>
                <button className="Track-action">+ or -</button>
            </div>
        );
    }
}

export default Track;