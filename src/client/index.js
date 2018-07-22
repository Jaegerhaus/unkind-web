import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import {
  ConnectedRouter as Router,
  routerMiddleware,
} from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

import reducers from "./store";
import routes from "./routes";
import services from "./services";

import "./scss/index.scss";

import App from "components/app";
import ErrorPage from "components/error-page";

import { actions as authActions } from "store/auth";

const history = createHistory();

const store = createStore(
  combineReducers(reducers),
  {},
  compose(
    applyMiddleware(thunk.withExtraArgument(services)),
    applyMiddleware(routerMiddleware(history)),
    window.devToolsExtension ? window.devToolsExtension() : x => x,
  )
);

services.authService
  .onAuth(user =>
    store.dispatch(authActions.setUser(user))
  );

const router =
  <Router
    history={history}
    children={routes}
  />;

const app =
  <App
    store={store}
    router={router}
    services={services}
  />;

const mountpoint =
  document.getElementById("App");

window.app = {
  store,
  router,
  services,
  mountpoint,
};

try {
  ReactDOM.render(app, mountpoint);
} catch (e) {
  ReactDOM.render(<ErrorPage error={e}/>, mountpoint);
}
