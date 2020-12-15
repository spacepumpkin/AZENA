/* Workspace API Util Functions:
  - fetchEverything(user)             // fetches everything associated with user after login
  - fetchUserWorkspaces()             // fetch all workspaces that current user is member of
  - fetchWorkspaceMembers(workspace)  // ! Combine with fetchUserWorkspaces? fetch all members of a workspace excluding current user
  - fetchWorkspaceProjects(workspace) // fetch all projects belonging to workspace
  * createWorkspace(workspace)        // create new workspace
  * updateWorkspace(workspace)        // update workspace
  * destroyWorkspace(workspaceId)      // destroy workspace
  * assignUsersWorkspace(userId, workspaceId)   // add usersWorkspace
  * unassignUsersWorkspace(userId, workspaceId) // remove usersWorkspace
  removeWorkspaceFromUser(workspaceId)   // remove workspace from current user
*/

// Don't need since we have all the data we need when user is logged in
// export const fetchEverything = (user) => {
//   console.log(`fetching everything for ${user.username}`)
//   return $.ajax({
//     url: "/api/users/:user_id",
//     method: "GET"
//   })
// }

// Don't need user ID since we can only access current user's workspaces anyway
// PASS
export const fetchUserWorkspaces = () => {
  // console.log(`fetching currentUsers's workspaces...`);
  return $.ajax({
    url: `/api/workspaces`,
    method: "GET",
  })
}

// PASS
export const fetchWorkspace = (workspaceId) => {
  // console.log(`fetching workspaces #${workspaceId}...`);
  return $.ajax({
    url: `/api/workspaces/${workspaceId}`,
    method: "GET",
  })
}

// PASS
export const createWorkspace = (workspace) => {
  console.log(`creating new workspace (${workspace.name}) ...`);
  return $.ajax({
    url: `/api/workspaces`,
    method: "POST",
    data: {workspace: {name: workspace.name, description: workspace.description}}
  })
}

// PASS
export const updateWorkspace = (workspace) => {
  console.log(`updating workspace #${workspace.id} ...`);
  return $.ajax({
    url: `/api/workspaces/${workspace.id}`,
    method: "PATCH",
    data: {workspace: {name: workspace.name, description: workspace.description}}
  })
}

// PASS
export const destroyWorkspace = (workspaceId) => {
  console.log(`deleting workspace #${workspaceId} ...`);
  return $.ajax({
    url: `/api/workspaces/${workspaceId}`,
    method: "DELETE"
  })
}

// Test Status - 
export const assignUsersWorkspace = (userId, workspaceId) => {
  console.log(`assigning workspace #${workspaceId} to user #${userId}...`);
  return $.ajax({
    url: `/api/users/${userId}/workspaces`,
    method: "POST",
    data: { users_workspace: { user_id: userId, workspace_id: workspaceId } }
  })
}

// Test Status - 
export const unassignUsersWorkspace = (userId, workspaceId) => {
  console.log(`unassigning workspace #${workspaceId} from user #${userId}...`);
  return $.ajax({
    url: `/api/users/${userId}/workspaces`,
    method: "DELETE",
    data: { users_workspace: { user_id: userId, workspace_id: workspaceId } }
  })
}

// ! Save for later
export const removeWorkspaceFromUser = (userId, workspaceId) => {
  // console.log(`removing workspace #${workspaceId} from user #${userId} ...`);
  return $.ajax({
    url: `/api/users/${userId}/remove_workspace/${workspaceId}`,
    method: "DELETE"
  })
}