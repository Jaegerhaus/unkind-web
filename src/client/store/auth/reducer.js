import types from "./types";

const defaultState = {
  user: null,
  isLoading: true,
};

const setUser = (state, action) =>
  Object.assign({}, state, { user: action.payload, isLoading: false });

const setLoading = (state, action) =>
  Object.assign({}, state, { isLoading: action.payload });

export default (state, action) => {
  switch(action.type) {
    case types.AUTH_SETUSER: return setUser(state, action);
    case types.AUTH_LOADING: return setLoading(state, action);
    default: return state || defaultState;
  }
};
