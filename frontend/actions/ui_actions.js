export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const SET_CURRENT_ITEMS = "SET_CURRENT_ITEMS";
export const SET_MODAL = "SET_MODAL";

// Click Toggle Sidebar
export const toggleSidebar = {
  type: TOGGLE_SIDEBAR
};

export const setCurrentItems = function ({ workspaceId, projectId }) {
  return {
    type: SET_CURRENT_ITEMS,
    workspaceId: workspaceId,
    projectId: projectId
    // items: items
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
