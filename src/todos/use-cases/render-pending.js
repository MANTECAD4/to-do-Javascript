import todoStore, { Filters } from "../../store/todo.store";
let element;
/**
 * Renders the pending to-dos counter
 * @param {String} elementId Pending counter HTML element ID
 */
export const renderPending = ( elementId ) => {

    if (!element)
        element = document.querySelector( elementId );

     if (!element) throw new Error (`Element ${elementId} not found`);
    
    element.innerHTML = todoStore.getTodos(Filters.pending).length; 
}