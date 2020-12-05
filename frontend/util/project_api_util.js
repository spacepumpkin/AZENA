/* Project API Util Functions:
  - fetchProject(projectId)   
  - createProject(project)
  - updateProject(project)
  - destroyProject(projectId) 

  - fetchProjects(userId) // fetch all projects associated with user
*/

// Test Status - PASS
export const createProject = (project) => {
  console.log(`creating new project (${project.name})...`);
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

// Test Status - PASS
export const updateProject = (project) => {
  console.log(`updating project #${project.id}...`);
  return $.ajax({
    url: `/api/projects/${project.id}`,
    method: "PATCH",
    data: { project: { name: project.name, description: project.description } }
  })
}

// Test Status - PASS
export const destroyProject = (projectId) => {
  console.log(`destroying project #${projectId}...`);
  return $.ajax({
    url: `/api/projects/${projectId}`,
    method: "DELETE"
  })
}