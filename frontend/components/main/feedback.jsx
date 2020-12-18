import React from 'react';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(evt) {
    this.setState({ showModal: !this.state.showModal });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log("Feedback submitted!");
  }

  render() {
    return (
      <>
        <div id="feedback-button" onClick={this.toggleModal}>Share Feedback <span>&#9787;</span></div>
        {this.state.showModal &&
          (
            <div id="feedback-modal-wrapper" className={this.state.showModal ? "show" : undefined}>
              <div className="modal-backdrop"></div>
              <div id="feedback-modal-box">
                <div className="modal-close" onClick={this.toggleModal}></div>
                <h1>Thank you for taking the time!</h1>
                <form id="feedback-modal-form" onSubmit={this.handleSubmit}>
                  <label htmlFor="feedback-modal-form-1">Name (optional):</label>
                  <input id="feedback-modal-form-1" type="text" />
                  <label htmlFor="feedback-modal-form-2">Potential Improvements:</label>
                  <textarea id="feedback-modal-form-2" type="text"></textarea>
                  <label htmlFor="feedback-modal-form-3">Things That You Liked:</label>
                  <textarea id="feedback-modal-form-3" type="text" />
                  <label htmlFor="feedback-modal-form-4">Other Comments:</label>
                  <textarea id="feedback-modal-form-4" type="text" />
                  <button id="feedback-modal-submit">Submit</button>
                </form>
              </div>
            </div>
          )}
      </>
    )
  }
}

export default Feedback;