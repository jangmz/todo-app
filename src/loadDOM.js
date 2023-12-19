export function loadDOM() {
    const container = document.querySelector(".container");

    const content = document.createElement("div");
    const sideMenu = document.createElement("div");
    const buttonsArea = document.createElement("div"); // buttons for creating todo and creating project
    const createTodoButton = document.createElement("button");

    content.classList.add("content");
    sideMenu.classList.add("side-menu");
    buttonsArea.classList.add("buttons-area");

    createTodoButton.textContent = "Add new task";
    createTodoButton.addEventListener("click", loadDialogWindow);

    buttonsArea.appendChild(createTodoButton);

    sideMenu.appendChild(buttonsArea);
    container.appendChild(sideMenu);
    container.appendChild(content);
    
    console.log("DOM loaded");
}

function loadDialogWindow() {
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
    
    // closing the dialog window
    dialogCloseIcon.addEventListener("click", () => {
        dialog.close();
    });

    dialogHead.appendChild(dialogTitle);
    dialogHead.appendChild(dialogCloseIcon);
    dialog.appendChild(dialogHead);
    dialog.appendChild(generateAddTodoForm());

    container.appendChild(dialog);

    dialog.showModal();
}

function generateAddTodoForm() {
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
                break;
            case "textarea":
                input = document.createElement("textarea");
                break;
            case "date":
                input = document.createElement("input");
                input.type = "date";
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
            case "checkbox":
                input = document.createElement("input");
                input.type = "checkbox";
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

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Create To-Do";

    form.appendChild(submitButton);

    console.log("Created Form")
    return form;
}

function saveNewTaskData() {
    // logic for displaying/saving inputed data
}