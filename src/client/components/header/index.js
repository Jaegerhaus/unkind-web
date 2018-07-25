import React from "react";
import { Link } from "react-router-dom";

import Auth from "./auth";

import "./index.scss";

const HeaderView = ({
  onMenuClick,
  activeClass,
}) => (
    <nav className="Header navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img className="Header-logo" src="" alt="Unkind" />
          <h1 className="is-size-4">
            <span className="has-text-weight-bold">Unkind</span>
            <span> S.O.G.</span>
          </h1>
        </Link>
        <div className={`navbar-burger burger ${activeClass}`} onClick={onMenuClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`navbar-menu ${activeClass}`}>
        <div className="navbar-end">
          <Link to="/media" className="navbar-item">
            Media
          </Link>
          <Link to="/events" className="navbar-item">
            Events
          </Link>
          <Link to="/roster" className="navbar-item">
            Roster
          </Link>
          <Auth />
        </div>
      </div>
    </nav>
);

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  onMenuClick(e) {
    e && e.preventDefault();
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  }

  render() {
    return HeaderView({
      onMenuClick: this.onMenuClick.bind(this),
      activeClass: this.state.isMenuOpen ? "is-active" : "",
    });
  }
}

export default Header;
