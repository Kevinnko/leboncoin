import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Header />
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
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
