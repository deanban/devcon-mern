import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
// import classnames from "classnames";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  _onFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  _onFormSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    // console.log(this.props.errors);
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this._onFormSubmit}>
                <TextFieldGroup
                  placeholder="Email address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  error={errors.email}
                  onChange={this._onFormChange}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  error={errors.password}
                  onChange={this._onFormChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
