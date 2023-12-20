import { Project } from "./projectModule";
import { displayTask } from "./loadDOM";

export class ToDo {
    constructor(title, description, dueDate, priority, checklist, projectTitle, finished) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate; // date type
        this.priority = priority;
        this.checklist = checklist; // is an array
        //this.projectTitle = projectTitle;
        this.finished = finished; // true or false
    }

    get showDueDate() {
        return `This task is due: ${this.dueDate}`;
    }

    createTodo() {

        //gather data from the dialog inputs
        let title = document.getElementById("title");
        let description = document.getElementById("description");
        let dueDate = document.getElementById("dueDate");
        let priority = document.getElementById("priority");
        let checklist = document.getElementById("checklist");
        let finished = document.getElementById("finished");
    
        // create ToDo object with input data
        let task = new ToDo(title.value, description.value, dueDate.value, priority.value, checklist.value, finished.value);
    
        console.log("Task created!");

        // call displayTask method
        
    }
}