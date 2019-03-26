import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/Leboncoin.fr_Logo_2016.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faList } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="container-fluid header-bg sticky-top">
          <div className="container header">
            <div className="header-left">
              <Link to="/" style={{ marginRight: 24 }}>
                <img alt="logo" className="logo" src={logo} />
              </Link>
              <Link
                to="/publish"
                style={{
                  marginRight: 12,
                  textDecoration: "none",
                  color: "white",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <FontAwesomeIcon icon={faPlusSquare} />
                <div className="menu">Déposer une annonce</div>
              </Link>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <FontAwesomeIcon icon={faList} />
                <div className="menu">Offres</div>
              </Link>
            </div>

            <div className="header-right">{this.props.renderNav()}</div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
