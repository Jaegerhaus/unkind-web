import React from "react";
import { connect } from "react-redux";

import Header from "components/header";

import { selectors as authSelectors } from "store/auth";

import "./index.scss";

const ProfilePageView = ({
  user,
}) => (
  <div className="ProfilePage">
    <Header/>
    <section className="ProfilePage-content section">
      <div className="container">
        {!user
          ? <AuthForm />
          : <p>Welcome, {user.displayName}</p>
        }
      </div>
    </section>
  </div>
);

const mapState = state => ({
  user: authSelectors.user(state),
});

const ProfilePage = connect(mapState)(ProfilePageView);

export default ProfilePage;
