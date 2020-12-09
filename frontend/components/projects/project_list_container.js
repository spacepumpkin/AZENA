import { connect } from 'react-redux';
import ProjectList from './project_list';
import { updateProject } from '../../actions/project_actions'

const mSP = function ({ entities }, ownProps) {
  const projectId = parseInt(ownProps.match.params.projectId);
  // const projectTasks = Object.keys(entities.tasks)
  //   .filter(taskId => {
  //     return entities.tasks[taskId].projectId === projectId;
  //   })
  //   .map(taskId => entities.tasks[taskId]);
  let projectTasks = Object.assign({}, entities.tasks);
  for (let taskId in projectTasks) {
    if (projectTasks[taskId].projectId !== projectId) {
      delete projectTasks[taskId]
    }
  }
  return {
    projectId: projectId,
    projectTasks: projectTasks,
    assignedTasksIds: entities.assignedTasksIds
  }
};

const mDP = function (dispatch) {
  return {
    updateProject: (project) => dispatch(updateProject(project)),
  }
};

export default connect(mSP, mDP)(ProjectList);