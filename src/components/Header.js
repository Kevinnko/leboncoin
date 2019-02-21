import React from "react";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="container header">
            <div className="header-left">
              <img
                alt="logo"
                className="logo"
                src="https://upload.wikimedia.org/wikipedia/fr/7/7d/Leboncoin.fr_Logo_2016.svg"
              />
              <div className="menu">Déposer une annonce</div>
              <div className="menu">Offres</div>
            </div>

            <div className="header-right">{this.props.renderNav()}</div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
