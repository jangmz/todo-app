import { gatherFormData } from "./index.js";
import { MyProjects } from "./index.js";
//import closeIcon from "./assets/icons/close-circle.svg";

export function loadDOM() {
    const container = document.querySelector(".container");
    const dialog = createTaskDialog();

    const content = document.createElement("div");
    const taskCards = document.createElement("div");
    const sideMenu = document.createElement("div");
    const projectsArea = createProjectsSideMenu(); // where projects will be displayed on the side menu
    const buttonsArea = document.createElement("div"); // buttons for creating todo and creating project
    const newTodoButton = document.createElement("button");
    const newProjectButton = document.createElement("button");

    content.classList.add("content");
    taskCards.classList.add("task-cards");
    sideMenu.classList.add("side-menu");
    buttonsArea.classList.add("buttons-area");

    newTodoButton.textContent = "Add new to-do";
    newTodoButton.addEventListener("click", () => {
        dialog.showModal();
    });
    newProjectButton.textContent = "Add new project";
    newProjectButton.addEventListener("click", () => {
        console.log("Not yet functional");
    })

    buttonsArea.appendChild(newTodoButton);
    buttonsArea.appendChild(newProjectButton);

    sideMenu.appendChild(projectsArea);
    sideMenu.appendChild(buttonsArea);
    content.appendChild(taskCards);
    container.appendChild(sideMenu);
    container.appendChild(content);
    
    console.log("DOM loaded");
}

function createTaskDialog() {
    const container = document.querySelector(".container");
    const dialog = document.createElement("dialog");
    const modalDiv = document.createElement("div");
    const dialogHead = document.createElement("div");
    const dialogTitle = document.createElement("h1");
    const dialogCloseIcon = document.createElement("img");

    modalDiv.classList.add("modal");
    dialogHead.classList.add("modal-head");
    dialogTitle.textContent = "New Task Entry";
    dialogCloseIcon.classList.add("close-icon");
    dialogCloseIcon.id = "close";
    //dialogCloseIcon.src = closeIcon; 
    dialogCloseIcon.src = "#";
    
    // closing the dialog window -> does not work yet
    dialogCloseIcon.addEventListener("click", () => {
        dialog.close();
    });

    dialogHead.appendChild(dialogTitle);
    dialogHead.appendChild(dialogCloseIcon);
    modalDiv.appendChild(dialogHead)

    const addTodoForm = generateAddTodoForm(dialog);
    modalDiv.appendChild(addTodoForm);

    dialog.appendChild(modalDiv);
    container.appendChild(dialog);

    return dialog;
}

function generateAddTodoForm(dialog) {
    const form = document.createElement("form");
    form.id = "addTodo";

    const fields = [
        { label: "Title", type: "text", name: "title", required: true },
        { label: "Description", type: "textarea", name: "description" },
        { label: "Due Date", type: "date", name: "dueDate", required: true },
        { label: "Priority", type: "select", name: "priority", options: ["High", "Medium", "Low"], required: true },
        { label: "Check list", type: "text", name: "checklist" },
        { label: "Project title", type: "select", name: "projectTitle", options: ["Other", "Home"] },
        //{ label: "Finished", type: "checkbox", name: "finished" }
    ];

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Create To-Do";

    // form element creation
    fields.forEach(field => {
        // create div + label for input
        const fieldDiv = document.createElement("div");
        const label = document.createElement("label");
        
        fieldDiv.classList.add("form-input");
        label.textContent = field.label;

        let input;

        // generate element depending on the type of input
        switch(field.type) {
            case "text":
                input = document.createElement("input");
                input.type = field.type;
                // temporary 
                input.value = "test title";
                break;
            case "textarea":
                input = document.createElement("textarea");
                // temporary 
                input.value = "test description";
                break;
            case "date":
                input = document.createElement("input");
                input.type = "date";
                // temporary 
                input.value = "2023-12-23";
                break;
            case "select":
                input = document.createElement("select");
                field.options.forEach(option => {
                    const optionElement = document.createElement("option");
                    optionElement.value = option.toLowerCase();
                    optionElement.textContent = option;
                    input.appendChild(optionElement);
                });
                break;
            /*case "checkbox":
                input = document.createElement("input");
                input.type = "checkbox";
                input.value = "checked";
                break;*/
        }

        input.id = field.name;
        input.name = field.name;

        if (field.required) {
            input.required = true;
        }

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);
        form.appendChild(fieldDiv);
    });

    // when form is submitted
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // gather all the input data and create a todo object, display todo on the DOM
        displayTask(gatherFormData());

        //refresh the side menu projects and tasks
        refreshSideMenuProjects();

        // after submission, dialog closes
        dialog.close();
    })

    form.appendChild(submitButton);

    console.log("Created Form")
    return form;
}

function displayTask(task) {
    // display tasks on main content div
    const contentDiv = document.querySelector(".content");
    const taskCardsDiv = document.querySelector(".task-cards");
    
    // create elements for the task
    const taskCard = document.createElement("div"); 
    const taskTitle = document.createElement("h2");
    const taskDescr = document.createElement("p");
    const taskDueDate = document.createElement("h4");
    const taskPriority = document.createElement("h4");
    const checklist = document.createElement("div");
    const taskSubTask = document.createElement("p"); // items from checklist
    //const taskFinished = document.createElement("h4");

    // add class for css
    taskCard.classList.add("task-card");

    // add values to elements
    taskTitle.textContent = task.title;
    taskDescr.textContent = task.description;
    taskDueDate.textContent = task.dueDate;
    taskPriority.textContent = task.priority;
    taskSubTask.textContent = task.checklist;
    //taskFinished.textContent = `Finished: ${task.finished}`;

    // append to card
    checklist.appendChild(taskSubTask);
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDescr);
    taskCard.appendChild(taskDueDate);
    taskCard.appendChild(taskPriority);
    taskCard.appendChild(checklist);
    //taskCard.appendChild(taskFinished);

    taskCardsDiv.appendChild(taskCard);
    contentDiv.appendChild(taskCardsDiv);

    console.log("To-do displayed!");
}

function createProjectsSideMenu() {
    const projectsAreaDiv = document.createElement("div");
    projectsAreaDiv.classList.add("projects-area");
    
    MyProjects.forEach(project => {
        let projectDiv = createProjectDivSideMenu(project);
        projectsAreaDiv.appendChild(projectDiv);
    })
    
    return projectsAreaDiv;
}

function createProjectDivSideMenu(project) {
    let projectDiv = document.createElement("div");
    let projectTitle = document.createElement("p");

    projectDiv.classList.add("side-project");
    projectDiv.id = project.title.toLowerCase();
    projectTitle.classList.add("side-project-title");

    projectTitle.textContent = project.title;

    projectDiv.appendChild(projectTitle);

    if (project.tasks.length === 0) {
        let todo = document.createElement("p");
        todo.textContent = "No current tasks";
        todo.style.fontStyle = "italic";
        projectDiv.appendChild(todo);
    } else {
        project.tasks.forEach(task => {
            let todo = document.createElement("p");
            todo.textContent = task.title;
            todo.classList.add("side-project-todo");
            projectDiv.appendChild(todo);
        })
    }

    return projectDiv;
}

function refreshSideMenuProjects() {
    const projectsAreaDiv = document.querySelector(".projects-area");

    while (projectsAreaDiv.firstChild) {
        projectsAreaDiv.removeChild(projectsAreaDiv.firstChild);
    }

    MyProjects.forEach(project => {
        let projectDiv = createProjectDivSideMenu(project);
        projectsAreaDiv.appendChild(projectDiv);
    })

}