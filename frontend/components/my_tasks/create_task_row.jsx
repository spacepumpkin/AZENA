import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../actions/task_actions';

export default function CreateTaskRow({ allWorkspaces, allProjects, todayDate }) {
  // Fields are React-controlled here (not in TaskRow)
  const dispatch = useDispatch();

  const workspaceRef = useRef(null);
  const projectRef = useRef(null);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [dueDate, setdueDate] = useState(todayDate);
  const [workspaceId, setworkspaceId] = useState(-1);
  const [projectId, setprojectId] = useState(-1);

  // Get workspace dropdown list (eliminate workspaces that don't have projects)
  const workspaceIds = {};

  for (let projectId in allProjects) {
    let project = allProjects[projectId];
    if (!workspaceIds[project.workspaceId]) workspaceIds[project.workspaceId] = true;
  };

  const defaultWorkspaceOptions = Object.keys(workspaceIds).map((workspaceId) => {
    let workspaceName = allWorkspaces[workspaceId].name;
    return (<option key={workspaceId} value={workspaceId}>{workspaceName}</option>);
  });

  const [workspaceOptions, setWorkspaceOptions] = useState(defaultWorkspaceOptions);

  // Get project dropdown list depending on workspace selected
  let firstWorkspace = Object.values(allWorkspaces)[0];
  const defaultProjectOptions = [];
  Object.values(allProjects).forEach(project => {
    if (project.workspaceId === firstWorkspace.id) {
      defaultProjectOptions.push(<option key={project.id} value={project.id}>{project.name}</option>);
    }
  });

  const [projectOptions, setProjectOptions] = useState(defaultProjectOptions);

  useEffect(() => {
    if (workspaceId !== -1) {
      let newProjectOptions = [];
      let firstProjectOptionId = -1;
      for (let projectId in allProjects) {
        let project = allProjects[projectId];
        if (project.workspaceId === workspaceId) {
          if (firstProjectOptionId === -1) firstProjectOptionId = projectId;
          newProjectOptions.push(
            <option key={projectId} value={projectId}>{project.name}</option>
          );
        }
      }
      setprojectId(firstProjectOptionId);
      setProjectOptions(newProjectOptions);
    }
  }, [workspaceId])

  function handleChange(field) {
    return (evt) => {
      let newValue = evt.target.value;
      if (field === "projectId" || field === "workspaceId") {
        newValue = parseInt(newValue);
      }
      eval(`set${field}`)(newValue); // dynamic variable invokation
    }
  }


  // Set initial projectId and workspaceId on Mount
  useEffect(() => {
    if (projectRef !== null) {
      setprojectId(parseInt(projectRef.current.value));
    }
  }, [projectRef])

  useEffect(() => {
    if (workspaceRef !== null) {
      setworkspaceId(parseInt(workspaceRef.current.value));
    }
  }, [workspaceRef])

  function addNewTask() {
    let filteredName = name.replace(/^ +|[\r\n\v\t]+/g, '');
    if (filteredName === '') {
      filteredName = 'Untitled Task';
    }
    dispatch(createTask({ name: filteredName, description: description, dueDate: dueDate, projectId: projectId }));
    setname("");
    if (description !== "") setdescription("");
    if (dueDate !== "") setdueDate(todayDate);
  }

  function handleKeyDown(evt) {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      evt.preventDefault();
      addNewTask();
    }
  }

  return (
    <tr className="my-tasks-create-row">
      <td><input type="text" className="task-input" value={name} placeholder="+ Add New Task"
        onChange={handleChange("name")}
        onKeyDown={handleKeyDown}
      /></td>
      <td><input type="text" className="task-input" value={description} placeholder="Add Description"
        onChange={handleChange("description")}
      /></td>
      <td><div className="my-tasks-date-cell"><input type="date" className="my-tasks-date" value={dueDate}
        // min={todayDate}
        onChange={handleChange("dueDate")}
      /></div></td>
      <td>
        <select
          ref={workspaceRef}
          onChange={handleChange("workspaceId")}
        >
          {workspaceOptions}
        </select>
      </td>
      <td>
        <select
          ref={projectRef}
          onChange={handleChange("projectId")}
        >
          {projectOptions}
        </select>
      </td>
      <td>
        <button type="button" className="add-task-button"
          onClick={addNewTask}
          disabled={!name}
        >Add New Task
      </button>
      </td>
    </tr>
  )
}

// export default CreateTaskRow;