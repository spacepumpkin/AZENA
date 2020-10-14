import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this._nullState = {
      username: "",
      email: "",
      password: ""
    };
    this.state = Object.assign({}, this._nullState);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.title = `azena - ${this.props.formType}`;
    console.log(`Mounted ${this.props.formType} form`);
  }

  componentDidUpdate() {
    // console.log(`Updated ${this.props.formType} form`);
  }

  componentWillUnmount() {
    console.log(`Unmounting ${this.props.formType} form`);
    this.props.receiveSessionErrors([]);
  }

  handleChange(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);

    // Don't need with auth route
    //.then(() => this.props.history.push("/home"));
    // this.setState(this._nullState);
  }

  demoLogin(e) {
    e.preventDefault();
    const demoUser = { username: "demo", email: "demo@demo.com", password: "demopass" }
  }

  render() {
    console.log(`rendering session form (${formType})...`);
    const { formType, sessionErrors } = this.props;

    return (
      <div className="session-page">
        <h1>&#x2692; SessionForm under construction &#x2692;</h1>
        <div id="logo" className="session-logo">
          <img style={{ width: 200, height: 100 }} src={window.logoMainURL} />
        </div>

        <div className="session-box">
          <h1>{formType}</h1>
          <div>
            <h3>or try a
              <button type="button" onClick={this.demoLogin}> DEMO </button>
            </h3>
          </div>
          {
            (sessionErrors !== undefined || sessionErrors.length !== 0) &&
            <div className="session-errors">
              {sessionErrors.map((error, idx) => {
                return (
                <div key={`session-error-${idx}`} className="session-error">{error}</div>
                )
              })}
            </div>
          }
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="session-username"> Username <span>(required)</span> 
              <input id="session-username" type="text" value={this.state.username} onChange={this.handleChange("username")} />
            </label>
            {
              formType === "Sign Up" &&
              <label htmlFor="session-email"> Email <span>(required for login)</span>
                <input id="session-email" type="email" value={this.state.email} onChange={this.handleChange("email")}/>
              </label>
            }
            <label htmlFor="session-password" > Password <span>(required for login)</span>
              <input id="session-password" type="password" value={this.state.password} onChange={this.handleChange("password")}/>
            </label>

            <button> {formType} </button>
          </form>
        </div>

        <div className="session-alternate">
            {
              formType === "Sign Up" ? (
                <span>Already have an account?{" "}
                  <Link to="/login">
                    <button type="button"> Log In </button>
                  </Link>
                </span>
              ) : (
                <span>Don't have an account?{" "}
                  <Link to="/signup">
                    <button type="button"> Sign Up </button>
                  </Link>
                </span>
              )
            }
        </div>

      </div>
    )
  }
};