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
              <h1 className="title is-2">
                Unkind S.O.G.
              </h1>
              <h2 className="subtitle">
                Inter Pericula Intrepidi
              </h2>
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
        <div className="container has-text-centered">
          <p className="is-size-5">
            Magfed paintball. Ontario, Canada.
          </p>
        </div>
      </div>
    </section>
  </div>;

export default HomePage;
