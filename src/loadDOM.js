import { gatherFormDataTodo, logData, saveFormDataProject, deleteProject } from "./index.js";
import { MyProjects } from "./index.js";
import { ToDo } from "./todoModule.js";
import closeIcon from "./assets/icons/close.png";

// loads the initial HTML
export function loadDOM() {
    const container = document.querySelector(".container");
    const dialog = createTaskDialog(); // dialog for a new todo
    const dialog2 = createProjectDialog(); // dialog for a new project
    const modifyTodoDialog = createOpenTaskDialog(); // dialog for modifying / opening todo

    const content = document.createElement("div");
    const contentHeading = document.createElement("div");
    const taskCards = document.createElement("div");
    const sideMenu = document.createElement("div");
    const sideMenuQuote = document.createElement("h3");
    const projectsArea = createProjectsSideMenu(); // where projects will be displayed on the side menu
    const buttonsArea = document.createElement("div"); // buttons for creating todo and creating project
    const newTodoButton = document.createElement("button");
    const newProjectButton = document.createElement("button");

    content.classList.add("content");
    contentHeading.classList.add("content-heading");
    taskCards.classList.add("task-cards");
    sideMenu.classList.add("side-menu");
    buttonsArea.classList.add("buttons-area");
    sideMenuQuote.classList.add("side-menu-quote");

    contentHeading.textContent = "Create your first To-do/Project by clicking the button on the left side menu.";

    sideMenuQuote.textContent = "Don't put off until tomorrow what you can do today.";

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

    sideMenu.appendChild(sideMenuQuote);
    sideMenu.appendChild(projectsArea);
    sideMenu.appendChild(buttonsArea);
    content.appendChild(contentHeading);
    content.appendChild(taskCards);
    container.appendChild(modifyTodoDialog);
    container.appendChild(sideMenu);
    container.appendChild(content);
    
    console.log("DOM loaded");
}

// generates HTML dialog for adding new task
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

// generates a form for adding new todo
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
                input.value = "Test title";
                break;
            case "textarea":
                input = document.createElement("textarea");
                // temporary 
                input.value = "This dscription is a test";
                break;
            case "date":
                input = document.createElement("input");
                input.type = "date";
                // temporary 
                input.value = "2024-09-23";
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
        console.log( e.target.projectTitle.value);
        refreshSideMenuProjects();

        // display content of the project you just added a task to
        // parameter is the project object that compared to the project title you added a task to
        displayProjectTasks(MyProjects.filter(project => project.title.toLowerCase() === e.target.projectTitle.value)[0]);

        dialog.close();
        //form.reset(); -> enable when finished
    });

    console.log("To-do form created");
    return form;
}

function createOpenTaskDialog() {
    const container = document.querySelector(".container");
    const dialog = document.createElement("dialog");
    const modalDiv = document.createElement("div");
    const dialogHead = document.createElement("div");
    const dialogTitle = document.createElement("h1");
    const dialogCloseIcon = document.createElement("img");
    const basicForm = document.createElement("form");

    dialog.id = "open-todo-dialog";
    basicForm.id = "open-todo-form";

    modalDiv.classList.add("modal");
    dialogHead.classList.add("modal-head");
    dialogTitle.textContent = "To Do";
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
    modalDiv.appendChild(basicForm);

    dialog.appendChild(modalDiv);
    container.appendChild(dialog);

    return dialog;
}

// generates form fields for task modification/open
function generateTodoFormFields(task) {
    // returns array of fields
    let inputFields = [];

    const priorityChoice = ["High", "Medium", "Low"]

    // fields in form
    const fields = [
        { label: "Title", type: "text", name: "title", required: true },
        { label: "Description", type: "textarea", name: "description" },
        { label: "Due Date", type: "date", name: "dueDate", required: true },
        { label: "Priority", type: "select", name: "priority", options: priorityChoice, required: true },
        { label: "Check list", type: "text", name: "checklist" },
        { label: "Project title", type: "select", name: "projectTitle", options: MyProjects },
        { label: "Done", type: "checkbox", name: "finished" }
    ];

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
                input.value = task.title;
                break;
            case "textarea":
                input = document.createElement("textarea");
                input.value = task.description;
                break;
            case "date":
                input = document.createElement("input");
                input.type = "date";
                input.value = task.dueDate;
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

                    if (option.title === task.project.title) {
                        optionElement.setAttribute("selected", true);
                    }

                    input.appendChild(optionElement);
                    
                });                
                break;
            case "checkbox":
                input = document.createElement("input");
                input.type = field.type;
                input.value = task.done;
        }

        input.id = field.name;
        input.name = field.name;
        input.required = field.required;

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(input);
        inputFields.push(fieldDiv);
    });

    console.log("Input fields generated for To Do dialog form");
    return inputFields;
}

// generates HTML dialog for adding new project
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

// generates a form for adding a project
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

// displays todo on the main content area
export function displayTask(task) {
    // display tasks on main content div
    const taskCardsDiv = document.querySelector(".task-cards");
    
    // create elements for the task
    const taskCard = document.createElement("div"); 
    const taskTitle = document.createElement("h2");
    const taskDueDate = document.createElement("h4");
    const taskDoneDiv = document.createElement("div");
    const taskDone = document.createElement("input");
    const taskDoneLabel = document.createElement("label");
    const deleteTaskBtn = document.createElement("button");

    // assign id from task to the div
    taskCard.id = task.id;

    // add class for css
    taskCard.classList.add("task-card");
    taskDoneDiv.classList.add("task-done");
    taskDone.classList.add("done-checkbox");

    // add values to elements
    taskTitle.textContent = task.title;
    taskDueDate.textContent = "Due date: " + task.dueDate;
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
    deleteTaskBtn.textContent = "Delete";

    // open dialog to see/edit details
    taskTitle.addEventListener("click", () => {
        displayTaskDialog(task);
    });

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
        task.project.deleteTaskFromProject(task.id);
        refreshContent();
        displayProjectTasks(task.project);
    });

    taskDoneDiv.appendChild(taskDone);
    taskDoneDiv.appendChild(taskDoneLabel);

    // append to card
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDueDate);
    taskCard.appendChild(taskDoneDiv);
    taskCard.appendChild(deleteTaskBtn);

    taskCardsDiv.appendChild(taskCard);

    console.log("To-do displayed!");
}

// open single todo dialog to see/edit details
function displayTaskDialog(task) {
    console.log("Clicked task id: " + task.id);
    // call to open dialog that already exists (same dialog for create task just change the form)
    const dialog = document.querySelector("#open-todo-dialog");
    const modal = dialog.querySelector(".modal");
    const form = document.querySelector("#open-todo-form");
    const inputFieldsArray = generateTodoFormFields(task);

    // clears the form so it can be reloaded with new information
    while (form.firstChild) {
        form.removeChild(form.firstChild);
    }

    inputFieldsArray.forEach(inputField => form.appendChild(inputField));

    // "update" button
    const updateButton = document.createElement("button");
    updateButton.type = "submit";
    updateButton.textContent = "Update To-Do";

    form.appendChild(updateButton);

    // when form is submitted
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        console.log("Updating the task ID "+ task.id + " in the projects array...");
        MyProjects.forEach(project => {
            if (project.title.toLowerCase() === e.target.projectTitle.value.toLowerCase()) {
                project.tasks.forEach(taskInProject => {
                    if (taskInProject.id === task.id) {
                        //let newTaskData = new ToDo (e.target.title.value, e.target.description.value, e.target.dueDate.value, e.target.priority.value, e.target.checklist.value); //e.target.projectTitle.value); //e.target.done.value);
                        taskInProject.updateData(e.target.title.value, e.target.description.value, e.target.dueDate.value, e.target.priority.value, e.target.checklist.value, e.target.finished.value);
                    } else {
                        console.log("Task not found!");
                    }
                })
                console.log(`Task in project -> ${project.title.toUpperCase()} <- has been updated!`);
                console.log(project);
            }
            console.log("Ven: " + project);
        });

        //refresh the side menu projects and tasks
        refreshSideMenuProjects();

        // display content of the project in which this task is saved
        // parameter is the project object that compared to the project title you added a task to
        displayProjectTasks(MyProjects.filter(project => project.title.toLowerCase() === e.target.projectTitle.value)[0]);

        dialog.close();
    });

    form.appendChild(updateButton);
    modal.appendChild(form);
    
    dialog.showModal();
}

// displays all projects and tasks of a project on the side menu
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

// refreshes the list of projects and tasks on the side menu
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

// adds project option to the form when new project is created
function refreshFormOptions() {
    const dialogProjectOptions = document.getElementById("projectTitle");

    // clears the current options
    while (dialogProjectOptions.firstChild) {
        dialogProjectOptions.removeChild(dialogProjectOptions.firstChild);
    }

    // goes through MyProjects array and displays all active projects
    MyProjects.forEach(project => {
        let newOptionElement = document.createElement("option");
        newOptionElement.value = project.title.toLowerCase();
        newOptionElement.textContent = project.title;
        dialogProjectOptions.appendChild(newOptionElement);
    });

    /*
    newOptionElement.value = MyProjects[MyProjects.length - 1].title.toLowerCase();
    newOptionElement.textContent = MyProjects[MyProjects.length - 1].title;
    
    dialogProjectOptions.appendChild(newOptionElement);
    */
}

// clear the main content
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

// refresh side menu and clear main content
export function refreshContent() {
    // refresh task list on the side menu
    refreshSideMenuProjects();

    // updates the form project options for adding new todo
    refreshFormOptions();

    // clear all current tasks from main content
    clearMainContent();
}