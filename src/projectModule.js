import { displayTask } from "./loadDOM";

export class Project {
    constructor (title, type) {
        this.title = title;
        this.type = type; // if type === "default" it can't be deleted, if it's "custom" it can be deleted
        this.tasks = []; // here you push your "todo" objects
    }

    addTodoToProject(ToDo) {
        this.tasks.push(ToDo);    
    }

    displayTasksToDOM() {
        if (this.tasks.length === 0) {
            const taskCardsDiv = document.querySelector(".task-cards");
            const message = document.createElement("h4");
            message.classList.add("message");
            message.textContent = "This project has no tasks. Create them, by clicking the button on the side menu.";
            taskCardsDiv.appendChild(message);
        } else {
            this.tasks.forEach(task => displayTask(task));
        }
    }
}