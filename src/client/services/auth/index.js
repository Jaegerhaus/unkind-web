
class AuthService {

  constructor(config, firebase) {
    this._config = config.auth;
    this._firebase = firebase;
  }

  get user() {
    return this._firebase.auth().currentUser;
  }

  authenticate() {
    if (this.user)
      return Promise.resolve(this.user);

    const provider = new this._firebase.auth.GoogleAuthProvider();
    provider.addScope("email");
    provider.addScope("profile");

    return this._firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // var token = result.credential.accessToken;
        // var user = result.user;
        return result.user;
      })
      .catch(error => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        console.log(error);
      });
  }
}

export default AuthService;
