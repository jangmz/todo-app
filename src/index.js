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
    let done = false;
    
    let todo;

    // find which project user chose and add this todo to that project
    MyProjects.forEach(project => {
        if (project.title.toLowerCase() === projectTitle.value) {
            // create object from the data
            todo = new ToDo(title.value, description.value, dueDate.value, priority.value, checklist.value, project, done);
            
            project.addTodoToProject(todo);
            console.log(`To-do added to ${project.title.toUpperCase()}`);
        }
    })

    logData();
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

export function logData() {
    console.log("====================PROJECTS======================");
    MyProjects.forEach(project => console.log(project))
    console.log("==================================================");
} 

export const MyProjects = [
    new Project("Other", "default"),
    new Project("Home renovation", "custom")
];

loadDOM();
logData();

/*

    [x] create new project
    [x] newly created project are shown on new task entry selection list
    [x] both new project and new todo assigned to the new project is displayed in the side menu
    [x] display to-do on the main section when clicked (display all properties in correct format) 
        function in projectModule, called in loadDOM
    [x] change todo to completed (add checkbox)
    - changed "finished" property to "done"
    - added visibility to "Done" property on the task card
    - task can be marked as "Done" and background changes
    [x] change todo "done" status in Project array
    [] display the "close" icon in dialog
    [x] delete a todo (button)
    [] delete project (button) -> deleteProject function in loadDOM
    [] change todo priority
    [] change todo date
    [] strikethrough additional sub todos
    [] button to add additional sub todos later
    [] include local storage instead of arrays
*/