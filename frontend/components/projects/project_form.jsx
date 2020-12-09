import React from 'react';

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Create a New Project</h1>
        <form action="">
        <label> Project Name
          <input type="text"/>
        </label>
        <label> Description
          <textarea></textarea>
        </label>
        <label> Description
          <textarea></textarea>
        </label>
        <button type="button">Submit</button>
        </form>
      </div>
    )
  }
}

export default ProjectForm;