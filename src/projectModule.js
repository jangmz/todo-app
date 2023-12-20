export class Project {
    constructor (title, type) {
        this.title = title;
        this.type = type; // if type === "default" it can't be deleted, if it's "custom" it can be deleted
        this.tasks = []; // here you push your "todo" objects
    }

    addTodoToProject(ToDo) {
        this.tasks.push(ToDo);    
    }
}