import * as SectionApiUtil from "../util/section_api_util";
/*
  * createSection(section) -> RECEIVE_SECTION
  * updateSection(section) -> RECEIVE_SECTION
  * destroySection(sectionId) -> REMOVE_SECTION
      * Will also either keep or remove all section tasks 
*/

// REGULAR ACTIONS --------------------------------------------------
export const RECEIVE_SECTION = "RECEIVE_SECTION";
export const RECEIVE_SECTION_ERRORS = "RECEIVE_SECTION_ERRORS";
export const REMOVE_SECTION = "REMOVE_SECTION";

export const REMOVE_SECTION_TASKS = "REMOVE_SECTION_TASKS";
export const UPDATE_SECTION_TASKS = "UPDATE_SECTION_TASKS"; // removes section id from tasks

const receiveSection = function (section) {
  return {
    type: RECEIVE_SECTION,
    section
  }
}

const receiveSectionErrors = function (errors) {
  return {
    type: RECEIVE_SECTION_ERRORS,
    errors
  }
}

const removeSection = function (section) {
  return {
    type: REMOVE_SECTION,
    section
  }
}

// For associated tasks after deleting section
const removeSectionTasks = function (tasks) {
  return {
    type: REMOVE_SECTION_TASKS,
    tasks
  }
}

const updateSectionTasks = function (tasks) {
  return {
    type: UPDATE_SECTION_TASKS,
    tasks
  }
}

// THUNK ACTIONS --------------------------------------------------

// Test Status - 
export const createSection = function (section) {
  return function (dispatch) {
    return (
      SectionApiUtil.createSection(section)
        .then(
          (section) => dispatch(receiveSection(section)),
          (errors) => dispatch(receiveSectionErrors(errors.responseJSON))
        )
    );
  };
};

// Test Status - 
export const updateSection = function (section) {
  return function (dispatch) {
    return (
      SectionApiUtil.updateSection(section)
        .then(
          (section) => dispatch(receiveSection(section)),
          (errors) => dispatch(receiveSectionErrors(errors.responseJSON))
        )
    );
  };
};

// Test Status - 
export const destroySection = function (sectionId, keepTasks) {
  return function (dispatch, getState) {
    return (
      SectionApiUtil.destroySection(sectionId)
        .then(
          (section) => {
            dispatch(removeSection(section));
            // Delete or update all tasks associated w/deleted section
            const tasks = Object.values(getState().entities.tasks).filter((task) => {
              return task.sectionId === sectionId;
            })
            if (tasks !== undefined && tasks.length !== 0) {
              if (keepTasks === false) {
                dispatch(removeSectionTasks(tasks));
              } else {
                dispatch(updateSectionTasks(tasks));
              }
            }
          },
          (errors) => dispatch(receiveSectionErrors(errors.responseJSON))
        )
    );
  };
};