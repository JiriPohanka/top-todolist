import format from 'date-fns'


const project1 = createProject('The Odin Project', 'learn to be a front-end developer', 'high')

const task1 = createTask('Project: TODO List', 'final assignment of the Javascript basics course', 'tomorrow', 'high', project1)
const task2 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project1)

//create a new task
function createTask (title, desc, dueDate, priority, parentProject) {

    const newTask = {title, desc, dueDate, priority, parentProject}
    newTask.isFinished = false

    parentProject.getTasks().push(newTask)
    
    return newTask
}

//create a new project
function createProject (title, desc, priority) {
    const taskArr = []
    console.log(taskArr)
    
    function getTasks() {
        return taskArr   
    } 

    function getTask(i) {
         return taskArr[i]
    }
     
    function finishTask (i) {
        taskArr[i].isFinished = true;
        return taskArr[i]
    }
    
    function deleteTask (i) {
        taskArr[i].splice(i, 1)
    }
    
    return {title, desc, priority, getTasks, getTask, finishTask, deleteTask}
}


const newTaskBtn = document.querySelector('.new-task-btn')
const newTaskFormWrap = document.querySelector('.new-task-form-wrap')
newTaskBtn.addEventListener('click', (e) => newTaskFormWrap.classList.toggle('visible') )
