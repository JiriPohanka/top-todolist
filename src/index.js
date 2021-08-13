import format from 'date-fns'
import { createTaskTable } from './createTaskTable'
import { populateOnLoad } from './populateOnLoad'
import { createTask } from './createTask'
import { createProject} from './createProject'
import { projectManager } from './managers'

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
        updateParentProjectList()
    })

    newProjectBtn.addEventListener('click', (e) => {
        newProjectFormWrap.classList.toggle('visible')
        newProjectBtn.disabled = true;
        newTaskFormWrap.classList.remove('visible')
        newTaskBtn.disabled = false;
    })

    // cancelling forms
    const cancelNewTaskForm = document.querySelector('#cancel-new-task-form')
    cancelNewTaskForm.addEventListener('click', (e) => {
        newTaskForm.reset()
        newTaskFormWrap.classList.toggle('visible')
        newTaskBtn.disabled = false
    })
    
    const cancelNewProjectForm = document.querySelector('#cancel-new-project-form')
    cancelNewProjectForm.addEventListener('click', (e) => {
        newProjectForm.reset()
        newProjectFormWrap.classList.toggle('visible')
        newProjectBtn.disabled = false
        return false
    })

    // submitting forms
    const newTaskForm = document.querySelector('.new-task-form')
    const newProjectForm = document.querySelector('.new-project-form')

    newTaskForm.addEventListener('submit', (e) => {
        console.log(e)
        e.preventDefault();
        let newTaskTitle = e.target[0].value
        let newTaskDesc = e.target[1].value
        let newTaskDueDate = e.target[2].value
        let newTaskPriority = e.target[3].value
        let newTaskProject = projectManager.getProjectList()[e.target[4].options.selectedIndex]
        createTask(newTaskTitle, newTaskDesc, newTaskDueDate, newTaskPriority, newTaskProject)
        newTaskForm.reset()
        newTaskFormWrap.classList.toggle('visible')
        newTaskBtn.disabled = false

        if (projectMenuUI.getActiveProject()) {
            taskAreaUI.showTasksOfActiveProject()
        } else taskAreaUI.showAllTasks()
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
        projectMenuUI.updateProjectMenu()
    })

    function updateParentProjectList() {
        const parentProjectSelect = document.querySelector('#task-parent-project')
        parentProjectSelect.innerHTML = "" //reset
        const projectList = projectManager.getProjectList()

        for (let [i, project] of projectList.entries()) {
            const option = document.createElement('option')
            parentProjectSelect.appendChild(option)
            option.textContent = project.title
            option.setAttribute('value', project.title)
            option.setAttribute('data-project-id', i)
        }
    }
})()


// Module for Project menu DOM manipulation
const projectMenuUI = (() => {

    // add logic for show-all-tasks button
    const showAllTasksBtn = document.querySelector('.show-all-tasks')
    showAllTasksBtn.addEventListener('click', (e) => {
    taskAreaUI.showAllTasks()
    })

    const projectList = projectManager.getProjectList()
    const projectNav = document.querySelector('.project-nav ul')

    function updateProjectMenu() {
        projectNav.innerHTML = ""

        for (let [i, project] of projectList.entries()) {
            const projectItem = document.createElement('li')
            projectItem.setAttribute('data-project-id', i)
            projectItem.classList.add('project-item')
            projectNav.appendChild(projectItem)
            projectItem.textContent = `${project.title}`
        }
        setActiveProject()
    }

    function setActiveProject() {
        const projectItems = document.querySelectorAll('.project-item')
        for (let projectItem of projectItems) {
            projectItem.addEventListener('click', (e) => {
    
                // first remove all active
                for (let projectItem of projectItems) {
                    projectItem.classList.remove('active-project')
                }
    
                // then add active on the clicked item
                projectItem.classList.toggle('active-project')
    
                taskAreaUI.showTasksOfActiveProject()
            })
        }
    }

    function getActiveProject() {
        return document.querySelector('li.active-project')
    }

    return { updateProjectMenu, getActiveProject }
})()


// module for populating tasks area based on active project
const taskAreaUI = (() => {

    function showAllTasks() {

        const allTasks = projectManager.getAllTasks()

        // remove class 'active-project' if it exists
        if (projectMenuUI.getActiveProject()) {
            projectMenuUI.getActiveProject().classList.remove('active-project')
        }
        createTaskTable(allTasks)
    }

    function showTasksOfActiveProject() {

        const activeProject = projectManager.getProjectList()[projectMenuUI.getActiveProject().dataset.projectId]
        const tasksInProject = projectManager.getTasksInProject(activeProject)

        createTaskTable(tasksInProject)
    }

    return { showTasksOfActiveProject, showAllTasks }
})()



//for testing purposes
populateOnLoad()
projectMenuUI.updateProjectMenu()
taskAreaUI.showAllTasks()