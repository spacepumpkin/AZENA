import React from "react";
import { Link } from "react-router-dom";
import { login } from "../../actions/session_actions";

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
    this.switchForm = this.switchForm.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
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

  switchForm(e) {
    e.preventDefault();
    this.props.formType === "Sign Up" ? (
      this.props.history.push("/login")
    ) : (
      this.props.history.push("/signup")
    );
  }

  demoLogin(e) {
    e.preventDefault();
    if (this.props.formType === "Sign Up") this.props.history.push("/login");
    const demoUser = "welcometo@azanademopass";
    // types one char every 50ms
    let that = this;
    let count = 0, field;
    this.demo = setInterval(() => {
      field = count < 15 ? "email" : "password";
      that.setState({[field]: that.state[field].concat(demoUser[count])})
      count++;
      if (count === 23) {
        clearInterval(this.demo);
        setTimeout(that.props.processForm(that.state), 100);
      }
    }, 65)
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
          <Link to="/"><button className="session-back" type="button">&lt; Back</button></Link>

          <h1>{formType}</h1>

          <div className="session-demo">
            <h3>or try a {" "}
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

            <label htmlFor="session-email"> Email{" "}
              {formType === "Sign Up" && <span>(this will be your login)</span> }
              <input id="session-email" type="email" value={this.state.email} onChange={this.handleChange("email")} />
            </label>
            
            {
              formType === "Sign Up" &&
              <label htmlFor="session-username"> Username{" "}<span>(required)</span>
                <input id="session-username" type="text" value={this.state.username} onChange={this.handleChange("username")} />
              </label>
            }
            
            <label htmlFor="session-password" > Password{" "}
            {formType === "Sign Up" && <span>(minimum 6 characters)</span>} 
              <input id="session-password" type="password" value={this.state.password} onChange={this.handleChange("password")}/>
            </label>

            <button> {formType} </button>
          </form>
        </div>

        <div className="session-alternate">
            {
              formType === "Sign Up" ? (
                <span>Already have an account?{" "}
                  {/* <Link to="/login"> */}
                  <button type="button" onClick={this.switchForm}> Log In </button>
                  {/* </Link> */}
                </span>
              ) : (
                <span>Don't have an account?{" "}
                  {/* <Link to="/signup"> */}
                  <button type="button" onClick={this.switchForm}> Sign Up </button>
                  {/* </Link> */}
                </span>
              )
            }
        </div>
      </div>
    )
  }
};