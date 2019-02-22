import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    email: "",
    username: "",
    password: ""
  };

  handleSubmit = async event => {
    event.preventDefault();
    // console.log("ici", this.state);

    const response = await axios.post(
      "https://leboncoin-api.herokuapp.com/api/user/sign_up", // api de farid
      {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }
    );
    console.log("response.data", response.data);
    if (response.data.token) {
      this.props.history.push("/");
      this.props.setUser((response.data, this.state.email)); // pour modifier l'état du parent app
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input type="submit" value="Valider" />
        </form>
      </div>
    );
  }
}

export default SignUp;
