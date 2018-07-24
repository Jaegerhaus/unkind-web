import types from "./types";

const defaultState = {
  uploading: {},
};

const uploading = (state, action) =>
  Object.assign({}, state, {
    uploading: {
      [action.meta.path]: action.payload,
    },
  });

const uploaded = (state, action) =>
  Object.assign({}, state, {
    uploading: {
      [action.meta.path]: action.payload,
    },
  });

export default (state, action) => {
  switch(action.type) {
    case types.FILE_UPLOADING: return uploading(state, action);
    case types.FILE_UPLOADED: return uploaded(state, action);
    default: return state || defaultState;
  }
};
