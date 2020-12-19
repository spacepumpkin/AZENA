import { connect } from 'react-redux';
import { createProject } from '../../actions/project_actions';
import ProjectForm from './project_form';

const mSP = function ({errors}, ownProps) {
  // const workspaceId = parseInt(ownProps.match.params.workspaceId);
  return {
    projectErrors: errors.projects
  }
};

const mDP = function (dispatch) {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
};

export default connect(mSP, mDP)(ProjectForm);