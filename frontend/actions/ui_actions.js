export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const SET_CURRENT_WORKSPACE = "SET_CURRENT_WORKSPACE";

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
// Click Toggle Dropdown Menus
// export function toggleDropDown(evt) {
//   evt.currentTarget.nextSibling.classList.toggle("hide")
// }
