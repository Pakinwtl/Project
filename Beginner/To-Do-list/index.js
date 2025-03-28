let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");

function addtask() {
  const task = todoInput.value;
  if (task === "") {
    alert("Please enter a task");
    return;
  }
  if (task !== "") {
    todo.push({ task: task, isDone: false });
    localStorage.setItem("todo", JSON.stringify(todo));
    render();
  }
}
