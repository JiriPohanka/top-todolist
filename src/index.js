import format from 'date-fns'

//create a new task
function createTask(title, desc, dueDate, priority, parentProject) {

    const newTask = { title, desc, dueDate, priority, parentProject }
    newTask.isFinished = false

    taskManager.appendToProject(newTask, parentProject)

    return newTask
}

//create a new project
function createProject(title, desc, priority) {
    const newProject = { title, desc, priority }
    newProject.taskArr = []
    projectManager.appendToProjects(newProject)
    return newProject
}


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
        console.log(taskAreaUI.showAllTasks)
        taskAreaUI.showAllTasks()
    })

    const projectList = projectManager.getProjectList()
    const projectNav = document.querySelector('.project-nav ul')

    // update the list of current projects
    function updateProjectMenu() {
        projectNav.innerHTML = ""

        for (let [i, project] of projectList.entries()) {
            const projectItem = document.createElement('li')
            projectItem.setAttribute('data-project-id', i)
            projectItem.classList.add('project-item')
            projectNav.appendChild(projectItem)
            projectItem.textContent = `${project.title}`
        }

        // add active-project class to clicked project
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

        let activeProject = document.querySelector('li.active-project')
        
        return activeProject
    }

    return { updateProjectMenu, getActiveProject }
})()

//module for populating tasks area based on active project
const taskAreaUI = (() => {

    const activeTasksTable = document.querySelector('.active-tasks-table')

    function showAllTasks() {
        const allTasks = projectManager.getAllTasks()
        activeTasksTable.innerHTML = "" // reset contents of task table

        if (projectMenuUI.getActiveProject()) {
            projectMenuUI.getActiveProject().classList.remove('active-project')
        }

        // create table headings
        const headingRow = document.createElement('tr')
        activeTasksTable.appendChild(headingRow)

        const colTitle = document.createElement('th')
        headingRow.appendChild(colTitle)
        colTitle.textContent = "Task"

        const colDesc = document.createElement('th')
        headingRow.appendChild(colDesc)
        colDesc.textContent = "Description"

        const colDueDate = document.createElement('th')
        headingRow.appendChild(colDueDate)
        colDueDate.textContent = "Deadline"

        const colPriority = document.createElement('th')
        headingRow.appendChild(colPriority)
        colPriority.textContent = "Priority"
        
        const colProject = document.createElement('th')
        headingRow.appendChild(colProject)
        colProject.textContent = "Project"

        for (let item of allTasks) {

            //create elements with all the information
            const row = document.createElement('tr')
            activeTasksTable.appendChild(row)

            const colTitleValue = document.createElement('td')
            row.appendChild(colTitleValue)
            colTitleValue.textContent = item.title

            const colDescValue = document.createElement('td')
            row.appendChild(colDescValue)
            colDescValue.textContent = item.desc

            const colDueDateValue = document.createElement('td')
            row.appendChild(colDueDateValue)
            colDueDateValue.textContent = item.dueDate

            const colPriorityValue = document.createElement('td')
            row.appendChild(colPriorityValue)
            colPriorityValue.textContent = item.priority
            
            const colProjectValue = document.createElement('td')
            row.appendChild(colProjectValue)
            colProjectValue.textContent = item.parentProject.title

        }

    }

    function showTasksOfActiveProject() {

        const activeProjectID = projectMenuUI.getActiveProject().dataset.projectId
        const activeProject = projectManager.getProjectList()[activeProjectID]
        const tasksInProject = projectManager.getTasksInProject(activeProject)
        activeTasksTable.innerHTML = ""

        // create table headings
        const headingRow = document.createElement('tr')
        activeTasksTable.appendChild(headingRow)

        const colTitle = document.createElement('th')
        headingRow.appendChild(colTitle)
        colTitle.textContent = "Task"

        const colDesc = document.createElement('th')
        headingRow.appendChild(colDesc)
        colDesc.textContent = "Description"

        const colDueDate = document.createElement('th')
        headingRow.appendChild(colDueDate)
        colDueDate.textContent = "Deadline"

        const colPriority = document.createElement('th')
        headingRow.appendChild(colPriority)
        colPriority.textContent = "Priority"

        const colProject = document.createElement('th')
        headingRow.appendChild(colProject)
        colProject.textContent = "Project"


        for (let task of tasksInProject) {
            //create elements with all the information
            const row = document.createElement('tr')
            activeTasksTable.appendChild(row)

            const colTitleValue = document.createElement('td')
            row.appendChild(colTitleValue)
            colTitleValue.textContent = task.title

            const colDescValue = document.createElement('td')
            row.appendChild(colDescValue)
            colDescValue.textContent = task.desc

            const colDueDateValue = document.createElement('td')
            row.appendChild(colDueDateValue)
            colDueDateValue.textContent = task.dueDate

            const colPriorityValue = document.createElement('td')
            row.appendChild(colPriorityValue)
            colPriorityValue.textContent = task.priority
            
            const colProjectValue = document.createElement('td')
            row.appendChild(colProjectValue)
            colProjectValue.textContent = task.parentProject.title
        }
    }

    return { showTasksOfActiveProject, showAllTasks }
})()



//for testing purposes

const project1 = createProject('TOP programming', 'learn to be a front-end developer', 'high')
const project2 = createProject('Spring cleaning', 'dont live like a pig', 'low')
const project3 = createProject('Portfolio', 'get ready for interviews', 'high')
const project4 = createProject('Workout', 'get your shit together :)', 'medium')
const task1 = createTask('Project: TODO List', 'final assignment of the Javascript basics course', 'tomorrow', 'high', project1)
const task2 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project1)
const task3 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project1)
const task4 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project1)
const task5 = createTask('Project: TODO List', 'final assignment of the Javascript basics course', 'tomorrow', 'high', project1)
const task6 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project2)
const task7 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project2)
const task8 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project3)
const task9 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project3)
const task10 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project3)
const task11 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project4)
const task12 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project4)
const task13 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project4)
projectMenuUI.updateProjectMenu()
taskAreaUI.showAllTasks()