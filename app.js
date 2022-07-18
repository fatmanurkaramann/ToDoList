const addToList = document.querySelector(".button")
const toDoList = document.querySelector("#list")
const text = document.querySelector("#task") //input

const deleteToDo = (e) => {
    const todo = e.target.parentElement;
    const text = todo.firstChild.textContent;
    console.log(text)
    let todos = JSON.parse(localStorage.getItem("todos"))
    todos = todos.filter(td => td.text != text)
    todo.remove()

    localStorage.setItem("todos", JSON.stringify(todos))

}
const doneTodo = (e) => {
    const todo = e.target.parentElement
    const text = todo.firstChild.textContent;

    let todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach(todo => {
        e.target.tagName = text
        todo.isCompleted = !todo.isCompleted
    if (todo.isCompleted == true) {
        e.target.classList.toggle('checked')
    }
        
    });
    
    console.log(todos)
    localStorage.setItem("todos", JSON.stringify(todos));
}

const addItem = (todo) => { //todo
    let liDom = document.createElement("li")

    liDom.innerHTML = `${todo.text}`
    liDom.classList.add("list-group-item", "success");
    toDoList.append(liDom)

    let span = document.createElement("span")
    let text = document.createTextNode("\u00D7")
    span.className = "close"
    span.appendChild(text)
    liDom.append(span)
    toDoList.className = "";
    span.addEventListener("click", deleteToDo)
    liDom.addEventListener("click", doneTodo)

}

const startConf = () => {
    // baslangic ayarlari

    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos) {
        localStorage.setItem("todos", JSON.stringify([]));
    } else {
        todos.forEach(todo => {
            addItem(todo);
        });
    }
}
const toast = document.getElementById("liveToast")
function added(event) {
    event.preventDefault()

    if (text.value == '') { // boş değer girilmeye çalışıyor ise hata veriyoruz
        toast.className = "show"
        setTimeout(() => {
            text.style.borderColor = 'transparent';
        }, 2500);
        return false;
    }
    const todo = {
        text: text.value,
        isCompleted: false
    }

    const todos = JSON.parse(localStorage.getItem("todos"))
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
    console.log(todos)

    addItem(todo)
    text.value = ""


}
startConf();

addToList.addEventListener("click", added)



