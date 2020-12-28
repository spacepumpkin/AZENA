import React from 'react';
import { useDispatch } from 'react-redux';

import { updateTask, toggleDone } from '../../actions/task_actions';

// const mDP = function(dispatch) {

// }


export default function TaskRow({task, workspaceName, projectName, creatorName}) {

  const dispatch = useDispatch();
  const handleKeyDown = function (evt) {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      evt.preventDefault();
      evt.target.blur();
    }
  };

  const checkIcon = task.done ? window.checkCircle : window.checkCircleOutline;

  const toggleCheck = function() {
    const updatedTask = Object.assign({}, task, { done: !task.done });
    dispatch(toggleDone(updatedTask));
    // dispatch(updateTask(updatedTask)).then((res) => console.log("updated task, res: ", res));
  }

  return (
    <tr className="my-tasks-table-row">
      <td>
        <img className="task-check-icon" src={checkIcon} onClick={toggleCheck} alt="task-check-icon" />
        <input className={`task-name-input`}
          type="text"
          onKeyDown={handleKeyDown}
          // onChange={handleTitleChange}
          // onBlur={handleTaskUpdate}
          // ref={this.taskInput}
          autoComplete="off" autoCorrect="off" autoCapitalize="off"
          spellCheck="false"
          disabled={false}
          defaultValue={task.name}
        // onAnimationEnd={() => this.setState({ titleFlash: false })}
        />
      </td>
      <td><div>{task.description}</div></td>
      <td><div>{workspaceName}</div></td>
      <td><div>{projectName}</div></td>
      <td>{task.dueDate}</td>
      <td>{creatorName}</td>
    </tr>
  )
}
