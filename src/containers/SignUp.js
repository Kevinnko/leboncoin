import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordBubble: false,
    passwordCheck: "",
    pwdError: false,
    pwdVerified: null,
    emailVerified: null,
    emptyPseudo: false,
    emptyMail: false,
    partnersOptin: false,
    cgv: false
  };

  handleSubmit = async event => {
    event.preventDefault();

    const response = await axios.post(
      "https://api-leboncoin.herokuapp.com/api/user/sign_up", // api locale
      {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }
    );
    if (response.data.token) {
      this.props.setUser(response.data, this.state.email); // pour modifier l'état du parent app
      this.props.history.push("/");
    } else {
      alert("an error occured");
    }
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    // console.log(target.checked);

    this.setState(
      {
        [name]: value
      },
      () => {
        // console.log("name ", name);
        if (this.state[name].length < 1) {
          if (name === "username") {
            this.setState({
              emptyPseudo: true
            });
          } else if (name === "email") {
            this.setState({
              emptyMail: true
            });
          }
        } else {
          if (name === "username") {
            this.setState({
              emptyPseudo: false
            });
          } else if (name === "email") {
            // Valider le format de l'adresse email (text@text.text) :
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              this.setState({
                emptyMail: false,
                emailVerified: true
              });
            } else {
              this.setState({
                emptyMail: false,
                emailVerified: false
              });
            }
          } else if (name === "password") {
            // Si plus de 8 caractères dont un chiffre et une lettre
            // - faire disparaître l'info-bulle
            if (value.match(/^(?=.*\d)[0-9a-zA-Z]{8,}$/)) {
              this.setState({
                passwordBubble: false,
                pwdVerified: true
              });
            } else {
              this.setState({
                passwordBubble: true,
                pwdVerified: false
              });
            }
          } else if (name === "passwordCheck") {
            if (this.state.password !== this.state.passwordCheck) {
              this.setState({
                pwdError: true,
                pwdVerified: false
              });
            } else if (this.state.password === this.state.passwordCheck) {
              this.setState({
                pwdError: false,
                pwdVerified: true
              });
            }
          }
        }
      }
    );
  };

  handlePassword = e => {
    if (this.state.password.match(/^(?=.*\d)[0-9a-zA-Z]{8,}$/)) {
      this.setState({
        passwordBubble: false
      });
    } else {
      this.setState({
        passwordBubble: true
      });
    }
  };

  render() {
    const { username, emailVerified, pwdVerified, cgv } = this.state;

    const buttonIsActive =
      username.length > 1 && emailVerified && pwdVerified && cgv;

    return (
      <>
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            padding: "30px 60px",
            marginTop: "20px"
          }}
        >
          <div style={{ flex: 1, paddingRight: "15px" }}>
            <h2 className="section-title">Pourquoi créer un compte ?</h2>
            <div style={{ display: "flex", margin: "60px 0 35px 0" }}>
              <div className="signup-picto">
                <i className="far fa-clock" />
              </div>
              <div className="signup-why">
                <h3>Gagnez du temps</h3>
                <p>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", margin: "35px 0 35px 0" }}>
              <div className="signup-picto">
                <i className="fas fa-bell" />
              </div>
              <div className="signup-why">
                <h3>Soyez les premiers informés</h3>
                <p>
                  Créez des alertes Immo ou Emploi et ne manquez jamais
                  l’annonce qui vous intéresse.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", margin: "35px 0 35px 0" }}>
              <div className="signup-picto">
                <i className="fas fa-eye" />
              </div>
              <div className="signup-why">
                <h3>Visibilité</h3>
                <p>
                  Suivez les statistiques de vos annonces (nombre de fois où
                  votre annonce a été vue, nombre de contacts reçus).
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              paddingLeft: "15px",
              flex: 1,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <h2 className="section-title" style={{ textAlign: "center" }}>
              Créez un compte
            </h2>
            <div className="signup-separator" />
            <form onSubmit={this.handleSubmit}>
              <div className="form-input-wrapper">
                <label className="input-label">Pseudo *</label>
                <input
                  className={
                    this.state.emptyPseudo === true
                      ? "form-input-empty"
                      : "form-input"
                  }
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <div
                  className={this.state.emptyPseudo ? "input-empty" : "hidden"}
                >
                  <span className="msg-empty">Veuillez saisir un pseudo</span>
                </div>
              </div>
              <div className="form-input-wrapper">
                <label className="input-label">Adresse email *</label>
                <input
                  className="form-input"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <div
                  className={this.state.emptyMail ? "input-empty" : "hidden"}
                >
                  <span className="msg-empty">
                    Veuillez saisir une adresse email.
                  </span>
                </div>
              </div>
              <div className="form-password-wrapper">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "0 0 48%"
                  }}
                >
                  <label className="input-label">Mot de passe *</label>
                  <input
                    className="form-input"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    onClick={this.handlePassword}
                  />
                  <div
                    className={
                      this.state.passwordBubble ? "pwd-info" : "hidden"
                    }
                  >
                    <span className="pwd-info-text">
                      Pour plus de sécurité, votre mot de passe doit contenir au
                      moins 8 caractères dont 1 chiffre et 1 lettre.
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "0 0 48%"
                  }}
                >
                  <label className="input-label">
                    Confirmer le mot de passe *
                  </label>
                  <input
                    className="form-input"
                    type="password"
                    name="passwordCheck"
                    value={this.state.passwordCheck}
                    onChange={this.handleChange}
                  />
                  <div
                    className={this.state.pwdError ? "input-empty" : "hidden"}
                  >
                    <span className="msg-empty">
                      Les mots de passe saisis sont différents. Veuillez
                      réessayer.
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label>
                  <input
                    style={{ marginRight: 8 }}
                    name="partnersOptin"
                    type="checkbox"
                    checked={this.state.partnersOptin}
                    onChange={this.handleChange}
                  />
                  Je souhaite recevoir des offres des partenaires du site
                  leboncoin susceptibles de m'intéresser.
                </label>
              </div>
              <div>
                <label>
                  <input
                    style={{ marginRight: 8 }}
                    name="cgv"
                    type="checkbox"
                    checked={this.state.cgv}
                    onChange={this.handleChange}
                  />
                  "J'accepte les{" "}
                  <a style={{ color: "#3E6F9F", fontWeight: "bold" }} href="#">
                    Conditions Générales de Vente
                  </a>
                  "
                </label>
              </div>
              <input
                disabled={!buttonIsActive}
                className={buttonIsActive ? "form-active-btn" : "form-btn"}
                type="submit"
                value="Créer mon compte personnel"
              />
            </form>
          </div>
        </div>
        <div className="container-fluid footer">
          <div className="container" style={{ paddingTop: "18px" }}>
            <p
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 13
              }}
            >
              leboncoin 2006-2019
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
