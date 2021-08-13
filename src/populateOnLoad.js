import { createTask } from "./createTask"
import { createProject } from "./createProject"

const populateOnLoad = () => {
    const project1 = createProject('TOP programming', 'learn to be a front-end developer', 'high')
    const project2 = createProject('Spring cleaning', 'dont live like a pig', 'low')
    const project3 = createProject('Portfolio', 'get ready for interviews', 'high')
    const project4 = createProject('Workout', 'get your shit together :)', 'medium')
    const task1 = createTask('Project: TODO List', 'final assignment of the Javascript basics course', 'tomorrow', 'high', project1)
    const task2 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project1, true)
    const task3 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project1, true)
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
} 

export { populateOnLoad }