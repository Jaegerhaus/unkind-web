import { routerReducer as router } from "react-router-redux";

import { reducer as config } from "./config";
import { reducer as auth } from "./auth";

export default {
  router,
  config,
  auth,
};
