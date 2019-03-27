import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class LogIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = async event => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3100/api/user/log_in", {
      email: this.state.email,
      password: this.state.password
    });

    if (response.data.token) {
      this.props.history.push("/");
      this.props.setUser(response.data, this.state.email); // pour modifier l'état du parent app
    } else {
      alert("an error occured");
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: "30px 60px",
          marginTop: "20px"
        }}
        className="container"
      >
        <div className="login-wrapper">
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Connexion
          </h2>
          <div className="signup-separator" />
          <form onSubmit={this.handleSubmit}>
            <div className="form-input-wrapper">
              <label className="input-label">Adresse email</label>
              <input
                className="form-input"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input-wrapper">
              <label className="input-label">Mot de passe</label>
              <input
                className="form-input"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <input
              className="form-active-btn"
              type="submit"
              value="Se connecter"
            />
          </form>
        </div>
        <div className="grey-separator" />
        <div className="login-wrapper">
          <p style={{ textAlign: "center", fontWeight: "600" }}>
            Vous n'avez pas de compte ?
          </p>
          <Link to="/sign_up">
            <button
              style={{
                fontSize: 13,
                textAlign: "center",
                padding: 10,
                marginTop: 20,
                width: "100%",
                border: "2px solid #4183d7",
                borderRadius: 5,
                color: "#4183d7",
                fontWeight: "bold",
                outline: "none",
                cursor: "pointer"
              }}
            >
              Créer un compte
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default LogIn;
