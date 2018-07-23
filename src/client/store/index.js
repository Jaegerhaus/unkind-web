import { routerReducer as router } from "react-router-redux";

import { reducer as config } from "./config";
import { reducer as auth } from "./auth";
import { reducer as profile } from "./profile";

export default {
  router,
  config,
  auth,
  profile,
};
