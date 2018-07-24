import React from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import moment from "moment";

import {
  actions as fileActions,
  selectors as fileSelectors,
} from "store/file";

import "./index.scss";

const ProfilePhotosView = ({
  uploading,
  loading,
  photos,
  submit,
  upload,
}) =>
  <div className="ProfilePhotos">
    <h2 className="title">
      Photos
    </h2>
    <div className="ProfilePhotos-form">
      <form onSubmit={upload}>
        <div className="field">
          <label className="label">
            Upload a photo
          </label>
          <div className="control">
            <input type="file" className="input" />
          </div>
        </div>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <button
              type="submit"
              className={`button is-success ${uploading ? "is-loading" : ""}`}
              disabled={uploading || loading}>
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
    <div className="ProfilePhotos-photos">
      <div className="columns">
      {photos.map(photo =>
        <div className="column" key={photo.url}>
          <div className="card">
            <div className="card-image">
              <figure className="image is-square">
                <img src={photo.url} alt={photo.name} />
              </figure>
            </div>
            <div className="card-content">
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  </div>


class ProfilePhotosController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
    };
  }

  upload(e) {
    e.preventDefault();

    const form = e.target;
    const path = "photos/" + uuid();
    const file = form[0].files[0];
    const name = file.name;
    const uploaded = new Date();

    this.setState({ uploading: true });

    this.props.upload(path, file, url => {
      form.reset();
      this.setState({ uploading: false });
      this.props.photos.push({
        url,
        name,
        uploaded,
      });
      this.props.submit(new Event("submit"));
    });
  }

  render() {
    return ProfilePhotosView({
      ...this.props,
      ...this.state,
      upload: this.upload.bind(this),
    });
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
  upload: (path, file, cb) => dispatch(fileActions.upload(path, file, cb)),
});

const ProfilePhotos = connect(mapState, mapDispatch)(ProfilePhotosController);

export default ProfilePhotos;
