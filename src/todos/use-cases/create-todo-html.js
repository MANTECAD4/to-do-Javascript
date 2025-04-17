import { Todo } from "../models/todo.model";

/**
 * 
 * @param {Todo} todo 
 * @returns 
 */
export const createTodoHTML = ( todo ) => {

    if(!todo) throw new Error('Todo object is required.');

    const { done, description, id } = todo;
    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ done ? 'checked' : '' }>
            <label>${ description}</label>
            <button class="destroy"></button>
        </div>
    `;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id',id);
    if ( done ){
        liElement.classList.add('completed');
    }  

    return liElement;
}

/**
 * Returns an special element in case there are no ToDos
 * @returns HTMLElementLi
 */
export const noTodos = ( currentFilter ) => {
    
    let html;
    switch (currentFilter){
        case 'all':
            html =  `
                <div class="view">
                    <label>Yay! No tasks left to-do! 😌☁️🛋️</label>
                </div>
            `;
        break;
        case 'pending':
            html =  `
                <div class="view">
                    <label>No pending tasks found 🙌</label>
                </div>
            `;
        break;
        case 'completed':
            html =  `
                <div class="view">
                    <label>Nothing completed yet. Keep going! 💪</label>
                </div>
            `;
        break;
        default:
            throw new Error(`Filter ${currentFilter} is not valid.`);    
        break;

    }
    
    const liElement = document.createElement('li');
    liElement.innerHTML = html;

    return liElement;
}