import React, { Component } from "react";
import { Icon } from "react-bulma-components";

class ImageFileInputWithPreview extends Component {
  preview = () => {
    return (
      <div className="image-preview">
        {this.props.preview_url ? (
          <img src={this.props.preview_url} alt="Upload preview" />
        ) : (
          <span className="preview-icon">
            <Icon>
              <svg className="svg-icon">
                <use xlinkHref={`#icon-image-light`} />
              </svg>
            </Icon>
          </span>
        )}
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.preview()}
        <div className="field">
          <div className="file">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="image"
                onChange={this.props.onChange}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <Icon>
                    <svg className="svg-icon">
                      <use xlinkHref={`#icon-upload`} />
                    </svg>
                  </Icon>
                </span>
                <span className="file-label">Choose a file…</span>
              </span>
            </label>
          </div>
          {this.props.error && (
            <p className="help is-danger">{this.props.error_message}</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ImageFileInputWithPreview;
