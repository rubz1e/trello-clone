import Column from "../Column.js";

const todoColumn = new Column('todo');
const inProgressColumn = new Column('inProgress');
const doneColumn = new Column('done');
todoColumn.nextColumn = inProgressColumn;
inProgressColumn.previousColumn = todoColumn;
inProgressColumn.nextColumn = doneColumn;

export { todoColumn, inProgressColumn, doneColumn };
