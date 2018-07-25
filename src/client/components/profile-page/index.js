import React from "react";
import { connect } from "react-redux";

import Header from "components/header";
import ProfileAuth from "./components/profile-auth";
import ApplicationForm from "./components/application-form";
import ProfileForm from "./components/profile-form";
import ProfilePhotos from "./components/profile-photos";
import ProfileVideos from "./components/profile-videos";

import {
  selectors as authSelectors,
} from "store/auth";
import {
  actions as profileActions,
} from "store/profile";

import "./index.scss";

const ProfilePageView = ({
  user,
}) =>
  <div className="ProfilePage">
    <Header/>
    <section className="ProfilePage-content section">
      <div className="container">
      {!user &&
        <p className="has-text-centered">
          <em>please sign in</em>
        </p>
      }
      {user &&
        <div className="columns">
          <div className="column is-half">

            <ProfileAuth />
            <hr/>

            {!user.roles.length &&
              <ApplicationForm user={user} />
            }
            {user.roles.includes("member") &&
              <ProfileForm />
            }
            
            <hr/>

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
});

const mapDispatch = dispatch => ({
  load: uid => dispatch(profileActions.load(uid)),
});

const ProfilePage = connect(mapState, mapDispatch)(ProfilePageController);

export default ProfilePage;
