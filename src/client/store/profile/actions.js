import types from "./types";

const loading = isLoading => ({
  type: types.PROFILE_LOADING,
  payload: isLoading,
});

const loaded = profile => ({
  type: types.PROFILE_LOADED,
  payload: profile,
});

const loadedAll = profiles => ({
  type: types.PROFILE_LOADED_ALL,
  payload: profiles,
});

const load = uid => (dispatch, getState, services) => {
  dispatch(loading(true));
  services.profileService
    .load(uid)
    .then(profile => {
      dispatch(loading(false));
      dispatch(loaded(profile));
    })
    .catch(e => {
      console.log("profile.load", e);
      dispatch(loading(false));
    });
};

const store = (uid, profile) => (dispatch, getState, services) => {
  dispatch(loading(true));
  services.profileService
    .store(uid, profile)
    .then(profile => {
      dispatch(loading(false));
      dispatch(loaded(profile));
    })
    .catch(e => {
      console.log("profile.store", e);
      dispatch(loading(false));
    });
};

const loadAll = uid => (dispatch, getState, services) => {
  dispatch(loading(true));
  services.profileService
    .loadAll()
    .then(profiles => {
      dispatch(loading(false));
      dispatch(loadedAll(profiles));
    })
    .catch(e => {
      console.log("profile.loadAll", e);
      dispatch(loading(false));
    });
};

export default {
  load,
  loading,
  loaded,
  store,
  loadAll,
};
