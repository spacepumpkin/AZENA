import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

function MyTasks({ assignedTasks, taskProjects, taskWorkspaces, taskCreators }) {

  // const [] = useState()
  const handleKeyDown = function(evt) {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      evt.preventDefault();
      evt.target.blur();
    }
  };

  // const handleBlur = function(evt) {

  // };
  
  const taskRows = [];
  for (let i = 0; i < assignedTasks.length; i++) {
    let assignedTask = assignedTasks[i];

    taskRows.push(
      <tr className="my-tasks-table-row" key={`task-${assignedTask.id}`}>
        <td>
          <span>Done?</span>
          <input className={`task-name-input`}
            type="text"
            onKeyDown={handleKeyDown}
            // onChange={handleTitleChange}
            // onBlur={handleTaskUpdate}
            // ref={this.taskInput}
            autoComplete="off" autoCorrect="off" autoCapitalize="off"
            spellCheck="false"
            disabled={false}
            defaultValue={assignedTask.name}
            // onAnimationEnd={() => this.setState({ titleFlash: false })}
          />
        </td>
        <td><div>{assignedTask.description}</div></td>
        <td><div>{taskWorkspaces[i].name}</div></td>
        <td><div>{taskProjects[i].name}</div></td>
        <td>{assignedTask.dueDate}</td>
        <td>{taskCreators[i].username}</td>
      </tr>
    )
  }

  // const taskRows = assignedTasks.map( task => {
  //   return (
  //     <tr>
  //       <td>{task.name}</td>
  //       <td>{task.description}</td>
  //       <td>workspace</td>
  //       <td>{task.name}</td>
  //       <td>{task.dueDate}</td>
  //       <td>{users[task.creatorId]}</td>
  //     </tr>
  //   )
  // })

  return (
    <div id="my-tasks">
      <div id="my-tasks-top">
        Add Tasks
      </div>
      <table id="my-tasks-table">
        <thead>
          <tr className="table-headings">
            <th>Task</th>
            <th>Description</th>
            <th>Workspace</th>
            <th>Project</th>
            <th>Due Date</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {taskRows}
        </tbody>
      </table>
    </div>
  )
}

const mSP = function ({ entities, session }) {
  const { tasks, usersTasks, projects, workspaces, users } = entities;
  let assignedUsersTasks = Object.values(usersTasks).filter((usersTask) => usersTask.userId === session.id);
  let assignedTasks = [];
  assignedUsersTasks.forEach(usersTask => {
    if (tasks[usersTask.taskId]) assignedTasks.push(tasks[usersTask.taskId]);
  }); // Array of tasks; use forEach just in case there's a mismatch between usersTasks and tasks (i.e. a usersTask exists but task does not)
  let taskProjects = assignedTasks.map(task => projects[task.projectId]); // Array of respective projects
  let taskWorkspaces = taskProjects.map(project => workspaces[project.workspaceId]); // Array of respective workspaces
  let taskCreators = assignedTasks.map(task => users[task.creatorId]);

  return {
    allTasks: tasks,
    assignedTasks: assignedTasks,
    taskProjects: taskProjects,
    taskWorkspaces: taskWorkspaces,
    taskCreators: taskCreators
  }
};

const mDP = function (dispatch) {
  return {
  }
};

export default connect(mSP, mDP)(MyTasks);