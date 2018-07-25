import React from "react";
import { connect } from "react-redux";
import moment from "moment";

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
  </div>

class ProfileFormController extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dirty: false,
      form: this.mapForm(props.profile),
    };
  }

  mapForm(profile) {
    return {
      isPublic: profile.isPublic || false,
      callsign: profile.callsign || "",
      loadout: profile.loadout || "",
      photos: profile.photos || [],
    };
  }

  componentWillReceiveProps(props) {
    if (props.profile && props.profile !== this.props.profile)
      this.setState({
        dirty: false,
        form: this.mapForm(props.profile),
        updated: props.profile.updated,
      });
  }

  update(field) {
    return e =>
      this.setState({
        dirty: true,
        form: {
          ...this.state.form,
          [field]: ["checkbox", "radio"].includes(e.target.type)
            ? e.target.checked
            : e.target.value,
        },
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
  store: (uid, profile) => dispatch(profileActions.store(uid, profile)),
});

const ProfileForm = connect(mapState, mapDispatch)(ProfileFormController);

export default ProfileForm;
