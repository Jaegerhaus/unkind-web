
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
}

export default FileService;
