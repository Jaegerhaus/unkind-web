import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { selectors as authSelectors, actions as authActions } from "store/auth";

const AuthView = ({
  user,
  isLoading,
  authenticate,
}) => (
  user
    ? <Link to="/profile" className="navbar-item">
        Profile
      </Link>
    : <a href="#" onClick={authenticate} className="navbar-item">
        {isLoading && <a className="button is-loading"></a>}
        Sign in
      </a>
);

const mapState = state => ({
  user: authSelectors.user(state),
  isLoading: authSelectors.isLoading(state),
});

const mapDispatch = dispatch => ({
  authenticate: e => { e.preventDefault(); dispatch(authActions.authenticate()); },
});

const Auth = connect(mapState, mapDispatch)(AuthView);

export default Auth;
