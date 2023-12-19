export class Project {
    constructor (title, type) {
        this.title = title;
        this.type = type; // if type === "default" it can't be deleted, if it's "custom" it can be deleted
        this.tasks = []; // here you push your "todo" objects
    }

    addTodoToProject(ToDo, projectTitle) {
        //logic for adding todo object to project
        if (!projectTitle) { // if the project has not been chosen, save to default project
            projectTitle = "Other";
        }
    }

}

const MyProjects = [
    {title: "Other", type: "default"}
];

console.log("ALL PROJECTS: ");

MyProjects.forEach(project => console.log(project))