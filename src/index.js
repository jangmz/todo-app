import "./styles/main.css";
import { loadDOM } from "./loadDOM.js";
import { ToDo } from "./todoModule.js";
import { Project } from "./projectModule.js";

export function gatherFormData() {
    //gather data from the dialog inputs
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let dueDate = document.getElementById("dueDate");
    let priority = document.getElementById("priority");
    let checklist = document.getElementById("checklist");
    let finished = document.getElementById("finished");

    let todo = new ToDo(title.value, description.value, dueDate.value, priority.value, checklist.value, finished.value);
    console.log("To-do created!");

    MyProjects.forEach(project => {
        if (project.type === "default") {
            project.addTodoToProject(todo);
            console.log("To-do added to project");
        }
    })
    
    console.log(MyProjects);

    return todo;
}

loadDOM();

const MyProjects = [
    new Project("Other", "default"),
    new Project("Home", "custom")
];

console.log("ALL PROJECTS: ");

MyProjects.forEach(project => console.log(project))