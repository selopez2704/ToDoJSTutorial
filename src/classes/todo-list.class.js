import {Todo} from './'
export class TodoList{
    constructor(){
        this.loadLocalStorage();
        // this.todos=[];
    }
    newTodo(task){
        this.todos.push(task);
        this.saveLocalStorage();
    }
    removeTodo(id){
        this.todos=this.todos.filter(todo=>todo.id != id );
        this.saveLocalStorage();
    }
    markAsCompleted(id){
        for (const todo of this.todos){
            if (todo.id==id){
                todo.completed = !(todo.completed);
                this.saveLocalStorage();
                break;
            }
        }
    }
    clearAllCompleted(){
        this.todos=this.todos.filter(todo=>!todo.completed);
        this.saveLocalStorage();
    }

    saveLocalStorage(){
        localStorage.setItem('todo',JSON.stringify(this.todos));
    }
    loadLocalStorage(){
        console.log("calling loadStorage");
        this.todos=(localStorage.getItem('todo'))?JSON.parse(localStorage.getItem('todo')):[];
        this.todos=this.todos.map(object=>Todo.fromJson(object));
    }

}