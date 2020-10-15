import { verify } from "crypto";
import React from "react";
import { Link } from "react-router-dom";
// import { login } from "../../actions/session_actions";

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
    // if (this.props.demo === "demo") { this.demoLogin() }
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
      // if (field === "password-verify") {
      //   let verifyInput = document.getElementById("session-password-verification");
        
      // }
      this.setState({[field]: e.currentTarget.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // const verifyInput = document.getElementById("session-password-verification");
    // if (verifyInput.value === )
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

  demoLogin() {
    console.log("logging in demo user...");

    // Method 1: Works but redundantly fills login state with username as well
    const demoUser = "welcometo@azenademopassdemo";
    const login = this.props.login || this.props.processForm;
    let that = this;
    let count = 0, field;
    this.demo = setInterval(() => {
      if (count < 27) {
        field = count < 15 ? "email" : (count < 23 ? "password" : "username");
        that.setState({ [field]: that.state[field].concat(demoUser[count]) })
        count++;
      } else {
        clearInterval(this.demo);
        setTimeout(login(that.state), 5000);
      }
    }, 100);

    // Method 2: Refactored to adjust to sign in form
    // const login = this.props.login || this.props.processForm;
    // const demoUser = "welcometo@azenademopassdemo";
    // let that = this;
    // let count = 0, field;

    // let demoAutoFill = (user, emailCount, passwordCount, usernameCount) => {
    //   if (count < (emailCount+passwordCount)) {
    //     field = count < emailCount ? "email" : "password";
    //     that.setState({ [field]: that.state[field].concat(user[count]) })
    //     count++;
    //   } else if (count < (emailCount+passwordCount+usernameCount) && that.props.formType === "Sign Up") {
    //     field = "username";
    //     that.setState({ [field]: that.state[field].concat(user[count]) })
    //     count++;
    //   } else {
    //     clearInterval(this.demo);
    //     setTimeout(login(that.state), 5000);
    //   }
    // };
    // this.demo = setInterval(() => demoAutoFill(demoUser, 15, 8, 4), 100);

  }

  render() {
    const { formType, sessionErrors } = this.props;
    console.log(`rendering session form (${formType})...`);

    return (
      <div className="session-page">
        <h1>&#x2692; SessionForm under construction &#x2692;</h1>
        <div id="logo" className="session-logo">
          <Link to="/"><img style={{ width: 200, height: 100 }} src={window.logoMainURL} /></Link>
        </div>

        <div className="session-box">
          <Link to="/"><button className="session-back" type="button">&lt; Back</button></Link>

          <h1>{formType}</h1>

          <div className="session-demo">
            <h3>or try a {" "}
              {/* <button type="button" onClick={() => this.props.history.push("/demologin")}> DEMO </button> */}
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

            <label> Email{" "}
              {formType === "Sign Up" && <span>(this will be your login)</span> }
              <input id="session-email" type="email" value={this.state.email} onChange={this.handleChange("email")} />
            </label>
            
            {
              formType === "Sign Up" &&
              <label> Username{" "}<span>(required)</span>
                <input id="session-username" type="text" value={this.state.username} onChange={this.handleChange("username")} />
              </label>
            }
            
            <label> Password{" "}
              {formType === "Sign Up" && <span>(minimum 6 characters)</span>} 
              <input id="session-password" type="password" value={this.state.password} onChange={this.handleChange("password")}/>
            </label>

            {/* {
              formType === "Sign Up" &&
              <label> Verify Password{" "}
                <input id="session-password-verification" type="password" onChange={this.handleChange("password-verify")}/>
              </label>
            } */}

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