import { routerReducer as router } from "react-router-redux";

import { reducer as config } from "./config";
import { reducer as auth } from "./auth";
import { reducer as profile } from "./profile";
import { reducer as file } from "./file";

export default {
  router,
  config,
  auth,
  profile,
  file,
};
