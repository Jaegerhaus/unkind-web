import React from "react";
import { connect } from "react-redux";
import injectServices from "modules/inject-services";

import {
  selectors as authSelectors,
} from "store/auth";
import {
  actions as profileActions,
  selectors as profileSelectors,
} from "store/profile";

import "./index.scss";

const ProfileVideosView = ({
  loading,
  profile,
  update,
  video,
  submit,
  select,
  selected,
  remove,
}) =>
  <div className="ProfileVideos">
    <h2 className="title">
      Videos
    </h2>
    <div className="ProfileVideos-form">
      <form onSubmit={submit}>
        <div className="field">
          <label className="label">
            Add a video
          </label>
          <div className="control">
            <input type="text" className="input" onChange={update("url")} placeholder="e.g. https://youtu.be/yourvideo" />
          </div>
        </div>
        {video &&
          <div className="media">
            <div className="media-left">
              <p className="image ProfileVideos-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
              </p>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{video.title}</strong>
                  <br/>
                  <em>{video.channel}</em>
                </p>
              </div>
            </div>
          </div>
        }
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <button
              type="submit"
              className={`button is-success ${loading ? "is-loading" : ""}`}
              disabled={!video || loading}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
    <hr/>
    <div>
    {(profile.videos || []).map(video =>
      <div className="media" key={video.url}>
        <div className="media-left">
          <p className="image ProfileVideos-thumbnail">
            <a href={video.url} target="_blank">
              <img src={video.thumbnail} alt={video.title} />
            </a>
          </p>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{video.title}</strong>
              <br/>
              <em>{video.channel}</em>
            </p>
          </div>
        </div>
        <div className="media-right">
          <button className="delete" onClick={remove(video)}></button>
        </div>
      </div>
    )}
    </div>
    <hr/>
  </div>

@injectServices
class ProfileVideosController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  update(field) {
    return e => {
      this.context.services.youtubeService
        .getDetails(e.target.value)
        .then(video =>
          this.setState({ video })
        )
        .catch(e =>
          this.setState({ video: null })
        );
    };
  }

  select(video) {
    this.setState({
      selected: video,
    });
  }

  submit(e) {
    e.preventDefault();
    e.target.reset();

    const { user, profile, store } = this.props;
    profile.videos = profile.videos || [];
    profile.videos.push(this.state.video);

    store(user.uid, profile);

    this.setState({ video: null });
  }

  remove(video) {
    return e => {
      const { user, profile, store } = this.props;
      profile.videos = profile.videos.filter(v => v.url !== video.url);
      store(user.uid, profile);
    }
  }

  render() {
    return ProfileVideosView({
      ...this.props,
      ...this.state,
      update: this.update.bind(this),
      select: this.select.bind(this),
      submit: this.submit.bind(this),
      remove: this.remove.bind(this),
    });
  }
}

const mapState = state => ({
  user: authSelectors.user(state),
  profile: profileSelectors.data(state),
});

const mapDispatch = dispatch => ({
  store: (uid, profile) => dispatch(profileActions.store(uid, profile)),
});

const ProfileVideos = connect(mapState, mapDispatch)(ProfileVideosController);

export default ProfileVideos;
