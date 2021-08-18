import format from 'date-fns'
import { createTaskTable } from './createTaskTable'
import { populateOnLoad } from './populateOnLoad'
import { createTask } from './createTask'
import { createProject } from './createProject'
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

        taskAreaUI.updateTaskList()
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


const dataStorage = {
    taskOrder:  0,

}


// Filtering and arranging tasks module

const filterSectionUI = (() => {

    const includeFinishedCheckbox = document.querySelector('#checkbox-include-finished')

    includeFinishedCheckbox.addEventListener('change', () => {
        const finishedTasks = document.querySelectorAll('.task-finished')

        for (let task of finishedTasks) {
            if (includeFinishedCheckbox.checked) {
                task.classList.add('show-hidden-task')
            } else {
                task.classList.remove('show-hidden-task')
            }
        }
    })

    const selectOrderButton = document.querySelector('#task-order')
    selectOrderButton.addEventListener('change', (e) => {

        dataStorage.taskOrder = e.target.options.selectedIndex
        taskAreaUI.updateTaskList()
    })
})()


// Module for Project menu DOM manipulation
const projectMenuUI = (() => {

    // add logic for show-all-tasks button
    const showAllTasksBtn = document.querySelector('.show-all-tasks')
    showAllTasksBtn.addEventListener('click', (e) => {
        taskAreaUI.showAllTasks(dataStorage.taskOrder)
    })

    const projectNav = document.querySelector('.project-nav ul')
    
    function updateProjectMenu() {
        const projectList = projectManager.getProjectList()
        const currentActiveProject = getActiveProject()

        projectNav.innerHTML = ""
        
        for (let [i, project] of projectList.entries()) {
            const projectItem = document.createElement('li')
            projectItem.setAttribute('data-project-id', i)
            projectItem.classList.add('project-item')
            projectNav.appendChild(projectItem)
            projectItem.textContent = `${project.title}`
        }
        
        // keep original active project after resetting the projectNav.innerHTML
        if (currentActiveProject) {
            document.querySelector(`[data-project-id="${currentActiveProject.dataset.projectId}"]`).classList.add('active-project')
        }
        
        addMenuListeners()
    }

    function addMenuListeners() {
        const projectItems = document.querySelectorAll('.project-item')
        for (let projectItem of projectItems) {
            projectItem.addEventListener('click', (e) => {

                // first remove all active
                for (let projectItem of projectItems) {
                    projectItem.classList.remove('active-project')
                }

                // then add active on the clicked item
                projectItem.classList.add('active-project')
                taskAreaUI.updateTaskList()
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

    function showAllTasks(taskOrder) {

        const allTasks = projectManager.getAllTasks()

        let orderedTasks = []

        if (taskOrder === 0) {
            orderedTasks = allTasks
        }

        if (taskOrder === 1) {
            orderedTasks = projectManager.sortByPriority(allTasks)
        }

        if (taskOrder === 2) {
            orderedTasks = allTasks
        }

        const sortedAllTasks = projectManager.sortByFinished(orderedTasks)

        // remove class 'active-project' if it exists
        if (projectMenuUI.getActiveProject()) {
            projectMenuUI.getActiveProject().classList.remove('active-project')
        }
        createTaskTable(sortedAllTasks)
    }

    function showTasksOfActiveProject(taskOrder) {

        const activeProject = projectManager.getProjectList()[projectMenuUI.getActiveProject().dataset.projectId]
        const tasksInProject = projectManager.getTasksInProject(activeProject)

        let orderedTasksInProject = []

        if (taskOrder === 0) { // chronological
            orderedTasksInProject = tasksInProject
        }

        if (taskOrder === 1) { // priority
            orderedTasksInProject = projectManager.sortByPriority(tasksInProject)
        }

        if (taskOrder === 2) { //due date
            orderedTasksInProject = tasksInProject
        }

        const sortedTasksInProject = projectManager.sortByFinished(orderedTasksInProject)

        createTaskTable(sortedTasksInProject)
    }


    function updateTaskList() {

        if (projectMenuUI.getActiveProject()) {
            showTasksOfActiveProject(dataStorage.taskOrder)
        } else {
            showAllTasks(dataStorage.taskOrder)
        }
    }

    return { showTasksOfActiveProject, showAllTasks, updateTaskList }
})()



//for testing purposes
populateOnLoad()
projectMenuUI.updateProjectMenu()
taskAreaUI.updateTaskList(dataStorage.taskOrder)


export { taskAreaUI }