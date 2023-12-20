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

    let task = new ToDo(title.value, description.value, dueDate.value, priority.value, checklist.value, finished.value);

    console.log("Task created!");
    return task;
}

loadDOM();

const MyProjects = [
    { title: "Other", type: "default" },
    { title: "Home renovation", type: "custom"}
];

console.log("ALL PROJECTS: ");

MyProjects.forEach(project => console.log(project))