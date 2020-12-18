import React from 'react';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      activeInput: -1
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  toggleModal(evt) {
    this.setState({ showModal: !this.state.showModal });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log("Feedback submitted!");
    const data = new FormData(evt.target); // this can be submitted directly to BE?
    // FormData.entries(), FormData.keys(), FormData.get("name"), FormData.set("name", value)
    for (let [inputName, inputValue] of data.entries()) {
      console.log(inputName, inputValue);
    }
  }

  handleFocus(inputId) {
    return (evt) => {
      this.setState({ activeInput: inputId });
    }
  }

  render() {
    const { showModal, activeInput } = this.state;
    console.log("activeInput: ", activeInput);

    return (
      <>
        <div id="feedback-button" onClick={this.toggleModal}>Share Feedback <span>&#9787;</span></div>
        {showModal &&
          (
            <div id="feedback-modal-wrapper" className={showModal ? "show" : undefined}>
              <div className="modal-backdrop"></div>
              <div id="feedback-modal-box">
                <div className="modal-close" onClick={this.toggleModal}></div>
                <h1>Thank you for taking the time!</h1>
                <form id="feedback-modal-form" onSubmit={this.handleSubmit}>
                  <label htmlFor="feedback-modal-form-1" className={activeInput === 1 ? "label-input-focused" : undefined} >
                    Name (optional):</label>
                  <input id="feedback-modal-form-1" type="text" name="name" onFocus={this.handleFocus(1)} />
                  < label htmlFor="feedback-modal-form-2" className={activeInput === 2 ? "label-input-focused" : undefined} >
                    1-3 Potential Improvements:</label>
                  <textarea id="feedback-modal-form-2" type="text" name="improvements" onFocus={this.handleFocus(2)} />
                  <label htmlFor="feedback-modal-form-3" className={activeInput === 3 ? "label-input-focused" : undefined} >
                    Things That You Liked:</label>
                  <textarea id="feedback-modal-form-3" type="text" name="pros" onFocus={this.handleFocus(3)} />
                  <label htmlFor="feedback-modal-form-4" className={activeInput === 4 ? "label-input-focused" : undefined} >
                    Other Comments:</label>
                  <textarea id="feedback-modal-form-4" type="text" name="other" onFocus={this.handleFocus(4)} />
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