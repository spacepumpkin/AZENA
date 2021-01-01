import React from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask, destroyTask } from '../../actions';
import ContextMenu from './context_menu';

export default function TaskContextMenu({ task }) {
  /* Menu options:
  * Mark as Done
  * Duplicate Task
  * Delete Task
  */

  const dispatch = useDispatch();

  const toggleDone = function () {
    dispatch(updateTask({ id: task.id, done: !task.done }));
  };

  const duplicateTask = function () {
    let duplicatedTask = Object.assign({}, task);
    delete duplicatedTask.id;
    dispatch(createTask(duplicatedTask));
  };

  const deleteTask = function () {
    dispatch(destroyTask(task.id));
  };

  let doneButtonName = task.done ? "Mark Incomplete" : "Mark Complete";

  let buttonInfo = {
    [doneButtonName]: toggleDone,
    "Duplicate Task": duplicateTask,
    "Delete Task": deleteTask
  };

  return (
    <ContextMenu buttonInfo={buttonInfo} />
  )
}
