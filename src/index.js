import createElement from "./utils/createElement.js"
import Task from './components/tasks/taskCreated.js'
import tasks from './components/tasks/index.js'

const createOfDate = new Date().toLocaleString();
tasks.addTask('title', '123awdwadwadwadawda', 'Angelina Sergeevna', createOfDate)

document.querySelector('#todo-list')?.append(tasks.element)