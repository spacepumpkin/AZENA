import React from "react";
import { Link } from "react-router-dom";
// import { login } from "../../actions/session_actions";

export default class SessionForm extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this._nullState = {
      username: "",
      email: "",
      password: "",
      disabled: false
    };
    this.state = Object.assign({}, this._nullState);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchForm = this.switchForm.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.title = `azena - ${this.props.formType}`;
    document.body.classList.add("gray");
    console.log(`routed to ${this.props.formType} form`);
    // if (this.props.demo !== undefined && this.props.demo === "demo") { this.demoLogin() } // ! Ryan's method for demologin
  }

  componentDidUpdate() {
    // console.log(`Updated ${this.props.formType} form`);
    // if (this.state.email === "" && this.props.demo !== undefined && this.props.demo === "demo") { this.demoLogin() } // ! Ryan's method for demologin
  }

  componentWillUnmount() {
    console.log(`Unmounting ${this.props.formType} form`);
    document.body.classList.remove("gray");
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
    this.props.processForm({
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    });
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
    // console.log("logging in demo user...");
    this.setState({disabled: true}); // disable form when demouser is being entered

    // Method 3 - iterate through demoUser object based on fields we want to fill
    const login = this.props.login || this.props.processForm;
    const demoUser = { 
      email: "welcometo@azena", password: "demopass", username: "demo"
    };
    let that = this;
    let count = 0, field = "email", done = false;

    const {formType} = this.props;
    
    let demoAutoFill = (user, formType) => {
      if (count === user[field]["length"]) {
        if (field === "password") {
          clearInterval(this.demo);
          setTimeout(() => login(user), 1500);
          done = true;
        }
        field = (formType === "Log In" || field === "username") ? "password" : "username"; 
        count = 0;
      } 
      if (done !== true) {
        that.setState({ [field]: that.state[field].concat(user[field][count]) })
        count++;
      }
    };
    this.demo = setInterval(() => demoAutoFill(demoUser, formType), 100);
  }

  render() {
    const { formType, sessionErrors } = this.props;
    console.log(`rendering session form (${formType})...`);

    return (
      <div className="session-page">
        <h1>&#x2692; SessionForm under construction &#x2692;</h1>
        <div className="session-box">
          <Link to="/">
            {/* <button disabled={this.state.disabled} className="session-back" type="button">&lt; Back</button> */}
            <button disabled={this.state.disabled} className="session-back" type="button" />
          </Link>

          <div className="session-logo">
            <Link to="/" style={(this.state.disabled) ? { pointerEvents: 'none' } : {}} >
              <img id="session-logo" src={window.logoMainURL} />
            </Link>
          </div>

          <h1>{formType}</h1>

          <button className="session-demo" type="button" onClick={this.demoLogin} disabled={this.state.disabled}>
              {/* <button type="button" onClick={() => this.props.history.push("/demologin")}> DEMO </button> // ! Ryan's method for demologin */}
            <h3>Login automatically with a<span>&nbsp;DEMO </span> </h3>
          </button>

          <div className="session-separator">
            {/* <hr className="divider" /> or <hr className="divider"/> */}
            {/* <div className="session-line"></div><div> or </div><div className="session-line"></div> */}
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

          <form className="session-form" onSubmit={this.handleSubmit}>
            <fieldset disabled={this.state.disabled}>
            <label> Email address{" "}
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
            </fieldset>
          </form>
        </div>

        <div className="session-alternate">
            {
              formType === "Sign Up" ? (
              <span>Already have an account?&nbsp;&nbsp;
                  {/* <Link to="/login"> */}
                  <button type="button" onClick={this.switchForm} disabled={this.state.disabled}> Log In </button>
                  {/* </Link> */}
                </span>
              ) : (
                <span>Don't have an account?&nbsp;&nbsp;
                  {/* <Link to="/signup"> */}
                  <button type="button" onClick={this.switchForm} disabled={this.state.disabled}> Sign Up </button>
                  {/* </Link> */}
                </span>
              )
            }
        </div>
      </div>
    )
  }
};