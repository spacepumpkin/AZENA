import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateTask, toggleDone, destroyTask } from '../../actions/task_actions';

// const mDP = function(dispatch) {

// }


export default function TaskRow({ task, workspace, project, creatorName }) {

  const dispatch = useDispatch();

  // Updates task once we blur away from task input
  function handleUpdate(field) {
    return (evt) => {
      let updatedValue = evt.target.value;
      if (field === 'name') {
        // Replace all leading spaces or tab/newline chars
        updatedValue = updatedValue.replace(/^ +|[\r\n\v\t]+/g, '');
        if (updatedValue === '') {
          updatedValue = 'Untitled Task';
        }
      }
      if (updatedValue !== task[field]) {
        const updatedTask = Object.assign({}, task, { [field]: updatedValue });
        dispatch(updateTask(updatedTask));
      }
    }
  }

  // Blurs from task input when enter is pressed
  function handleKeyDown(evt) {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      evt.preventDefault();
      evt.target.blur();
    }
  };

  // Updates task "done" status
  function toggleCheck() {
    const updatedTask = Object.assign({}, task, { done: !task.done });
    dispatch(toggleDone(updatedTask));
    // dispatch(updateTask(updatedTask)).then((res) => console.log("updated task, res: ", res));
  }

  function deleteTask() {
    dispatch(destroyTask(task.id));
  }

  // function updateDate(evt) {
  //   dispatch(updateTask({ id: task.id, dueDate: evt.target.value }));
  // }

  // Adjust styling based on whether task is done
  // const checkIcon = task.done ? window.checkCircle : window.checkCircleOutline;
  const checkIconClasses = task.done ? "task-check-icon task-done" : "task-check-icon";
  const taskNameClasses = task.done ? "task-input task-done" : "task-input";

  const calcDaysAway = function (date) {
    let todayDate = new Date().toISOString().substr(0, 10); // to avoid closure
    let dateDifference = new Date(date) - new Date(todayDate); // positive if date is ahead of today
    return (dateDifference / 86400000);
  };

  const dueDateColorClass = function(date) {
    let daysAway = calcDaysAway(date);
    if (daysAway < 0) {
      return " date-past-due"; // Corresponds to red/$secondary color
    } else if (daysAway > 1) {
      return ""; // No need to change color
    } else {
      return " date-today-tomorrow"; // Corresponds to green/$primary color
    }
  };

  // const dueDateValue = function(date) {
  //   let daysAway = calcDaysAway(date);
  //   if (daysAway === 0) {
  //     return "Today";
  //   } else if (daysAway === 1) {
  //     return "Tomorrow";
  //   } else {
  //     return date;
  //   }
  // };

  return (
    <tr className="my-tasks-table-row">
      <td>
        <div className="my-tasks-first-cell">
          {/* <img className={checkIconClasses} src={checkIcon} onClick={toggleCheck} alt="task-check-icon" /> */}
          <div className="task-check-wrapper"><button className={checkIconClasses} onClick={toggleCheck} type="button" /></div>
          <input className={taskNameClasses}
            type="text"
            onKeyDown={handleKeyDown}
            // onChange={handleTitleChange}
            onBlur={handleUpdate("name")}
            // ref={this.taskInput}
            autoComplete="off" autoCorrect="off" autoCapitalize="off"
            spellCheck="false"
            disabled={false}
            defaultValue={task.name}
          // onAnimationEnd={() => this.setState({ titleFlash: false })}
          />
          <button className={"plus-button rotated-plus"} type="button" onClick={deleteTask} />
          {/* <div className="task-delete"></div> */}
        </div>
      </td>
      <td>
        <input className="task-input"
          type="text"
          autoComplete="off" autoCorrect="off" autoCapitalize="off"
          spellCheck="false"
          onKeyDown={handleKeyDown}
          onBlur={handleUpdate("description")}
          defaultValue={task.description} />
      </td>
      <td><div className="my-tasks-date-cell">{task.dueDate ?
        <input className={"my-tasks-date" + dueDateColorClass(task.dueDate)} type="date" 
        defaultValue={task.dueDate} onChange={handleUpdate("dueDate")} />
        : <input className={"my-tasks-date" + " date-empty"} type="date" onChange={handleUpdate("dueDate")} />
      }</div></td>
      <td><Link to={`/workspaces/${workspace.id}`}>{workspace.name}</Link></td>
      <td><Link to={`/projects/${project.id}/list`}>{project.name}</Link></td>
      <td>{creatorName}</td>
    </tr>
  )
}
