import types from "./types";

const defaultState = {
  isLoading: true,
  data: {},
  all: [],
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
    data: action.payload || {},
  });

const loadedAll = (state, action) =>
  Object.assign({}, state, {
    all: action.payload || [],
  });

export default (state, action) => {
  switch(action.type) {
    case types.PROFILE_LOADING: return loading(state, action);
    case types.PROFILE_LOADED: return loaded(state, action);
    case types.PROFILE_LOADED_ALL: return loadedAll(state, action);
    default: return state || defaultState;
  }
};
