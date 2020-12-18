import React from 'react';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <>
        <div id="feedback-button" onClick={this.toggleModal}>Share Feedback <span>&#9787;</span></div>
        {/* {this.state.showModal && */}
          (
        <div id="feedback-modal-wrapper" className={this.state.showModal ? "show" : undefined}>
          <div className="modal-backdrop"></div>
          <div id="feedback-modal-box">
            <div className="modal-close" onClick={this.toggleModal}></div>
            <h1>Thank you for taking the time!</h1>
            <form id="feedback-modal-form">
              <label htmlFor="feedback-modal-form-1" />
              <input id="feedback-modal-form-1" type="text" />
            </form>
          </div>
        </div>
          )
      </>
    )
  }
}

export default Feedback;