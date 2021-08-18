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

    function sortByPriority(arr) {
        const sortedTasks = arr.sort((task1, task2) => task2.priority - task1.priority)
        return sortedTasks
    }

    function sortByFinished(arr) {
        const sortedTasks = arr.sort((task1, task2) => task1.isFinished - task2.isFinished)
        return sortedTasks
    }

    function sortByDueDate(arr) {
        const sortedTasks = arr.sort((task1, task2) => task1.isFinished - task2.isFinished)
        return sortedTasks
    }

    function getTasksInProject(project) {
        const projectTasksArr = project.taskArr.map((task) => task)
        return projectTasksArr
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
        const allProjectsArr = projects
        return allProjectsArr
    }

    return { 
        getTasksInProject, 
        appendToProjects, 
        getProjectList, 
        getAllTasks, 
        sortByFinished, 
        sortByPriority,
        sortByDueDate
    }
})()

export { taskManager, projectManager }