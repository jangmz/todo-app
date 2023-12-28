import "./styles/main.css";
import { loadDOM } from "./loadDOM.js";
import { ToDo } from "./todoModule.js";
import { Project } from "./projectModule.js";

export function gatherFormDataTodo() {
    //gather data from the dialog inputs
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let dueDate = document.getElementById("dueDate");
    let priority = document.getElementById("priority");
    let checklist = document.getElementById("checklist");
    let projectTitle = document.getElementById("projectTitle");
    //let finished = document.getElementById("finished");

    console.log("project: " + projectTitle.value);

    // create object from the data
    let todo = new ToDo(title.value, description.value, dueDate.value, priority.value, checklist.value/*, finished.value*/);
    console.log("To-do created!");

    // find which project user chose and add this todo to that project
    MyProjects.forEach(project => {
        if (project.title.toLowerCase() === projectTitle.value) {
            project.addTodoToProject(todo);
            console.log(`To-do added to ${project.title.toUpperCase()}`);
        }
    })
    
    //console.log(MyProjects);

    return todo;
}

export function saveFormDataProject() {
    // parse data, add to my projects
}

export const MyProjects = [
    new Project("Other", "default"),
    new Project("Home", "custom")
];

loadDOM();

//console.log("ALL PROJECTS: ");
MyProjects.forEach(project => console.log(project))

/*

    [] create new project -> finish generateAddProjectForm(dialog) function
    [] display to do on the main section when clicked (display all properties in correct format)
    [] change todo to completed (add button)
    [] delete a todo (add button)
    [] change todo priority
    [] change todo date
    [] add/strikethrough additional sub todos

*/