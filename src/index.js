import format from 'date-fns'

//create a new task
function createTask (title, desc, dueDate, priority, parentProject) {

    const newTask = {title, desc, dueDate, priority, parentProject}
    newTask.isFinished = false

    taskManager.appendToProject(newTask, parentProject)

    return newTask
}

//create a new project
function createProject (title, desc, priority) {
    const newProject = { title, desc, priority }
    newProject.taskArr = []
    console.log(`new project ${newProject.title} created `)
    console.log(projectManager.getTasksInProject(newProject))
    projectManager.appendToProjects(newProject)
    return newProject
}


// module for all task-related methods
const taskManager = (() => {
    
    function appendToProject(task, project) {
        project.taskArr.push(task)
        console.log(`new task ${task.title} added to project ${project.title}`)
        console.log(`the project ${project.title} now contains following tasks: ${project.taskArr}`)
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

    function getProjectList() {
        return projects
    }
    
    return { getTasksInProject, appendToProjects, getProjectList }
})()


// module for DOM manipulation of new-item-forms
const formsUI = (() => {
    
    // using new-task / new-project forms with buttons on mainpage
    const newTaskBtn = document.querySelector('.new-task-btn')
    const newProjectBtn = document.querySelector('.new-project-btn')
    
    const newTaskFormWrap = document.querySelector('.new-task-form-wrap')
    const newProjectFormWrap = document.querySelector('.new-project-form-wrap')
    
    newTaskBtn.addEventListener('click', (e) => {
        
        newTaskFormWrap.classList.toggle('visible')
        newTaskBtn.disabled = true;
        newProjectFormWrap.classList.remove('visible')
        newProjectBtn.disabled = false;
    })

    newProjectBtn.addEventListener('click', (e) => {
        newProjectFormWrap.classList.toggle('visible')
        newProjectBtn.disabled = true;
        newTaskFormWrap.classList.remove('visible')
        newTaskBtn.disabled = false;
    })

    // submitting forms
    const newTaskForm = document.querySelector('.new-task-form')
    const newProjectForm = document.querySelector('.new-project-form')

    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    
    newProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let newProjectTitle = e.target[0].value
        let newProjectDesc = e.target[1].value
        let newProjectPriority = e.target[2].value
        createProject(newProjectTitle, newProjectDesc, newProjectPriority)
        newProjectForm.reset()
        newProjectFormWrap.classList.toggle('visible')
        newProjectBtn.disabled = false
        updateProjectMenuUI()
    })

    // cancelling forms

})()

const updateProjectMenuUI = () => {
    const projectNav = document.querySelector('.project-nav ul')
    const projectList = projectManager.getProjectList()
    projectNav.innerHTML = ""

    for (let project of projectList) {
        const projectItemLink = document.createElement('a')
        projectNav.appendChild(projectItemLink)
        const projectItem = document.createElement('li')
        projectItemLink.appendChild(projectItem)
        projectItem.textContent = `${project.title}`
    }
}




const project1 = createProject('The Odin Project', 'learn to be a front-end developer', 'high')
const task1 = createTask('Project: TODO List', 'final assignment of the Javascript basics course', 'tomorrow', 'high', project1)
const task2 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project1)

updateProjectMenuUI()