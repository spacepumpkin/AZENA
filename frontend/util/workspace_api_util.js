/* Workspace API Util Functions:
  - fetchEverything(user)             // fetches everything associated with user after login

  - fetchWorkspaces(user)             // fetch all workspaces that user is member of
  
  - fetchWorkspaceMembers(workspace)  // ! Combine with fetchWorkspaces? fetch all members of a workspace excluding current user
  
  - createWorkspace(workspace)        // create new workspace

  - fetchWorkspaceProjects(workspace) // fetch all projects belonging to workspace
*/

// export const fetchEverything = (user) => {
//   console.log(`fetching everything for ${user.username}`)
//   return $.ajax({
//     url: "/api/users/:user_id",
//     method: "GET"
//   })
// }

export const fetchWorkspaces = (currentUserId) => {
  console.log(`fetching currentUsers's (id: ${currentUserId}) workspaces...`);
  return $.ajax({
    url: "/api/workspaces",
    method: "GET",
    data: { currentUserId }
  })
}
// ! will just pass in user ID 
// Should we pass in everything like this? or just current_user id
// data: { user: { username: user.username, email: user.email } }

export const createWorkspace = (workspace) => {
  console.log(`creating new workspace...`);
  return $.ajax({
    url: `/api/workspaces`,
    method: "POST",
    data: {workspace: {name: workspace.name, description: workspace.description}}
  })
}

// ! Should we add creator_id like this? or get from current_user id in BE
//  data: { workspace: { creator_id: window.getState().session.id, name: workspace.name, description: workspace.description} }

export const deleteWorkspace = (workspaceId) => {
  console.log(`deleting workspace ${workspaceId} ...`);
  return $.ajax({
    url: `/api/workspaces/${workspaceId}`,
    method: "DELETE"
  })
}