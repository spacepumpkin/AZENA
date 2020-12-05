/* Project API Util Functions:
  - fetchProject(projectId)   
  - createProject(project)
  - updateProject(project)
  - destroyProject(projectId) 

  - fetchProjects(userId) // fetch all projects associated with user
*/

// Test Status - not tested
export const createProject = (project) => {
  console.log(`creating new project...`);
  return $.ajax({
    url: `/api/projects`,
    method: "POST",
    data: { 
      project: { 
        name: project.name, 
        description: project.description, 
        workspace_id: project.workspaceId 
      } 
    }
  })
}

// Test Status - not tested
export const updateProject = (project) => {
  console.log(`updating project...`);
  return $.ajax({
    url: `/api/projects/${project.id}`,
    method: "PATCH",
    data: { project: { name: project.name, description: project.description } }
  })
}

// Test Status - not tested
export const destroyProject = (projectId) => {
  console.log(`deleting project...`);
  return $.ajax({
    url: `/api/projects/${projectId}`,
    method: "DELETE"
  })
}