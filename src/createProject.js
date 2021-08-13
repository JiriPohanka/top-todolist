import { projectManager } from './managers'

//create a new project
function createProject(title, desc, priority) {
    const newProject = { title, desc, priority }
    newProject.taskArr = []
    projectManager.appendToProjects(newProject)
    return newProject
}

export { createProject }