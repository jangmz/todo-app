import { Project } from "./projectModule";
import { displayTask } from "./loadDOM";

export class ToDo {
    constructor(title, description, dueDate, priority, checklist, projectTitle, finished) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate; // date type
        this.priority = priority;
        this.checklist = checklist; // is an array
        this.projectTitle = projectTitle;
        //this.finished = finished; // true or false
    }

    get showDueDate() {
        return `This task is due: ${this.dueDate}`;
    }
}