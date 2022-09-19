const input = document.querySelector(".input-text");
const addForm = document.querySelector(".add-form");
const taskList = document.querySelector(".task-list")
const deleteBtn = document.querySelector(".delete-all-btn");


let task = JSON.parse(localStorage.getItem("tasks")) || [];





const saveLocalStorage = (taskList) => {

    localStorage.setItem("tasks", JSON.stringify(taskList));

}

const pintarLista = (lista) => {
    taskList.innerHTML = lista.map((task) => `<li> ${task.name} <img src="./trash.png" alt="boton para borrar" class="delete-btn" data-id="${task.taskID}" />  </li>`).join('');


}




const addTask = (e) => {
    e.preventDefault();

    const taskName = input.value.trim();

    if (taskName.length === 0) {
        alert("No puede dejar este campo vacio");
    }
    else if
        (
        task.some(tasks => tasks.name.toUpperCase() === taskName.toUpperCase())) {
        alert("Esa Tarea ya existe")
        return;

    }
    else {

        task = [...task, { name: taskName, taskID: task.length + 1 }];

        saveLocalStorage(task);
        input.value = "";

        pintarLista(task)
        ocultarBotonBorrarTareas()

    }

};
const deleteTask = (e) => {
    if (!e.target.classList.contains("delete-btn")) {
        return;
    }
    const id = +e.target.dataset.id;
    task = task.filter((tasks) => tasks.taskID !== id);
    saveLocalStorage(task);
    pintarLista(task);
    ocultarBotonBorrarTareas();
    corregirID();

}

const corregirID = () => {
    let fix = 1;
    task = task.map(tasks => {
        // fix = tasks.taskID;
        if (tasks.taskID === fix) {
            fix++;
        }
        else {
            tasks.taskID = fix;
            fix++;
        }

        return tasks;

    })
    saveLocalStorage(task)

}

const deleteAll = () => {
    task = [];
    pintarLista(task)
    localStorage.removeItem("tasks");
    ocultarBotonBorrarTareas();

}

ocultarBotonBorrarTareas = () => {
    if (task.length === 0) {
        deleteBtn.classList.add("hidden")
        return;
    }
    else {

        deleteBtn.classList.remove("hidden")
    }

}

const init = () => {

    pintarLista(task);

    addForm.addEventListener("submit", addTask);
    taskList.addEventListener("click", deleteTask);
    deleteBtn.addEventListener("click", deleteAll)
    ocultarBotonBorrarTareas()
};

init();