import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  actions as authActions,
  selectors as authSelectors,
} from "store/auth";

const AuthView = ({
  user,
  isLoading,
  authenticate,
}) => (
  user
    ? <Link to="/profile" className="navbar-item">
        Profile
      </Link>
    : <div className="navbar-item">
        <button
          onClick={authenticate}
          className={`button is-text is-inverted ${isLoading && "is-loading"}`}
          >
          Sign in
        </button>
      </div>
);

const mapState = state => ({
  user: authSelectors.user(state),
  isLoading: authSelectors.isLoading(state),
});

const mapDispatch = dispatch => ({
  authenticate: e => {
    e.preventDefault();
    dispatch(authActions.authenticate());
  },
});

const Auth = connect(mapState, mapDispatch)(AuthView);

export default Auth;
