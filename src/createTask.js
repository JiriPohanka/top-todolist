import { taskManager } from './managers'

//create a new task
function createTask(title, desc, dueDate, priority, parentProject, isFinished = false) {

    const newTask = { title, desc, dueDate, priority, parentProject, isFinished }
    
    if (newTask.isFinished) {
        taskManager.finishTask(newTask)
    }

    taskManager.appendToProject(newTask, parentProject)

    return newTask
}

export { createTask }