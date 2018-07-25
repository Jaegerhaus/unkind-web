import React from "react";
import { connect } from "react-redux";

import Header from "components/header";

import {
  actions as profileActions,
  selectors as profileSelectors,
} from "store/profile";

import "./index.scss";

const RosterPageView = ({
  profiles,
}) =>
  <div className="RosterPage">
    <Header/>
    <section className="section RosterPage-content">
      <div className="container">
        <div className="columns">
        {profiles.map(profile =>
          <div className="column is-one-quarter-desktop is-one-third-tablet" key={profile.callsign}>
            <div className="card RosterPage-profile">
              <div className="card-image">
                <figure className="image">
                  <img src={profile.photoURL} alt={profile.callsign} />
                </figure>
              </div>
              <div className="card-content">
                <div className="content">
                  <p className="title">
                    {profile.callsign}
                  </p>
                  <p className="subtitle is-7">
                    {profile.loadout}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  </div>

class RosterPageController extends React.Component {

  componentDidMount() {
    this.props.load();
  }

  render() {
    return RosterPageView({
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

const RosterPage = connect(mapState, mapDispatch)(RosterPageController);

export default RosterPage;
