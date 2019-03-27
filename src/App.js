import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Cookies from "js-cookie";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";
import Publish from "./containers/Publish";

class App extends Component {
  state = {
    userId: Cookies.get("userId") || null,
    userEmail: Cookies.get("userEmail") || null,
    token: Cookies.get("token") || null
  };
  setUser = (user, email) => {
    console.log("user ", user, "email : ", email);
    this.setState({
      userId: user._id,
      userEmail: email,
      token: user.token
    });
    Cookies.set("userId", user._id);
    Cookies.set("userEmail", email);
    Cookies.set("token", user.token);
  };

  getUser = () => {
    return {
      token: this.state.token,
      email: this.state.userEmail,
      id: this.state.userId
    };
  };

  renderNav = () => {
    if (this.state.token) {
      return (
        <>
          <div className="login">
            <span>{this.state.userEmail}</span>
          </div>
          <div className="login">
            <button
              className="disconnect-btn"
              onClick={() => {
                // 1 - supprimer les cookies
                Cookies.remove("userId");
                Cookies.remove("userEmail");
                Cookies.remove("token");
                // 2 - remettre les state à null
                this.setState({
                  userId: null,
                  userEmail: null,
                  token: null
                });
              }}
            >
              Se déconnecter
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="login">
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "600"
              }}
              to={"/sign_up"}
            >
              Créer un compte
            </Link>
          </div>
          <div className="login">
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "600"
              }}
              to={"/log_in"}
            >
              Se connecter
            </Link>
          </div>
        </>
      );
    }
  };

  render() {
    console.log("là ", this.state.userEmail);
    console.log("là ", this.state.userId);
    console.log("là ", this.state.token);
    return (
      <BrowserRouter>
        <>
          <Header renderNav={this.renderNav} />
          <Switch>
            <Route
              path="/"
              exact={true}
              render={props => <Home {...props} />}
            />
            <Route
              path="/offer/:offerId"
              render={props => <Offer {...props} />}
            />
            <Route
              path="/sign_up"
              render={props => <SignUp setUser={this.setUser} {...props} />}
            />
            <Route
              path="/log_in"
              render={props => <LogIn setUser={this.setUser} {...props} />}
            />
            <Route
              path="/publish"
              render={props => {
                if (this.state.token) {
                  return <Publish getUser={this.getUser} {...props} />;
                } else {
                  return <Redirect to="/log_in" />;
                }
              }}
            />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
