
class ProfileService {

  constructor(config, firebase) {
    this._firebase = firebase;
  }

  load(uid) {
    return this._firebase
      .firestore()
      .doc(`profiles/${uid}`)
      .get()
      .then(profile =>
        profile.exists
          ? {
              ...profile.data(),
              updated: profile._document.version.toMicroseconds() / 1000,
            }
          : null
      );
  }

  store(uid, profile) {
    return this._firebase
      .firestore()
      .doc(`profiles/${uid}`)
      .set(profile)
      .then(() => ({
        ...profile,
        updated: new Date().getTime(),
      }));
  }

  loadAll() {
    return this._firebase
      .firestore()
      .collection("profiles")
      .where("isPublic", "==", true)
      .get()
      .then(query =>
        query.docs.reduce((profiles, profile) =>
          [ ...profiles, profile.data() ]
        , [])
      );
  }

}

export default ProfileService;
