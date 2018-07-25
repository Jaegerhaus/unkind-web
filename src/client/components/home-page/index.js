import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import carousel from "bulma-carousel/dist/js/bulma-carousel";

import {
  actions as profileActions,
  selectors as profileSelectors,
} from "store/profile";

import Header from "components/header";

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
                <span className="HomePage-allcaps">Inter Pericula Intrepidi</span>
                &mdash;
                "Fearless in the face of danger"
              </p>
              <p className="HomePage-heroline">
                Unkind Special Operations Group. Magfed paintball. Ontario, Canada.
              </p>
              <p className="HomePage-heroline">
                <Link to="/events" className="button is-large is-primary is-inverted is-outlined">
                  Join Us
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
    <section className="hero is-large has-carousel">
      <div className="hero-carousel carousel-animated carousel-animate-fade">
        <div className="carousel-container">
          {profiles.map(profile =>
            profile.photos.map((photo, index) =>
              <div className={`carousel-item has-background`} key={photo.url}>
                <img className="is-background" src={photo.url} alt="" />
              </div>
            )
          )}
        </div>
        <div className="carousel-navigation is-overlay">
          <div className="carousel-nav-left">
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </div>
          <div className="carousel-nav-right">
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className="hero-body has-text-centered">
        <div className="container">
          <Link to="/media" className="button is-large is-primary is-inverted is-outlined">
            More photos and videos &raquo;
          </Link>
        </div>
      </div>
    </section>
    {carousel.attach()}
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
