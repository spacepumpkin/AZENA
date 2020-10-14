import React from "react";


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
  }

  handleChange(field) {
    return (e) => {
      this.setState({[field]: e.currentTarget.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sessionAction(this.state);
    this.setState(this._nullState);
    this.props.history.push("/home");
  }

  render() {
    const { formType, sessionAction } = this.props;
    console.log(`rendering session form (${formType})...`);

    return (
      <div className="session-page">
        <h1>&#x2692; SessionForm under construction &#x2692;</h1>

        <div className="session-box">
          <div id="logo" className="session-logo">
            <img style={{width: 250, height: 100}} src={window.logoMainURL} />
          </div>

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

        </div>

      </div>
    )
  }
};