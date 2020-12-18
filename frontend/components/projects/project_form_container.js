import { connect } from 'react-redux';
import ProjectForm from './project_form';

const mSP = function (state, ownProps) {
  const workspaceId = parseInt(ownProps.match.params.workspaceId);
  debugger
  return {
    workspaceId: workspaceId
  }
};

const mDP = function (dispatch) {
  return {
  }
};

export default connect(mSP, mDP)(ProjectForm);