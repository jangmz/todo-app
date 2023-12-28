import "./styles/main.css";
import { loadDOM } from "./loadDOM.js";
import { ToDo } from "./todoModule.js";
import { Project } from "./projectModule.js";

// parse data from form submission (todo)
export function gatherFormDataTodo() {
    //gather data from the dialog inputs
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let dueDate = document.getElementById("dueDate");
    let priority = document.getElementById("priority");
    let checklist = document.getElementById("checklist");
    let projectTitle = document.getElementById("projectTitle");
    //let finished = document.getElementById("finished");

    // create object from the data
    let todo = new ToDo(title.value, description.value, dueDate.value, priority.value, checklist.value, projectTitle.value/*, finished.value*/);

    // find which project user chose and add this todo to that project
    MyProjects.forEach(project => {
        if (project.title.toLowerCase() === projectTitle.value) {
            project.addTodoToProject(todo);
            console.log(`To-do added to ${project.title.toUpperCase()}`);
        }
    })

    console.log("New To-do created.");
    return todo;
}

// parse data from form submission (project)
export function saveFormDataProject() {
    // parse data, add to my projects
    const projectTitle = document.getElementById("project-title");

    let project = new Project(projectTitle.value, "custom");

    MyProjects.push(project);
    console.log("New project created." + project.title);
}

export const MyProjects = [
    new Project("Other", "default"),
    new Project("Home renovation", "custom")
];

loadDOM();

//console.log("ALL PROJECTS: ");
MyProjects.forEach(project => console.log(project))

/*

    [x] create new project
    [x] newly created project are shown on new task entry selection list
    [x] both new project and new todo assigned to the new project is displayed in the side menu
    [] display to do on the main section when clicked (display all properties in correct format) 
        function in projectModule, called in loadDOM
    [] change todo to completed (add button)
    [] delete a todo (add button)
    [] change todo priority
    [] change todo date
    [] add/strikethrough additional sub todos

*/