import { Project } from "./projectModule";
import { displayTask } from "./loadDOM";

export class ToDo {
    constructor(title, description, dueDate, priority, checklist, project, done) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate; // date type
        this.priority = priority;
        this.checklist = checklist; // is an array
        this.project = project; // instance of the project
        this.done = done; // true or false
    }

    get showDueDate() {
        return `This task is due: ${this.dueDate}`;
    }

    set doneValue(value) {
        this.done = value;
    }

}