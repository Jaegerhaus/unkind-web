import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import ProfilePhotos from "components/profile-photos";

import {
  selectors as authSelectors,
} from "store/auth";
import {
  actions as profileActions,
  selectors as profileSelectors,
} from "store/profile";

import "./index.scss";

const ProfileFormView = ({
  user,
  loading,
  form,
  update,
  submit,
  updated,
  dirty,
}) =>
  <div className="ProfileForm">
    <h2 className="title">
      Profile
    </h2>
    <form onSubmit={submit}>
      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" checked={form.isPublic} onChange={update("isPublic")} />
            &nbsp; Public
          </label>
        </div>
      </div>
      <div className="field">
        <label className="label">
          Callsign
        </label>
        <div className="control">
          <input type="text" className="input" value={form.callsign} onChange={update("callsign")} />
        </div>
      </div>
      <div className="field">
        <label className="label">
          Loadout
        </label>
        <div className="control">
          <input type="text" className="input" value={form.loadout} onChange={update("loadout")} />
        </div>
      </div>
      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <span className="is-size-7">
            {updated ? "Updated " + moment(updated).fromNow() : ""}
          </span>
        </div>
        <div className="control">
          <button
            className={`button is-success ${loading ? "is-loading" : ""}`}
            disabled={loading || !dirty}
            >
            Save
          </button>
        </div>
      </div>
    </form>

    <ProfilePhotos
      user={user}
      loading={loading}
      photos={form.photos}
      submit={submit}
    />

  </div>

class ProfileFormController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dirty: false,
      form: {
        isPublic: false,
        callsign: "",
        loadout: "",
        photos: [],
      },
    };
  }

  componentDidMount() {
    this.props.load(this.props.user.uid);
  }

  componentWillReceiveProps(props) {
    if (props.profile !== this.props.profile) {
      this.setState({
        form: {
          isPublic: props.profile.isPublic,
          callsign: props.profile.callsign,
          loadout: props.profile.loadout,
          photos: props.profile.photos || [],
          photoURL: props.user.photoURL,
        },
        updated: props.profile.updated,
        dirty: false,
      });
    }
  }

  update(field) {
    return e =>
      this.setState({
        form: {
          ...this.state.form,
          [field]: ["checkbox", "radio"].includes(e.target.type)
            ? e.target.checked
            : e.target.value,
        },
        dirty: true,
      });
  }

  submit(e) {
    e.preventDefault();
    this.props.store(this.props.user.uid, this.state.form);
  }

  render() {
    return ProfileFormView({
      ...this.props,
      ...this.state,
      update: this.update.bind(this),
      submit: this.submit.bind(this),
    });
  }
}

const mapState = state => ({
  user: authSelectors.user(state),
  profile: profileSelectors.data(state),
  loading: profileSelectors.loading(state),
});

const mapDispatch = dispatch => ({
  load: uid => dispatch(profileActions.load(uid)),
  store: (uid, profile) => dispatch(profileActions.store(uid, profile)),
});

const ProfileForm = connect(mapState, mapDispatch)(ProfileFormController);

export default ProfileForm;
