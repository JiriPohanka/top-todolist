import { createTask } from "./createTask"
import { createProject } from "./createProject"

const populateOnLoad = () => {
    const project1 = createProject('TOP programming', 'learn to be a front-end developer', '3')
    const project2 = createProject('Spring cleaning', 'dont live like a pig', '1')
    const project3 = createProject('Portfolio', 'get ready for interviews', '3')
    const project4 = createProject('Workout', 'get your shit together :)', '2')
    const task1 = createTask('Project: TODO List', 'final assignment of the Javascript basics course', '2021-08-14', 3, project1)
    const task2 = createTask('Do it!', 'Just do it already!', '2021-08-17', 3, project1, true)
    const task3 = createTask('Do it!', 'Just do it already!', '2021-08-18', 3, project1, true)
    const task4 = createTask('Do it!', 'Should just do it!', '2021-08-14', 2, project1)
    const task5 = createTask('Project: TODO List', 'final assignment of the Javascript basics course', '2021-08-16', 3, project1)
    const task6 = createTask('Do it!', 'Should just do it!', '2021-08-16', 2, project2)
    const task7 = createTask('Do it!', 'Should just do it!', '2021-08-11', 2, project2)
    const task8 = createTask('Do it!', 'Just do it maybe!', '2021-08-19', 1, project3)
    const task9 = createTask('Do it!', 'Just do it maybe!', '2021-08-18', 1, project3)
    const task10 = createTask('Do it!', 'Just do it maybe!', '2021-08-13', 1, project3)
    const task11 = createTask('Do it!', 'Just do it maybe!', '2021-08-11', 1, project4)
    const task12 = createTask('Do it!', 'Just do it maybe!', '2021-08-12', 1, project4)
    const task13 = createTask('Do it!', 'Just do it maybe!', '2021-08-13', 1, project4)
    const task14 = createTask('Do it!', 'Just do it maybe!', '2021-08-14', 2, project4)
    const task15 = createTask('Do it!', 'Just do it maybe!', '2021-08-15', 2, project4)
    const task16 = createTask('Do it!', 'Just do it maybe!', '2021-08-16', 3, project4)
    const task17 = createTask('Do it!', 'Just do it maybe!', '2021-08-17', 1, project4)
    const task18 = createTask('Do it!', 'Just do it maybe!', '2021-08-18', 2, project4)
} 

export { populateOnLoad }