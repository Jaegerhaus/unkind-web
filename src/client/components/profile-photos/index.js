import React from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import {
  actions as fileActions,
  selectors as fileSelectors,
} from "store/file";
import {
  selectors as authSelectors,
} from "store/auth";
import {
  actions as profileActions,
  selectors as profileSelectors,
} from "store/profile";

import "./index.scss";

const ProfilePhotosView = ({
  uploading,
  loading,
  profile,
  submit,
  upload,
  select,
  selected,
  setProfilePhoto,
  remove,
}) =>
  <div className="ProfilePhotos">
    <h2 className="title">
      Photos
    </h2>
    {!selected &&
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
    }
    {selected &&
      <div className="ProfilePhotos-selected">
        <div className="columns is-mobile">
          <div className="column">
            <figure className="image is-square">
              <img src={selected.url} alt={selected.name} />
            </figure>
          </div>
          <div className="column">
            <div className="content">
              <button className="button is-outlined is-info" onClick={e => setProfilePhoto(selected)}>
                Set as profile
              </button>
            </div>
            <div className="content">
              <button className="button is-outlined is-danger" onClick={e => remove(selected)}>
                Delete
              </button>
            </div>
            <div className="content">
              <button className="button is-outlined" onClick={e => select(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    }
    <div className="ProfilePhotos-photos">
      <div className="columns is-mobile">
      {(profile.photos || []).map(photo =>
        <div className="column" key={photo.url}>
          <figure className="image is-square">
            <img src={photo.url} alt={photo.name} onClick={e => select(photo)} />
          </figure>
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
      selected: null,
    };
  }

  upload(e) {
    e.preventDefault();

    const form = e.target;
    const path = "photos/" + uuid();
    const file = form[0].files[0];
    const name = file.name;
    const uploaded = new Date();

    const {
      user,
      profile,
      upload,
      store,
    } = this.props;

    this.setState({ uploading: true });

    upload(path, file, url => {
      form.reset();
      this.setState({ uploading: false });
      profile.photos.push({
        url,
        name,
        uploaded,
      });
      store(user.uid, profile);
    });
  }

  select(photo) {
    this.setState({
      selected: photo,
    });
  }

  remove(photo) {
    const {
      user,
      profile,
      remove,
      store,
    } = this.props;

    remove(photo.url);

    profile.photos = profile.photos.filter(p => p.url !== photo.url);
    store(user.uid, profile);

    this.setState({
      selected: null,
    });
  }

  setProfilePhoto(photo) {
    const {
      user: { uid },
      profile,
      store,
    } = this.props;

    profile.photoURL = photo.url;
    store(uid, profile);
  }

  render() {
    return ProfilePhotosView({
      ...this.props,
      ...this.state,
      upload: this.upload.bind(this),
      select: this.select.bind(this),
      remove: this.remove.bind(this),
      setProfilePhoto: this.setProfilePhoto.bind(this),
    });
  }
}

const mapState = state => ({
  user: authSelectors.user(state),
  profile: profileSelectors.data(state),
  loading: profileSelectors.loading(state),
});

const mapDispatch = dispatch => ({
  upload: (path, file, cb) => dispatch(fileActions.upload(path, file, cb)),
  store: (uid, profile) => dispatch(profileActions.store(uid, profile)),
  remove: path => dispatch(fileActions.remove(path)),
});

const ProfilePhotos = connect(mapState, mapDispatch)(ProfilePhotosController);

export default ProfilePhotos;
