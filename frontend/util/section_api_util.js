/* Section API Util Functions:
  - createSection(section)
  - updateSection(section)
  - destroySection(sectionId) 
*/

// Test Status - Untested
export const createSection = (section) => {
  // console.log(`creating new section (${section.name})...`);
  return $.ajax({
    url: `/api/sections`,
    method: "POST",
    data: {
      section: {
        name: section.name,
        order: section.order,
        project_id: section.projectId
      }
    }
  })
}

// Test Status - Untested
export const updateSection = (section) => {
  // console.log(`updating section #${section.id}...`);
  return $.ajax({
    url: `/api/sections/${section.id}`,
    method: "PATCH",
    data: { section: { 
      name: section.name, 
      order: section.order 
    } }
  })
}

// Test Status - Untested
export const destroySection = (sectionId, keepTasks) => {
  // console.log(`destroying section #${sectionId}...`);
  return $.ajax({
    url: `/api/sections/${sectionId}`,
    method: "DELETE",
    data: { keepTasks: keepTasks }
  })
}