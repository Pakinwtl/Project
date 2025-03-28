let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButtin = document.getElementById("addBtn");
const deleteallButton = document.getElementById("deleteBtn");

document.addEventListener("DOMContentLoaded", () => {
  addButtin.addEventListener("click", addtask);
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addtask();
    }
  });

  deleteallButton.addEventListener("click", deteleall);

  render();
});

function addtask() {
  const task = todoInput.value;
  if (task === "") {
    alert("Please enter a task");
    return;
  }
  if (task !== "") {
    todo.push({ task: task, isDone: false });
    SavetolocalStorage();
    todoInput.value = "";
    render();
  }
}

function render() {
  todoList.innerHTML = "";
  todoCount.textContent = todo.length;
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
        <input type="checkbox" id="input-${index}" ${
      item.isDone ? "checked" : ""
    }>
        <p id=todo-${index} class="${item.isDone ? "isDone" : ""}">${
      item.task
    }</p>
    <button id="delete-${index}" onclick="deleteTask(${index})">Delete</button>
    <button id="edit-${index}" onclick="editTask(${index})">Edit</button>
      `;
    p.querySelector(`#input-${index}`).addEventListener("change", () => {
      toggle(index);
    });
    todoList.appendChild(p);
  });
}

function toggle(index) {
  todo[index].isDone = !todo[index].isDone;
  SavetolocalStorage();
  render();
}

function deleteTask(index) {
  const deletebtn = document.getElementById(`delete-${index}`);
  deletebtn.addEventListener("click", () => {
    todo.splice(index, 1);
    SavetolocalStorage();
    render();
  });
}

function editTask(index) {
  const editbtn = document.getElementById(`edit-${index}`);
  editbtn.addEventListener("click", () => {
    const inputElement = document.createElement("input");
    const existingtask = todo[index].task;
    inputElement.value = existingtask;
    const pElement = document.getElementById(`todo-${index}`);
    pElement.replaceWith(inputElement);
    inputElement.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        todo[index].task = inputElement.value;
        SavetolocalStorage();
        render();
      }
    });
  });
}

function deteleall() {
  todo = [];
  SavetolocalStorage();
  render();
}

function SavetolocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
