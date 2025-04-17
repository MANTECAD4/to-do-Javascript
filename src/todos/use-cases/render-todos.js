import { Todo } from "../models/todo.model";
import { createTodoHTML, noTodos } from "./create-todo-html";

let element;

/**
 * Receives a reference to the todo's HTML container and 
 * renders the todo items
 * @param {String} elementId
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = [], currentFilter ) => {

    // TODO: Referencia
     if (!element)
        element = document.querySelector( elementId );

     if (!element) throw new Error (`Element ${elementId} not found`);
    
    element.innerHTML = '';
    if (todos.length === 0){
        element.append( noTodos( currentFilter ) );
    }
    else {
       todos.forEach( todo => {
            element.append( createTodoHTML( todo ) );
        }); 
    }
}