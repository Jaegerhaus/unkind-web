import React from "react";
import { Link } from "react-router-dom";

import Header from "components/header";

import "./index.scss";

const HomePage = () =>
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
            </div>
            <div className="column is-one-quarter">
              <img className="HomePage-heroLogo" src="" title="Unkind" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="HomePage-content section">
      <div className="container">
      </div>
    </section>
  </div>;

export default HomePage;
