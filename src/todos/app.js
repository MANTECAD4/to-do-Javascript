import html from './app.html?raw';
import todoStore, { Filters }  from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases/index.js';


const ElementIDs = {
    ClearCompleted : '.clear-completed',
    TodoList: '.todo-list',
    TodoInput: '#new-todo-input',
    FiltersTodo: '.filtro',
    PendingCounter : '#pending-count',
}


/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {
    
    const updatePendingCtn = () => {
        renderPending(ElementIDs.PendingCounter);
    }
    /**
     * Displays todos list
     */
    const displayTodos = () => {
            const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
            renderTodos( ElementIDs.TodoList, todos, todoStore.getCurrentFilter() );
            updatePendingCtn();
    }



    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector( elementId ).append(app);
        displayTodos();
    })();

    // HTML References
    const newTodoInput = document.querySelector(ElementIDs.TodoInput);
    const todoListUL = document.querySelector( ElementIDs.TodoList);
    const clearCompletedBtn = document.querySelector(ElementIDs.ClearCompleted); 
    const filtersTodoLIs = document.querySelectorAll(ElementIDs.FiltersTodo); 
    // Listeners
    newTodoInput.addEventListener('keyup', ( event ) => {
        
        if ( event.keyCode !== 13) return;
        if ( event.target.value.trim().length === 0 ) return;
        
        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    /**
     * Listens for click events on any element inside the UL todo list.
     * Finds the closest parent with a [data-id] attribute,
     * toggles the corresponding todo, and re-renders the list.
     */
    todoListUL.addEventListener('click', (event) => {
        // Find the nearest parent element with the [data-id] attribute
        const parentElement = event.target.closest('[data-id]');
        todoStore.toggleTodo(parentElement.getAttribute('data-id'));
        displayTodos();
    });
    
    /**
     * Deletes a specific To-do
     */
    todoListUL.addEventListener('click', (event) => {
        if ((event.target.tagName === 'BUTTON' && event.target.classList.contains('destroy')) ){
            const parentElement = event.target.closest('[data-id]');
            if ( !parentElement ) throw new Error('Parent element with data-id attribute not found.');
            todoStore.deleteTodo(parentElement.getAttribute('data-id'));
            displayTodos();
        }
        else {
            return;
        }     
    });

    /**
     * Deletes all completed to-dos
     */
    clearCompletedBtn.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    /**
     * Sets up the to-dos filter depending the selected ption
     */
    filtersTodoLIs.forEach( element => {
        element.addEventListener( 'click', () => {
            filtersTodoLIs.forEach( el => el.classList.remove('selected'));
            element.classList.add('selected');
            switch(element.getAttribute('id')){
                case 'all-filter':
                    todoStore.setFilter(Filters.all);
                break;
                case 'completed-filter':
                    todoStore.setFilter(Filters.completed);
                break;
                case 'pending-filter':
                    todoStore.setFilter(Filters.pending);
                break;
            }
            displayTodos();
        });
    });
}

// TODO: validar el cambio de estado To-Dos cuando se tienen activos los diferentes filtros.