import React from "react";


export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.props.user);
    // {
    //   username: "",
    //   email: "",
    //   password: ""
    // }
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
    dispatch(this.props.sessionAction(this.state));
  }

  render() {
    const { formType, sessionAction } = this.props;
    console.log(`rendering session form (${formType})...`);

    return (
      <div className="session-page">
        <h1>&#x2692; SessionForm under construction &#x2692;</h1>

        <div className="session-box">
          <div id="logo" className="session-logo">
            <img src={window.logoMainURL} />
          </div>

          <form onSubmit={this.handleSubmit}>
            <label> Username <span>(required)</span>
              <input type="text" value={this.state.username} onChange={this.handleChange("username")} />
            </label>
            <br />
            {
              formType === "Sign Up" &&
              <label> Email <span>(required for login)</span>
                <input type="email" value={this.state.email} onChange={this.handleChange("email")}/>
              </label>
            }
            <br />
            <label> Password <span>(required for login)</span>
              <input type="password" value={this.state.password} onChange={this.handleChange("password")}/>
            </label>
          </form>
        </div>

        <div className="session-alternate">

        </div>

      </div>
    )
  }
};