import types from "./types";

const defaultState = {
  isLoading: true,
  data: {},
};

const loading = (state, action) =>
  state.isLoading != action.payload
    ? {
        ...state,
        isLoading: action.payload,
      }
    : state;

const loaded = (state, action) =>
  Object.assign({}, state, {
    data: action.payload,
  });

export default (state, action) => {
  switch(action.type) {
    case types.PROFILE_LOADING: return loading(state, action);
    case types.PROFILE_LOADED: return loaded(state, action);
    default: return state || defaultState;
  }
};
