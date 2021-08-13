// module for all task-related methods
const taskManager = (() => {

    function appendToProject(task, project) {
        project.taskArr.push(task)
    }

    function finishTask(task) {
        task.isFinished = true
    }

    return { appendToProject, finishTask }
})()

// module for all project-related methods
const projectManager = (() => {
    const projects = []

    function appendToProjects(project) {
        projects.push(project)
    }

    function getTasksInProject(project) {
        return project.taskArr
    }

    // to get an arr of all tasks across all projects
    function getAllTasks() {

        const allTasksArr = []

        for (let project of projects) {
            const tasksInProject = projectManager.getTasksInProject(project)
            for (let task of tasksInProject) {
                allTasksArr.push(task)
            }
        }
        return allTasksArr
    }

    function getProjectList() {
        return projects
    }

    return { getTasksInProject, appendToProjects, getProjectList, getAllTasks }
})()

export { taskManager, projectManager }