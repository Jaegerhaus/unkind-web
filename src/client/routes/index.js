import React from "react";
import {
  Route,
  Switch,
} from "react-router-dom";

import HomePage from "components/home-page";
import ErrorPage from "components/error-page";
import ProfilePage from "components/profile-page";

import RouteHandler from "./handler";

export default (
  <div>
    <Route component={RouteHandler} />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/error" component={ErrorPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={ErrorPage} />
    </Switch>
  </div>
);
