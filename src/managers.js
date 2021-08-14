// module for all task-related methods
const taskManager = (() => {

    function appendToProject(task, project) {
        project.taskArr.push(task)
    }

    function finishTask(task) {
        task.isFinished = true
    }

    function restoreTask(task) {
        task.isFinished = false
    }

    return { appendToProject, finishTask, restoreTask }
})()

// module for all project-related methods
const projectManager = (() => {
    const projects = []

    function appendToProjects(project) {
        projects.push(project)
    }

    function pushFinishedToEnd(taskArray) {
        const sortedTasks = taskArray.sort((task1, task2) => task1.isFinished - task2.isFinished)
        return sortedTasks
    }

    function sortTasksByPriority(taskArray) {
        const sortedTasks = taskArray.sort((task1, task2) => task1.priority - task2.priority)
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

    return { 
        getTasksInProject, 
        appendToProjects, 
        getProjectList, 
        getAllTasks, 
        pushFinishedToEnd, 
        sortTasksByPriority
    }
})()

export { taskManager, projectManager }