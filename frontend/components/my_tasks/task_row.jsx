import React from 'react';
import { useDispatch } from 'react-redux';

import { updateTask, toggleDone, destroyTask } from '../../actions/task_actions';

// const mDP = function(dispatch) {

// }


export default function TaskRow({ task, workspaceName, projectName, creatorName, todayDate }) {

  const dispatch = useDispatch();

  // Updates task once we blur away from task name input
  function handleBlur(field) {
    return (evt) => {
      if (evt.target.value !== task[field]) {
        const updatedTask = Object.assign({}, task, { [field]: evt.target.value });
        dispatch(updateTask(updatedTask));
      }
    }
  }

  // Blurs from task name input when enter is pressed
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

  function updateDate(evt) {
    // console.log("New date: ", evt.target.value); 
  }

  // Adjust styling based on whether task is done
  // const checkIcon = task.done ? window.checkCircle : window.checkCircleOutline;
  const checkIconClasses = task.done ? "task-check-icon task-done" : "task-check-icon";
  const taskNameClasses = task.done ? "task-input task-done" : "task-input";

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
            onBlur={handleBlur("name")}
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
          onBlur={handleBlur("description")}
          defaultValue={task.description} />
      </td>
      <td><div className="my-tasks-date-cell">{task.dueDate ?
        <input className="my-tasks-date" type="date" defaultValue={task.dueDate} onChange={updateDate} />
        : <input className="my-tasks-date" type="date" min={todayDate} onChange={updateDate} />
      }</div></td>
      {/* <td>{workspaceName}</div></td> */}
      <td>{projectName}</td>
      <td>{creatorName}</td>
    </tr>
  )
}
