import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import injectServices from "modules/inject-services";

import Header from "components/header";

import "./index.scss";

const ApplicationFormView = ({
  loading,
  form,
  update,
  submit,
  updated,
}) =>
  <section className="section ApplicationForm">
    <div className="container">
      <h2 className="title">
        Application
      </h2>
      <form onSubmit={submit}>
        <div className="field">
          <label className="label">
            About yourself
          </label>
          <div className="control">
            <textarea className="textarea" value={form.summary} onChange={update("summary")}></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label">
            Date of birth
          </label>
          <div className="control">
            <input type="text" className="input" value={form.birthdate} onChange={update("birthdate")} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" value={form.agreed} onChange={update("agreed")} />
              &nbsp; I agree to whatever you say
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className={`button is-success ${loading ? "is-loading" : ""}`}>
              {updated ? "Submitted" : "Submit"}
            </button>
            &nbsp;
            <span className="is-size-7">
              {updated ? moment(updated).fromNow() : ""}
            </span>
          </div>
        </div>
      </form>
    </div>
  </section>;

@injectServices
class ApplicationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      updated: null,
      form: {
        summary: "",
        birthdate: "",
        agreed: false,
      },
    };
  }

  componentDidMount() {
    this._firebase = this.context.services.firebase;
    this.load();
  }

  load() {
    this._firebase
      .firestore()
      .doc(`applications/${this.props.user.uid}`)
      .get()
      .then(application =>
        application.exists &&
        this.setState({
          form: application.data(),
          updated: application._document.version.toMicroseconds() / 1000,
        })
      );
  }

  save() {
    const {
      summary,
      birthdate,
      agreed,
    } = this.state.form;

    this.setState({
      loading: true,
    });

    const done = e =>
      this.setState({
        loading: false,
        updated: new Date().getTime(),
      });

    return this._firebase
      .firestore()
      .doc(`applications/${this.props.user.uid}`)
      .update({
        summary,
        birthdate,
        agreed,
      })
      .then(done)
      .catch(done);
  }

  render() {
    return ApplicationFormView({
      ...this.state,
      update: field => e => this.setState({ form: { ...this.state.form, [field]: e.target.value } }),
      submit: e => { e.preventDefault(); this.save(); },
    });
  }
}

export default ApplicationForm;
