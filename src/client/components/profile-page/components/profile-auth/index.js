import React from "react";
import { connect } from "react-redux";

import {
  actions as authActions,
  selectors as authSelectors,
} from "store/auth";
import {
  selectors as profileSelectors,
} from "store/profile";

const ProfileAuthView = ({
  user,
  profile,
  unauthenticate,
}) =>
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

const mapState = state => ({
  user: authSelectors.user(state),
  profile: profileSelectors.data(state),
});

const mapDispatch = dispatch => ({
  unauthenticate: e => dispatch(authActions.unauthenticate()),
});

const ProfileAuth = connect(mapState, mapDispatch)(ProfileAuthView);

export default ProfileAuth;
