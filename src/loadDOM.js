import { gatherFormDataTodo, logData, saveFormDataProject } from "./index.js";
import { MyProjects } from "./index.js";
import closeIcon from "./assets/icons/close-circle.svg";

export function loadDOM() {
    const container = document.querySelector(".container");
    const dialog = createTaskDialog(); // dialog for a new todo
    const dialog2 = createProjectDialog(); // dialog for a new project

    const content = document.createElement("div");
    const contentHeading = document.createElement("div");
    const taskCards = document.createElement("div");
    const sideMenu = document.createElement("div");
    const projectsArea = createProjectsSideMenu(); // where projects will be displayed on the side menu
    const buttonsArea = document.createElement("div"); // buttons for creating todo and creating project
    const newTodoButton = document.createElement("button");
    const newProjectButton = document.createElement("button");

    content.classList.add("content");
    contentHeading.classList.add("content-heading");
    taskCards.classList.add("task-cards");
    sideMenu.classList.add("side-menu");
    buttonsArea.classList.add("buttons-area");

    newTodoButton.textContent = "Add new to-do";
    newTodoButton.addEventListener("click", () => {
        dialog.showModal();
    });
    newProjectButton.textContent = "Add new project";
    newProjectButton.addEventListener("click", () => {
        dialog2.showModal();
    })

    buttonsArea.appendChild(newTodoButton);
    buttonsArea.appendChild(newProjectButton);

    sideMenu.appendChild(projectsArea);
    sideMenu.appendChild(buttonsArea);
    content.appendChild(contentHeading);
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

    dialog.id = "todo-dialog";
    modalDiv.classList.add("modal");
    dialogHead.classList.add("modal-head");
    dialogTitle.textContent = "New Task Entry";
    dialogCloseIcon.classList.add("close-icon");
    dialogCloseIcon.id = "close";
    dialogCloseIcon.src = closeIcon; 
    //dialogCloseIcon.src = "/src/assets/icons/close-circle.svg";
    
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

    const priorityChoice = ["High", "Medium", "Low"]

    // fields in form
    const fields = [
        { label: "Title", type: "text", name: "title", required: true },
        { label: "Description", type: "textarea", name: "description" },
        { label: "Due Date", type: "date", name: "dueDate", required: true },
        { label: "Priority", type: "select", name: "priority", options: priorityChoice, required: true },
        { label: "Check list", type: "text", name: "checklist" },
        { label: "Project title", type: "select", name: "projectTitle", options: MyProjects },
        //{ label: "Done", type: "checkbox", name: "finished" }
    ];

    // submit button
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

                    if (typeof option === "object") {
                        optionElement.value = option.title.toLowerCase();
                        optionElement.textContent = option.title;
                    } else {
                        optionElement.value = option.toLowerCase();
                        optionElement.textContent = option;
                    }
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
        input.required = field.required;

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);
        form.appendChild(fieldDiv);
    });

    form.appendChild(submitButton);

    // when form is submitted
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // gather all the input data and create a todo object, display todo on the DOM
        displayTask(gatherFormDataTodo());

        //refresh the side menu projects and tasks
        refreshSideMenuProjects();

        dialog.close();
        //form.reset(); -> enable when finished
    });

    console.log("To-do form created");
    return form;
}

function createProjectDialog() {
    const container = document.querySelector(".container");
    const dialog = document.createElement("dialog");
    const modalDiv = document.createElement("div");
    const dialogHead = document.createElement("div");
    const dialogTitle = document.createElement("h1");
    const dialogCloseIcon = document.createElement("img");

    dialog.id = "project-dialog";
    modalDiv.classList.add("modal");
    dialogHead.classList.add("modal-head");
    dialogTitle.textContent = "New Project";
    dialogCloseIcon.classList.add("close-icon");
    dialogCloseIcon.id = "close";
    dialogCloseIcon.src = "#";

    dialogCloseIcon.addEventListener("click", () => {
        dialog.close();
    });

    dialogHead.appendChild(dialogTitle);
    dialogHead.appendChild(dialogCloseIcon);
    modalDiv.appendChild(dialogHead);

    const addProjectForm = generateAddProjectForm(dialog);
    modalDiv.appendChild(addProjectForm);

    dialog.appendChild(modalDiv);
    container.appendChild(dialog);

    return dialog;
}

function generateAddProjectForm(dialog) {
    const form = document.createElement("form");
    form.id = "addProject";

    // fields in form
    const fields = [
        { label: "Project title", type: "text", name: "project-title", required: true }
    ];

    // submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Create project";

    // form element creation
    fields.forEach(field => {
        // create div + label
        const fieldDiv = document.createElement("div");
        const label = document.createElement("label");

        fieldDiv.classList.add("form-input");
        label.textContent = field.label;

        let input = document.createElement("input");
        input.type = field.type;
        input.id = field.name;
        input.name = field.name;
        input.required = field.required;

        // temporary value
        input.value = "Test project";

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);
        form.appendChild(fieldDiv);
    });

    form.appendChild(submitButton);

    // form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // gather input data and create project, display project on the sidemenu
        saveFormDataProject();
        refreshSideMenuProjects();

        // refresh todo form project selection
        refreshFormOptions();

        dialog.close();
    });

    console.log("Project form created");
    return form;
}

export function displayTask(task) {
    // display tasks on main content div
    const taskCardsDiv = document.querySelector(".task-cards");
    
    // create elements for the task
    const taskCard = document.createElement("div"); 
    const taskTitle = document.createElement("h2");
    const taskDescr = document.createElement("p");
    const taskDueDate = document.createElement("h4");
    const taskPriority = document.createElement("h4");
    const checklist = document.createElement("div");
    const taskSubTask = document.createElement("p"); // items from checklist
    const taskDoneDiv = document.createElement("div");
    const taskDone = document.createElement("input");
    const taskDoneLabel = document.createElement("label");
    const deleteTaskBtn = document.createElement("button");

    // add class for css
    taskCard.classList.add("task-card");
    taskDoneDiv.classList.add("task-done");

    // add values to elements
    taskTitle.textContent = task.title;
    taskDescr.textContent = task.description;
    taskDueDate.textContent = task.dueDate;
    taskPriority.textContent = task.priority;
    taskSubTask.textContent = task.checklist;
    taskDone.type = "checkbox";
    taskDone.name = "done";
    taskDone.id = "done";
    if (task.done === false) {
        taskDone.checked = false;
        taskCard.style.backgroundColor = "#90ee90";
    } else {
        taskDone.checked = true;
        taskCard.style.backgroundColor = "gray";
    }
    taskDoneLabel.textContent = "Done";
    deleteTaskBtn.name = task.title;
    deleteTaskBtn.textContent = "Delete To-do";

    // event listener for "done" checkbox
    taskDone.addEventListener("change", (e) => {
        task.doneValue = e.target.checked;
        console.log("Task done: " + task.done);

        // change background color to gray if task is done
        if (task.done === true) {
            taskCard.style.backgroundColor = "gray";
        } else {
            taskCard.style.backgroundColor = "#90ee90";
        }

        logData();
    })

    // event listener for task delete button
    deleteTaskBtn.addEventListener("click", () => {
        // call function to delete a task
        task.project.deleteTaskFromProject(task.title);
        refreshContent();
        task.project.displayTasksToDOM();
    });

    taskDoneDiv.appendChild(taskDone);
    taskDoneDiv.appendChild(taskDoneLabel);

    // append to card
    checklist.appendChild(taskSubTask);
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDescr);
    taskCard.appendChild(taskDueDate);
    taskCard.appendChild(taskPriority);
    taskCard.appendChild(checklist);
    taskCard.appendChild(taskDoneDiv);
    taskCard.appendChild(deleteTaskBtn);

    taskCardsDiv.appendChild(taskCard);

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

// displays projects on the side menu and calls the function to display tasks of a current project
function createProjectDivSideMenu(project) {
    let projectDiv = document.createElement("div");
    let projectTitle = document.createElement("p");

    projectDiv.classList.add("side-project");
    projectDiv.id = project.title.toLowerCase();

    projectTitle.classList.add("side-project-title");
    projectTitle.textContent = project.title;

    projectTitle.addEventListener("click", () => {
        console.log(`Clicked on project -> ${project.title}`); 
        displayProjectTasks(project);
    })

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

// displays all the content from a project: title, delete project, tasks
function displayProjectTasks(project) {
    //clear displayed content
    clearMainContent();

    // show project title on main content area
    const contentHeading = document.querySelector(".content-heading");
    const projectHeading = document.createElement("h1");
    

    projectHeading.classList.add("project-heading-title");
    

    projectHeading.textContent = project.title;

    if (project.type === "custom") {
        const deleteProjectBtn = document.createElement("button");
        deleteProjectBtn.classList.add("delete-project-btn");
        deleteProjectBtn.textContent = "Delete project";
        deleteProjectBtn.addEventListener("click", () => deleteProject(project));
        contentHeading.appendChild(deleteProjectBtn);
    }
    
    contentHeading.appendChild(projectHeading);
    
    project.displayTasksToDOM();
    console.log("Tasks of the project displayed.");
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

function refreshFormOptions() {
    const dialogProjectOptions = document.getElementById("projectTitle");
    const newOptionElement = document.createElement("option");
    
    newOptionElement.value = MyProjects[MyProjects.length - 1].title.toLowerCase();
    newOptionElement.textContent = MyProjects[MyProjects.length - 1].title;

    dialogProjectOptions.appendChild(newOptionElement);
}

function clearMainContent() {
    const contentHeading = document.querySelector(".content-heading");
    const taskCardsDiv = document.querySelector(".task-cards");

    // clears content heading
    while (contentHeading.firstChild) {
        contentHeading.removeChild(contentHeading.firstChild);
    }

    // clears all the tasks
    while (taskCardsDiv.firstChild) {
        taskCardsDiv.removeChild(taskCardsDiv.firstChild);
    }

    console.log("Content cleared.");
}

function refreshContent() {
    // refresh task list on the side menu
    refreshSideMenuProjects();

    // clear all current tasks from main content
    clearMainContent();
}

function deleteProject() {
    
}