import React, { Component } from "react";
import he from "he";
import { getForSelect } from "../../models/videos";

class VideoSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: []
    };
  }

  async componentDidMount() {
    const videos = this.props.videos
      ? this.props.videos
      : await getForSelect();

    this.setState({
      videos
    });
  }

  render() {
    return (
      <div className="field video-select">
        <label htmlFor="video_id" className="label">
          Video
        </label>
        <div className="control">
          <div className="select">
            <select
              name="video_id"
              onChange={this.props.onChange}
              value={this.props.value}
            >
              {this.state.videos.map(video => {
                return (
                  <option value={video.id} key={`video-${video.id}`}>
                    {he.decode(video.title)}
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

export default VideoSelect;
