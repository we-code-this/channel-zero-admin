import React, { Component } from "react";
import he from "he";
import { getForSelect } from "../../models/artists";

class ArtistSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: []
    };
  }

  async componentDidMount() {
    const artists = this.props.artists
      ? this.props.artists
      : await getForSelect();

    this.setState({
      artists
    });
  }

  render() {
    return (
      <div className="field artist-select">
        <label htmlFor="artist_id" className="label">
          Artist
        </label>
        <div className="control">
          <div className="select">
            <select
              name="artist_id"
              onChange={this.props.onChange}
              value={this.props.value}
            >
              {this.state.artists.map(artist => {
                return (
                  <option value={artist.id} key={`artist-${artist.id}`}>
                    {he.decode(artist.name)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default ArtistSelect;
