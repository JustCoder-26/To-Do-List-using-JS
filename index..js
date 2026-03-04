const inputField = document.getElementById("input-field");
const addBtn = document.getElementById("btn");
const listItems = document.getElementById("list-items");

let todoList = []

function getTodoFromLs(){
  return JSON.parse(localStorage.getItem("todoKey")) || []
}

addBtn.addEventListener("click", () => {
  if (inputField.value === "") return;
  todoList = getTodoFromLs()
  todoList.push(inputField.value)
  saveTodo(todoList)
  const liElem = document.createElement("li");

  listItems.appendChild(liElem);

  liElem.innerHTML = inputField.value;

  inputField.value = "";

  deleteButton(liElem);
});

function deleteButton(liElem) {
  const deleteBtn = document.createElement("button");
  liElem.appendChild(deleteBtn);
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    const text = liElem.firstChild.textContent
    let todos = getTodoFromLs()
    todos = todos.filter((todo)=> todo !== text)
    saveTodo(todos)
    liElem.remove();
  });
}


function saveTodo(todo){
  return localStorage.setItem("todoKey" , JSON.stringify(todo))
}

function showTodo(){
  todoList = getTodoFromLs()
  todoList.forEach((curElem)=>{
    const liElem = document.createElement("li");
    listItems.appendChild(liElem);
    liElem.innerHTML = curElem;
    deleteButton(liElem);
  })
}

showTodo()