import { taskManager } from "./managers"
import { taskAreaUI } from "./index"

const activeTasksTable = document.querySelector('.active-tasks-table')

const createTaskTable = (relevantTasks) => {

    activeTasksTable.innerHTML = "" // first reset the table

    // add headings of the table
    const headingRow = document.createElement('tr')
    activeTasksTable.appendChild(headingRow)

    const colStatus = document.createElement('th')
    headingRow.appendChild(colStatus)
    colStatus.textContent = ""

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

    // for each task object create a row in table
    const includeFinishedCheckbox = document.querySelector('#checkbox-include-finished')
    
    for (let task of relevantTasks) {

        const row = document.createElement('tr')
        activeTasksTable.appendChild(row)
        
        const colStatusValue = document.createElement('td')
        const checkBox = document.createElement('input')
        row.appendChild(colStatusValue)
        colStatusValue.appendChild(checkBox)
        checkBox.setAttribute('type', 'checkbox')
        checkBox.checked = task.isFinished

        if (checkBox.checked && includeFinishedCheckbox.checked) {
            row.classList.add('task-finished')
            row.classList.add('show-hidden-task')
        }
        
        if (checkBox.checked && !includeFinishedCheckbox.checked) {
            row.classList.add('task-finished')
        }
        
        checkBox.addEventListener('change', () => {
            if (checkBox.checked) {
                taskManager.finishTask(task)
                taskAreaUI.updateTaskList()
            } else {
                taskManager.restoreTask(task)
                taskAreaUI.updateTaskList()
            }


        })

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


export { createTaskTable }