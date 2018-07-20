
class AuthService {

  constructor(config, firebase) {
    this._config = config.auth;
    this._firebase = firebase;
  }

  onAuth(callback) {
    return this._firebase
      .auth()
      .onAuthStateChanged(user =>
        this.mapRoles(user).then(callback)
      );
  }

  get user() {
    return this._firebase.auth().currentUser;
  }

  mapRoles(user) {
    if (!user)
      return Promise.resolve(user);
    return this._firebase
      .firestore()
      .doc(`roles/${user.uid}`)
      .get()
      .then(roles => {
        if (roles.exists)
          user.roles = roles.data().in;
        return user;
      });
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
      .then(result =>
        this.mapRoles(result.user)
      )
      .catch(error => {
        console.log("AuthService.authenticate", error);
      });
  }

  unauthenticate() {
    return this._firebase.auth().signOut();
  }
}

export default AuthService;
