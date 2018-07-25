import types from "./types";

const uploading = (path, data) => ({
  type: types.FILE_UPLOADING,
  meta: { path },
  payload: data,
});

const uploaded = (path, data) => ({
  type: types.FILE_UPLOADED,
  meta: { path },
  payload: data,
});

const removed = path => ({
  type: types.FILE_REMOVED,
  meta: { path },
});

const upload = (path, file, callback) => (dispatch, getState, services) => {
  dispatch(uploading(path, { name: file.name, progress: 0 }));
  const task =
    services.fileService.upload(path, file);
  task
    .on("state_changed",
      snapshot => {
        dispatch(uploading(path, {
          progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        }));
      },
      error => {
        console.log("file.load", error);
        dispatch(uploading(path, { error }));
      },
      () => {
        task.snapshot.ref
          .getDownloadURL()
          .then(url => {
            dispatch(uploaded(path, { url }));
            callback(url);
          });
      }
    );
};

const remove = url => (dispatch, getState, services) =>
  services.fileService
    .remove(url)
    .then(path =>
      dispatch(removed(path))
    );


export default {
  upload,
  uploading,
  uploaded,
  remove,
};
