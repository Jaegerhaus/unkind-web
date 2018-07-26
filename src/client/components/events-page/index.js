import React from "react";
import { connect } from "react-redux";

import Header from "components/header";

import "./index.scss";

const EventsPageView = ({
}) =>
  <div className="EventsPage">
    <Header/>
    <section className="EventsPage-content section">
      <div className="container">
        <h2 className="title">
          Events
        </h2>
        <p>
          <em>coming soon &hellip;</em>
        </p>
      </div>
    </section>
  </div>

class EventsPageController extends React.Component {

  componentDidMount() {
  }

  render() {
    return EventsPageView({
      ...this.props,
    });
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
});

const EventsPage = connect(mapState, mapDispatch)(EventsPageController);

export default EventsPage;
