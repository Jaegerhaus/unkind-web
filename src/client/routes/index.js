import React from "react";
import {
  Route,
  Switch,
} from "react-router-dom";

import HomePage from "components/home-page";
import ErrorPage from "components/error-page";
import ProfilePage from "components/profile-page";
import RosterPage from "components/roster-page";
import MediaPage from "components/media-page";

import RouteHandler from "./handler";

export default (
  <div>
    <Route component={RouteHandler} />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/error" component={ErrorPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/roster" component={RosterPage} />
      <Route path="/media" component={MediaPage} />
      <Route component={ErrorPage} />
    </Switch>
  </div>
);
