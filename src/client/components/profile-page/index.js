import React from "react";
import { connect } from "react-redux";

import Header from "components/header";
import {
  actions as authActions,
  selectors as authSelectors,
} from "store/auth";

import "./index.scss";

const ProfilePageView = ({
  user,
  unauthenticate,
}) => (
  <div className="ProfilePage">
    <Header/>
    <section className="ProfilePage-content section">
      <div className="container">
      {!user
        ? <i className="has-text-centered">please sign in</i>
        : <div className="columns">
            <div className="column is-half-desktop">
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="ProfilePage-photo image is-128x128">
                        <img src={user.photoURL} alt={user.displayName} />
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
                        <button className="button is-danger" onClick={unauthenticate}>
                          <span>
                            Sign out
                          </span>
                          <span class="icon">
                            <i class="fa fa-sign-out"></i>
                          </span>
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="content">
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
      </div>
    </section>
  </div>
);

const mapState = state => ({
  user: authSelectors.user(state),
});

const mapDispatch = dispatch => ({
  unauthenticate: e => dispatch(authActions.unauthenticate()),
});

const ProfilePage = connect(mapState, mapDispatch)(ProfilePageView);

export default ProfilePage;
