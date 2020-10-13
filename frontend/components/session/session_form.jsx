import React from "react";


export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {formType} = this.props;
    console.log(`rendering session form ${formType}...`);
    return (
      <div className="session-page">
        <title>{`${formType}`}</title>
        <h1>&#x2692; SessionForm under construction &#x2692;</h1>
        <div id="logo" className="session-logo">
          
        </div>

      </div>
    )
  }
};