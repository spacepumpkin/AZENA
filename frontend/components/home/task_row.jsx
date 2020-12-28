import React from 'react';
import { useDispatch } from 'react-redux';

import { updateTask, toggleDone } from '../../actions/task_actions';

// const mDP = function(dispatch) {

// }


export default function TaskRow({task, workspaceName, projectName, creatorName}) {

  const dispatch = useDispatch();

  // Updates task once we blur away from task name input
  function handleBlur(evt) {
    console.log("task name: ", evt.target.value);
  }

  // Blurs from task name input when enter is pressed
  function handleKeyDown (evt) {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      evt.preventDefault();
      evt.target.blur();
    }
  };

  // Updates task "done" status
  function toggleCheck () {
    const updatedTask = Object.assign({}, task, { done: !task.done });
    dispatch(toggleDone(updatedTask));
    // dispatch(updateTask(updatedTask)).then((res) => console.log("updated task, res: ", res));
  }
  
  // Adjust styling based on whether task is done
  // const checkIcon = task.done ? window.checkCircle : window.checkCircleOutline;
  const checkIconClasses = task.done ? "task-check-icon task-done" : "task-check-icon";
  const taskNameClasses = task.done ? "task-name-input task-done" : "task-name-input";

  return (
    <tr className="my-tasks-table-row">
      <td className="my-tasks-first-cell">
        {/* <img className={checkIconClasses} src={checkIcon} onClick={toggleCheck} alt="task-check-icon" /> */}
        <div className="task-check-wrapper"><button className={checkIconClasses} onClick={toggleCheck} type="button" /></div>
        <input className={taskNameClasses}
          type="text"
          onKeyDown={handleKeyDown}
          // onChange={handleTitleChange}
          onBlur={handleBlur}
          // ref={this.taskInput}
          autoComplete="off" autoCorrect="off" autoCapitalize="off"
          spellCheck="false"
          disabled={false}
          defaultValue={task.name}
        // onAnimationEnd={() => this.setState({ titleFlash: false })}
        />
        <button className={"plus-button rotated-plus"} type="button" />
        {/* <div className="task-delete"></div> */}
      </td>
      <td><div>{task.description}</div></td>
      <td>{task.dueDate ? <input type="date" defaultValue={task.dueDate} /> : null}</td>
      <td><div>{workspaceName}</div></td>
      <td><div>{projectName}</div></td>
      <td>{creatorName}</td>
    </tr>
  )
}
