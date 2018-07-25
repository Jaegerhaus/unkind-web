import React from "react";
import { connect } from "react-redux";

import Header from "components/header";
import ApplicationForm from "components/application-form";
import ProfileForm from "components/profile-form";
import ProfilePhotos from "components/profile-photos";
import ProfileVideos from "components/profile-videos";

import {
  actions as authActions,
  selectors as authSelectors,
} from "store/auth";
import {
  actions as profileActions,
  selectors as profileSelectors,
} from "store/profile";

import "./index.scss";

const ProfilePageView = ({
  user,
  profile,
  unauthenticate,
}) =>
  <div className="ProfilePage">
    <Header/>
    <section className="ProfilePage-content section">
      <div className="container">
      {!user
        ? <i className="has-text-centered">please sign in</i>
        : <div className="columns">
            <div className="column is-half">
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="ProfilePage-photo image is-128x128">
                        <img src={profile.photoURL || user.photoURL} alt={user.displayName} />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">
                        {user.displayName}
                      </p>
                      <p className="subtitle is-6">
                        {user.email}
                      </p>
                      <p className="tags">
                        {user.roles.map(role =>
                          <span className="tag" key={role}>{role}</span>
                        )}
                      </p>
                      <p className="control">
                        <button className="button is-outlined is-danger" onClick={unauthenticate}>
                          <span>
                            Sign out
                          </span>
                          <span className="icon">
                            <i className="fa fa-sign-out"></i>
                          </span>
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="content">
                  </div>
                </div>
              </div>

              <hr/>

              {!user.roles.length &&
                <ApplicationForm user={user} />
              }
              {user.roles.includes("member") &&
                <ProfileForm />
              }

            </div>
            <div className="column is-half">

              {user.roles.includes("member") &&
                <ProfileVideos />
              }
              {user.roles.includes("member") &&
                <ProfilePhotos />
              }

            </div>
          </div>
      }
      </div>
    </section>
  </div>

class ProfilePageController extends React.Component {

  constructor(props) {
    super(props);
    if (props.user)
      props.load(props.user.uid);
  }

  componentWillReceiveProps(props) {
    if (props.user && props.user !== this.props.user)
      props.load(props.user.uid);
  }

  render() {
    return ProfilePageView({
      ...this.props,
    });
  }
}

const mapState = state => ({
  user: authSelectors.user(state),
  profile: profileSelectors.data(state),
});

const mapDispatch = dispatch => ({
  load: uid => dispatch(profileActions.load(uid)),
  unauthenticate: e => dispatch(authActions.unauthenticate()),
});

const ProfilePage = connect(mapState, mapDispatch)(ProfilePageController);

export default ProfilePage;
