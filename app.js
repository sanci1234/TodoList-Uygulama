// Tüm Elementleri Seçmek
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#todoClearButton");
let todos = [];

runEvents();
function runEvents() {
  form.addEventListener("submit", addTodo);
}
function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    showAlert("danger", "Lütfen boş bırakmayınız")
  } else {
    //Arayüze ekleme
    addTodoToUI(inputText);
    //Storage ekleme
    addTodoStorage(inputText);
    showAlert("success","Todo Eklendi");
  }

  e.preventDefault(); // farklı bir sayfaya gitmesini engellemek demek.
}
function addTodoToUI(newTodo) {
  /*
<li class="list-group-item d-flex justify-content-between">Todo 1
                          <a href="#" class="delete-item">
                              <i class="fa fa-remove"></i>
                          </a>
                      </li>
                      */
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = "";
}
function addTodoStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  /*
  <div class="alert alert-warning" role="alert">
  This is a warning alert—check it out!
</div>*/
  const div = document.createElement("div");
  //   div.className="alert alert-"+type;
  div.className = `alert alert-${type}`; //litirel template
  div.textContent = message;

  firstCardBody.appendChild(div);

  setTimeout(function(){
      div.remove();
  },2500);
}