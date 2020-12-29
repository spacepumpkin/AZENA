import React from 'react';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      activeInput: -1,
      errors: [],
      success: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal(evt) {
    this.setState({ showModal: !this.state.showModal });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log("Feedback submitted!");
    const data = new FormData(evt.target); // this can be submitted directly to BE?
    // FormData.entries(), FormData.keys(), FormData.get("name"), FormData.set("name", value)
    const feedback = {};
    for (let [inputName, inputValue] of data.entries()) {
      console.log(`${inputName}: "${inputValue}"`);
      feedback[inputName] = inputValue;
    }
    let that = this;
    this.createFeedback(feedback)
      .then(
        res => {
          console.log("res: ", res)
          that.setState({ success: true })
          setTimeout(that.toggleModal, 5000);
        }, errors => {
          console.log("errors: ", errors.responseJSON);
          that.setState({ errors: errors.responseJSON })
        });
  }

  createFeedback(feedback) {
    console.log(`submitting feedback...`);

    return $.ajax({
      url: `/api/feedback`,
      method: "POST",
      data: {
        feedback
      }
    })
  }

  handleFocus(inputId) {
    return (evt) => {
      this.setState({ activeInput: inputId });
    }
  }

  render() {
    const { showModal, activeInput, errors, success } = this.state;

    return (
      <>
        <div id="feedback-button" onClick={this.toggleModal}>Share Feedback <span>&#9787;</span></div>
        {showModal &&
          (
            <div className={`basic-modal-wrapper${showModal ? " show" : ""}`}>
              <div className="modal-backdrop"></div>
              <div id="feedback-modal-box">
                <div className="modal-close" onClick={this.toggleModal}></div>
                <h1>Feedback Form</h1>

                {success ? (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h2> Thank you for taking the time to provide feedback! </h2>
                    <button className={"feedback-modal-submit"} onClick={() => this.setState({ success: false })} type="button">Submit another entry?</button>
                    </div>
                  </div>
                ) :
                  (
                    <>
                      <h3 style={{ margin: "10px 0" }}>{"Thank you for taking the time! Any feedback is welcome."}</h3>
                      <form id="feedback-modal-form" onSubmit={this.handleSubmit}>
                        <label htmlFor="feedback-modal-form-1" className={activeInput === 1 ? "label-input-focused" : undefined} >
                          1-3 Potential Improvements:</label>
                        <textarea id="feedback-modal-form-1" type="text" name="improvements" onFocus={this.handleFocus(1)} />
                        <label htmlFor="feedback-modal-form-2" className={activeInput === 2 ? "label-input-focused" : undefined} >
                          Likes/Dislikes, Death Threats, or Other Comments:</label>
                        <textarea id="feedback-modal-form-2" type="text" name="other_comments" onFocus={this.handleFocus(2)} />
                        <label htmlFor="feedback-modal-form-3" className={activeInput === 3 ? "label-input-focused" : undefined} >
                          Name (optional):</label>
                        <input id="feedback-modal-form-3" type="text" name="name" onFocus={this.handleFocus(3)} />
                        {/* <label htmlFor="feedback-modal-form-4" className={activeInput === 4 ? "label-input-focused" : undefined} >
                    Other Comments:</label>
                  <textarea id="feedback-modal-form-4" type="text" name="other" onFocus={this.handleFocus(4)} /> */}
                        <button className="feedback-modal-submit">Submit Feedback</button>
                      </form>
                      <div className="feedback-errors">{errors.join(", ")}</div>
                    </>
                  )}
              </div>
            </div>
          )}
      </>
    )
  }
}

export default Feedback;