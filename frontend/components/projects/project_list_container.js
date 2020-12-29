import { connect } from 'react-redux';
import ProjectList from './project_list';
import { updateProject } from '../../actions/project_actions';
import { createTask, destroyTask, updateTask } from '../../actions/task_actions';

const mSP = function ({ entities }, ownProps) {
  const projectId = parseInt(ownProps.match.params.projectId);
  // const projectTasks = Object.keys(entities.tasks)
  //   .filter(taskId => {
  //     return entities.tasks[taskId].projectId === projectId;
  //   })
  //   .map(taskId => entities.tasks[taskId]);
  const project = entities.projects[projectId];
  let projectTasks = Object.assign({}, entities.tasks);
  for (let taskId in projectTasks) {
    if (projectTasks[taskId].projectId !== projectId) {
      delete projectTasks[taskId]
    }
  }
  return {
    projectId: projectId,
    project: project,
    projectTasks: projectTasks,
    usersTasks: entities.usersTasks
  }
};

const mDP = function (dispatch) {
  return {
    updateProject: (project) => dispatch(updateProject(project)),
    createTask: (task) => dispatch(createTask(task)),
    destroyTask: (taskId) => dispatch(destroyTask(taskId)),
    updateTask: (task) => dispatch(updateTask(task))
  }
};

export default connect(mSP, mDP)(ProjectList);