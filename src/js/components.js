//imports
import { Todo } from '../classes/';
import { todoList } from '../index';


//references
const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnClearAllCompleted = document.querySelector(".clear-completed");
const ulFilters = document.querySelector(".filters");



export const createTodoHtml = (todo) => {
    const todoHtml = `
    <li class="${(todo.completed) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completed) ? 'checked' : ''}>
            <label>${todo.task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a todoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = todoHtml;
    divTodoList.append(div.firstElementChild);
    return div;
}


//Events

//type a new to do
txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const newTodo = new Todo(txtInput.value)
        todoList.newTodo(newTodo);
        createTodoHtml(newTodo);
        txtInput.value = '';
    }
});


//completed or remove a to do from the list
divTodoList.addEventListener('click', (event) => {
    const elementName = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');
    if (elementName.includes('input')) {
        todoList.markAsCompleted(todoId);
        todoElement.classList.toggle('completed');
    } else if (elementName.includes('button')) {
        todoList.removeTodo(todoId);
        divTodoList.removeChild(todoElement);
    }
});

//remove all completed to do's

btnClearAllCompleted.addEventListener('click', () => {
    todoList.clearAllCompleted();
    for (let i = divTodoList.children.length - 1; i >= 0; i -= 1) {
        const element = divTodoList.children[i];
        if (element.classList.contains('completed')) {
            divTodoList.removeChild(element);
        }
    }

})

//apply filters
ulFilters.addEventListener('click', (event) => {

    // ulFilters.children.forEach(element => {
    //     console.log(element);
    // });
    const filter = event.target.text;
    if (!filter) { return };
    for (const element of ulFilters.children){
        element.firstElementChild.classList.remove('selected');
        if(filter==element.firstElementChild.id){
            element.firstElementChild.classList.add('selected');
        }
    }
    for (const element of divTodoList.children) {
        element.classList.remove('hidden')
        const completed = element.classList.contains('completed');
        switch (filter) {
            case 'Active':
                if (completed) {
                    element.classList.add('hidden');
                } break;
            case 'Completed':
                if (!completed) {
                    element.classList.add('hidden');
                } break;
            default:
                break;
        }
    }

});