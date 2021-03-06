import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  actions as profileActions,
  selectors as profileSelectors,
} from "store/profile";

import Header from "components/header";
import Carousel from "components/carousel";

import "./index.scss";

const HomePageView = ({
  profiles,
}) =>
  <div className="HomePage">
    <Header/>
    <section className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column">
              <h1 className="title is-1">
                Unkind
                <span className="has-text-weight-light"> S.O.G.</span>
              </h1>
              <p className="subtitle is-6 is-italic">
                <span className="is-smallcaps is-size-4">
                  Inter Pericula Intrepidi
                </span>
                &mdash;
                "Fearless in the face of danger"
              </p>
              <p className="HomePage-heroline">
                Unkind Special Operations Group. Magfed paintball. Ontario, Canada.
              </p>
              <p className="HomePage-heroline">
                <Link to="/events" className="button is-large is-primary is-inverted is-outlined">
                  Join us &raquo;
                </Link>
              </p>
            </div>
            <div className="column is-one-quarter">
              <img className="HomePage-heroLogo" src="" title="Unkind" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="HomePage-carousel hero is-large">
      <Carousel
        images={
          profiles.reduce((urls, profile) =>
            urls.concat(profile.photos.map(photo => photo.url))
          , [])
        }
        content={
          <Link to="/media" className="button is-large is-primary is-inverted is-outlined">
            See all photos &amp; videos &raquo;
          </Link>
        }
      />
    </section>
    <section className="hero is-medium">
      <div className="hero-body has-text-centered">
        <div className="container">
          <p className="is-size-1 has-text-primary has-text-weight-light">
          </p>
          <p className="title is-1 has-text-primary has-text-weight-light">
            <span className="icon">
              <i className="fa fa-calendar"></i>
            </span>
            <br/>
            <span>
              Interested in joining us?
            </span>
          </p>
          <Link to="/events" className="button is-large is-primary is-outlined">
            See upcoming events &raquo;
          </Link>
        </div>
      </div>
    </section>
    <section className="HomePage-content section">
      <div className="container">
      </div>
    </section>
  </div>

class HomePageController extends React.Component {

  componentDidMount() {
    this.props.load();
  }

  render() {
    return HomePageView({
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

const HomePage = connect(mapState, mapDispatch)(HomePageController);

export default HomePage;
