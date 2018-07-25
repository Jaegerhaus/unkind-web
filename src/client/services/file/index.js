
class FileService {

  constructor(config, firebase) {
    this._firebase = firebase;
  }

  upload(path, file) {
    return this._firebase
      .storage()
      .ref(path)
      .put(file);
  }

  remove(url) {
    const ref = this._firebase
      .storage()
      .refFromURL(url);
    return ref
      .delete()
      .then(() => ref.fullPath);
  }
}

export default FileService;
