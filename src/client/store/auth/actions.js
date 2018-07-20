import types from "./types";

const setUser = user => ({
    type: types.AUTH_SETUSER,
    payload: user,
});

const setLoading = isLoading => ({
    type: types.AUTH_LOADING,
    payload: isLoading,
});

const authenticate = () => (dispatch, getState, services) => {
  dispatch(setLoading(true));
  services.authService
    .authenticate()
    .then(user => {
      dispatch(setLoading(false));
    });
};

export default {
  setUser,
  setLoading,
  authenticate,
};
