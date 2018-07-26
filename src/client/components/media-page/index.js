import React from "react";
import { connect } from "react-redux";

import {
  actions as profileActions,
  selectors as profileSelectors,
} from "store/profile";

import Header from "components/header";

import "./index.scss";

const MediaPageView = ({
  profiles,
}) =>
  <div className="MediaPage">
    <Header/>
    <section className="MediaPage-content section">
      <div className="container">
        <h2 className="title">
          Videos
        </h2>
        <div className="MediaPage-videos columns is-multiline is-mobile is-centered">
          {profiles.map(profile =>
            (profile.videos || []).map(video =>
              <div className="column is-one-quarter-desktop is-one-third-tablet is-one-third-mobile" key={video.url}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <a href={video.url} target="_blank">
                        <img src={video.thumbnail} alt={video.url} title={video.title} />
                      </a>
                    </figure>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <hr/>
        <h2 className="title">
          Photos
        </h2>
        <div className="MediaPage-photos columns is-multiline is-mobile is-centered">
          {profiles.map(profile =>
            (profile.photos || []).map(photo =>
              <div className="column is-one-quarter-desktop is-one-third-tablet is-one-third-mobile" key={photo.url}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-square">
                      <a href={photo.url} target="_blank">
                        <img src={photo.url} alt={photo.url} />
                      </a>
                    </figure>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  </div>

class MediaPageController extends React.Component {

  componentDidMount() {
    this.props.load();
  }

  render() {
    return MediaPageView({
      ...this.props,
    });
  }
}

const mapState = state => ({
  profiles: profileSelectors.all(state),
});

const mapDispatch = dispatch => ({
  load: () => dispatch(profileActions.loadAll()),
});

const MediaPage = connect(mapState, mapDispatch)(MediaPageController);

export default MediaPage;
