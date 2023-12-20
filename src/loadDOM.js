import { gatherFormData } from "./index.js";

export function loadDOM() {
    const container = document.querySelector(".container");

    const content = document.createElement("div");
    const taskCards = document.createElement("div");
    const sideMenu = document.createElement("div");
    const buttonsArea = document.createElement("div"); // buttons for creating todo and creating project
    const newTodoButton = document.createElement("button");
    const newProjectButton = document.createElement("button");

    content.classList.add("content");
    taskCards.classList.add("task-cards");
    sideMenu.classList.add("side-menu");
    buttonsArea.classList.add("buttons-area");

    newTodoButton.textContent = "Add new to-do";
    newTodoButton.addEventListener("click", newTaskDialog);
    newProjectButton.textContent = "Add new project";
    newProjectButton.addEventListener("click", () => {
        console.log("Not yet functional");
    })

    buttonsArea.appendChild(newTodoButton);
    buttonsArea.appendChild(newProjectButton);

    sideMenu.appendChild(buttonsArea);
    content.appendChild(taskCards);
    container.appendChild(sideMenu);
    container.appendChild(content);
    
    console.log("DOM loaded");
}

function newTaskDialog() {
    const container = document.querySelector(".container");
    const dialog = document.createElement("dialog");
    const dialogHead = document.createElement("div");
    const dialogTitle = document.createElement("h1");
    const dialogCloseIcon = document.createElement("img");

    dialog.classList.add("modal");
    dialogHead.classList.add("modal-head");
    dialogTitle.textContent = "New Task Entry";
    dialogCloseIcon.classList.add("close-icon");
    dialogCloseIcon.id = "close";
    //dialogCloseIcon.src = "assets/icons/close-circle.svg"; // get from library project
    
    // closing the dialog window -> does not work yet
    dialogCloseIcon.addEventListener("click", () => {
        dialog.close();
    });

    dialogHead.appendChild(dialogTitle);
    dialogHead.appendChild(dialogCloseIcon);
    dialog.appendChild(dialogHead);

    const addTodoForm = generateAddTodoForm(dialog);
    dialog.appendChild(addTodoForm);

    container.appendChild(dialog);

    dialog.showModal();
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
        // { label: "Project title", type: "select", name: "projectTitle", options: /* automatically show created projects here */"" },
        { label: "Finished", type: "checkbox", name: "finished" }
    ];

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Create To-Do";

    // form creation
    fields.forEach(field => {
        // create label for input
        const label = document.createElement("label");
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
                // temporary 
                input.value = "high";
                break;
            case "checkbox":
                input = document.createElement("input");
                input.type = "checkbox";
                input.value = false;
                break;
        }

        input.id = field.name;
        input.name = field.name;

        if (field.required) {
            input.required = true;
        }

        form.appendChild(label);
        form.appendChild(input);
    });

    // when form is submitted
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // gather all the input data and create a todo object, display todo on the DOM
        displayTask(gatherFormData());

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
    const taskFinished = document.createElement("h4");

    // add class for css
    taskCard.classList.add("task-card");

    // add values to elements
    taskTitle.textContent = task.title;
    taskDescr.textContent = task.description;
    taskDueDate.textContent = task.dueDate;
    taskPriority.textContent = task.priority;
    taskSubTask.textContent = task.checklist;
    taskFinished.textContent = `Finished: ${task.finished}`;

    // append to card
    checklist.appendChild(taskSubTask);
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDescr);
    taskCard.appendChild(taskDueDate);
    taskCard.appendChild(taskPriority);
    taskCard.appendChild(checklist);
    taskCard.appendChild(taskFinished);

    taskCardsDiv.appendChild(taskCard);
    contentDiv.appendChild(taskCardsDiv);

    console.log("To-do displayed!");
}