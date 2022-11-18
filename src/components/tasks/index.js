import createElement from "../../utils/createElement.js";
import findFreeId from "../../utils/findFreeId.js";
import Task from "../tasks/taskCreated.js"

const tasks = {
    element: createElement('ul', {className: 'todo-item'}),
    list: [],
    addTask(title, description, user, date) {
        const id = findFreeId(this.list)
        const task = new Task(id, title, description, user, date);
        this.list.push(task);
        this.element.append(task.element);
        console.log(this)
    }
}

export default tasks;