import React from 'react';

class ProjectTaskCreateRow extends React.Component {
  constructor(props) {
    super(props);

    let todayDate = new Date().toISOString().substr(0, 10);

    this._nullState = {
      name: "",
      description: "",
      dueDate: todayDate,
      disableFields: false
    };

    this.state = Object.assign({}, this._nullState);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
  }

  handleKeyDown(evt) {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      evt.preventDefault();
      // evt.target.blur();
      this.addNewTask();
    }
  }

  handleChange(field) {
    return (evt) => {
      this.setState({ [field]: evt.target.value });
    };
  }

  addNewTask() {
    const { name, description, dueDate } = this.state;
    // Replace initial spaces or newline/tab chars
    let filteredName = name.replace(/^ +|[\r\n\v\t]+/g, '');
    if (filteredName === '') {
      filteredName = 'Untitled Task';
    }
    let that = this;
    this.props.createTask({ name: filteredName, description, dueDate, projectId: this.props.projectId })
    .then(() => that.setState(that._nullState));
    this.setState({ disableFields: true });
  }

  render() {
    const { task, destroyTask } = this.props;
    const { disableFields } = this.state;

    return (
      <div className="project-task-row" >
        <div className="project-task-check-wrapper">
          <button className={"plus-button"} type="button" disabled={disableFields} onClick={this.addNewTask} />
        </div>
        <input className={`project-task-input task-input`} placeholder="Add New Task..." type="text"
          value={this.state.name}
          onChange={this.handleChange("name")}
          onKeyDown={this.handleKeyDown}
          // onBlur={this.handleBlur("name")}
          autoComplete="off" autoCorrect="off" autoCapitalize="off"
          spellCheck="false"
          disabled={disableFields}
        />
        <input className={`project-task-input task-input`} placeholder="Add Task Description..." type="text"
          value={this.state.description}
          onChange={this.handleChange("description")}
          onKeyDown={this.handleKeyDown}
          // onBlur={this.handleBlur("description")}
          autoComplete="off" autoCorrect="off" autoCapitalize="off"
          spellCheck="false"
          disabled={disableFields}
        />
        <input className={"my-tasks-date"} type="date"
          value={this.state.dueDate}
          onChange={this.handleChange("dueDate")}
          onKeyDown={this.handleKeyDown}
          disabled={disableFields}
        />
      </div>
    )
  }
}

export default ProjectTaskCreateRow;