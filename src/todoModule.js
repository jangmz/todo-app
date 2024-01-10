import { Project } from "./projectModule";
import { displayTask } from "./loadDOM";

export class ToDo {
    constructor(id, title, description, dueDate, priority, checklist, project, done) {
        this.id = id
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

    updateData(title, description, dueDate, priority, checklist, done) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checklist = checklist;
        this.done = done;
        //this.project = newData.project;
        console.log("Todo data updated.");
    }
}