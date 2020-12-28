import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import TaskRow from './task_row';

function MyTasks({ assignedTasks, taskProjects, taskWorkspaces, taskCreators }) {

  const taskRows = [];
  for (let i = 0; i < assignedTasks.length; i++) {

    taskRows.push(
      <TaskRow 
        key={`task-${assignedTasks[i].id}`}
        task={assignedTasks[i]}
        workspaceName={taskWorkspaces[i].name}
        projectName={taskProjects[i].name}
        creatorName={taskCreators[i].username}
      />
    )
  }

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
            <th>Due Date</th>
            <th>Workspace</th>
            <th>Project</th>
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