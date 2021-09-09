// selectors
const inputBox = document.querySelector(".todo__input");
const todoItems = document.querySelector(".todo__items");
const toggleShowInputBox = document.querySelector(".show__input");
const radioGroup = Array.from(document.querySelectorAll("input[type=radio]"));

console.log(radioGroup);

let todos = [];


const appendToParent = (parent,child) => {
    parent.appendChild(child);
}

const toggleStrikeTodoItem = (e) => {
    const todoItem = e.target.nextSibling;
    todoItem.classList.toggle("item--checked");
        const i = todos.findIndex(todo => todo.item === e.target)
        todos[i].strike = !todos[i].strike;
}

const createTodoItem = (todoItemText) => {
    // create li
    let todoItem = document.createElement("li");
    todoItem.classList.add("todo__item")
    // create input
    let itemCheckbox = document.createElement("input");
    itemCheckbox.setAttribute("type", "checkbox");
    itemCheckbox.classList.add("todo__checkbox");
    // create para
    let itemText = document.createElement("p");
    itemText.classList.add("todo__item--text");
    itemText.innerText = todoItemText;
    // addevent to input
    itemCheckbox.addEventListener("change",toggleStrikeTodoItem)
    // append to parent
    appendToParent(todoItem,itemCheckbox);
    appendToParent(todoItem,itemText);
    appendToParent(todoItems,todoItem);
    // push it to todos
    todos.push({todoText: todoItemText,strike:itemCheckbox.checked,item:itemCheckbox,todoItem});
}

const addTodoItem = (e) => {
    let todoItemText = e.target.value;
    createTodoItem(todoItemText);
    e.target.value = "";
}

inputBox.addEventListener('change', addTodoItem);
toggleShowInputBox.addEventListener("click",(e) => {
    inputBox.classList.toggle("input__none");
});
radioGroup.forEach((elem,index) => {
    elem.addEventListener("change",(e) => {
        while (todoItems.lastChild) {
            todoItems.removeChild(todoItems.lastChild);
        }
        if(e.target.value === "all") {
         todos.forEach((todo,index) => {
             appendToParent(todoItems,todo.todoItem);
         }) ; 
        } else if(e.target.value === "active") {
            const filtered = todos.filter((todo,index) => todo.strike === false);
            filtered.forEach((todo,index) => {
                appendToParent(todoItems,todo.todoItem);
            }) ; 
        } else {
            const filtered = todos.filter((todo,index) => todo.strike === true);
            filtered.forEach((todo,index) => {
                appendToParent(todoItems,todo.todoItem);
            }) ; 
        }
    })
})