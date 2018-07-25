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

const removed = (state, action) => {
  const uploading = state.uploading;
  if (uploading[action.meta.path]) {
    delete uploading[action.meta.path];
    return Object.assign({}, state, { uploading });
  }
  return state;
};

export default (state, action) => {
  switch(action.type) {
    case types.FILE_UPLOADING: return uploading(state, action);
    case types.FILE_UPLOADED: return uploaded(state, action);
    case types.FILE_REMOVED: return removed(state, action);
    default: return state || defaultState;
  }
};
