import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
