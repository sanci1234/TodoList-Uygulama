// Tüm Elementleri Seçmek
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();
function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click",removeTodoUI);
  clearButton.addEventListener("click",allTodosEverywhere);
  filterInput.addEventListener("keyup",filter);
}
function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function(todo) {
    addTodoToUI(todo);
  })  
}
function filter(e){
  //Buradaki e yi değer aldığımız yerlerde kullanıyoruz.Aşağıdaki toLowerCase ve trim metodlarını da küçük büyük harf ve boşluk sıkıntıları olursa diye kullanıyoruz.
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");
  if(todoListesi.length>0){
    todoListesi.forEach(function(todo){
      if(todo.textContent.toLowerCase().trim().includes(filterValue)){
        todo.setAttribute("style","display : block");
      }else{
        todo.setAttribute("style","display : none !important");
      }
    })
  }else{
    showAlert("warning","Filtreleme yapmak için en az 1 todo olmalıdır. ")
  }
}
function allTodosEverywhere(){
  const allDeleteTodos = document.querySelectorAll(".list-group-item")
  if(allDeleteTodos.length > 0){
    //Ekrandan silme
    allDeleteTodos.forEach(function(todo){
      todo.remove();
    })
    //Storage'dan silme
    todos=[];
    localStorage.setItem("todos",JSON.stringify(todos));
    showAlert("success","Başarılı bir şekilde silindi.")
  }else{
    showAlert("warning","Silmek için en az bir todo olmalıdır.")
  }
  console.log(allDeleteTodos);
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
function removeTodoUI(e){
  if(e.target.className === "fa fa-remove"){
    //Ekrandan Silmek
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    //Storage'dan Silmek
    removeTodoToStorage(todo.textContent);
    showAlert("success", "Todo başarıyla silindi ! ")
  }
  // Eklediğimiz silme işini su şekilde yaptık ; 
  //İlk olarak ekledğimiz todolar ikinci cardbody de oldugundan ikinci cardbody ı seçip click metodu ile tıklandıgında removeTodoUI çalıştır dedik.Sonra removeTodoUI ile ilgili functıon olusturup içine e koyduk.Daha sonra sileceğimiz yerı seçmek için i 'nin className nı aldık.Ona if metodunu uyguladık.Daha sonra i ye basınca bütün hepsının gitmesi için parentElement ile onun üstünü aldık.Daha sonra todo ya atadık ve todo.remove diyerek kaldırdık.Tabi bunlar local storage da kaldıgı için silsekte tekrar gelecek Şimdi ise localden kaldıralım.
}
function removeTodoToStorage(removeTodo){
checkTodosFromStorage();
todos.forEach(function(todo,index){
  if(removeTodo===todo){
    todos.splice(index,1);
  }
});
localStorage.setItem("todos",JSON.stringify(todos))

//Eklediğimizi Local'den silme kalıcı hale getirme; İlk olarak removeTodoUI içinde removeTodoToStorage adlı bir metod olusturup içine de todo'nun textContent ini atadık.Daha sonra removeTodoToStorage adlı functıon olusturup removeTodo koyduk.Bu removetodo aslında aldıgımız textContent ı  temsıl edıyor gibi birşey.Daha sonra checkTodosFromStorage çalıştırıp güncel halını aldık ve todos u foreach ile döndük.Daha sonra if metodu olusturduk ve removeTodo eşitse todo ya dedik.Yani textContent eşitse todo nun içindeki o ekledıgımız yazılara sil dedik.Daha sonra da bunu local storage set ettık .
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