export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const SET_CURRENT_WORKSPACE = "SET_CURRENT_WORKSPACE";
export const SET_MODAL = "SET_MODAL";

// Click Toggle Sidebar
export const toggleSidebar = {
  type: TOGGLE_SIDEBAR
};

export const setCurrentWorkspace = function (workspaceId) {
  return {
    type: SET_CURRENT_WORKSPACE,
    workspaceId: workspaceId
  }
};

export const setModal = function (modalType) {
  return {
    type: SET_MODAL,
    modalType: modalType
  }
};

// Click Toggle Dropdown Menus
// export function toggleDropDown(evt) {
//   evt.currentTarget.nextSibling.classList.toggle("hide")
// }
