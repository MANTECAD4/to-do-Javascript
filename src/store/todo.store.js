import { Todo } from '../todos/models/todo.model.js';



export const Filters = {
    all: 'all',
    completed: 'completed',
    pending: 'pending',
}

const state = {
    todos: [],
    filter : Filters.all,
}

const initStore = () => {
   
    loadStore();
    console.log('InitStore 🍔');

}

/**
 * Writes the current state of the app into local storage 
 */
const saveStateToLocalStorage = () => {
    localStorage.setItem('state',JSON.stringify(state));
}


/**
 * 
 * Initializes the app by loading the data from local storage
 */
const loadStore = () => {
    if( !localStorage.getItem('state')) return;
    const { todos = [], filter = Filters.all } = JSON.parse( localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;
}

/**
 * Returns a list of to-dos according to the selected filter
 * @param {String} filter 
 * @returns Array<Todo>
 */
const getTodos = (  filter = Filters.all ) => {
    switch ( filter ){
        case Filters.all:
            return [ ...state.todos ];

        case Filters.completed:
            return state.todos.filter( todo => todo.done);

        case Filters.pending:
            return state.todos.filter( todo => !todo.done);

        default:
            throw new Error (`Option ${ filter } is not valid.`);
    }
}


/**
 * Adds a new to-do to the list
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if ( !description)
        throw new Error ('Description is required.');
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}

/**
 * Changes the state of a to-do
 * @param {String} todoId 
 */
const toggleTodo =  ( todoId ) => {

    state.todos = state.todos.map( todo =>{
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    } );
    saveStateToLocalStorage();
}


/**
 * Deletes a to-do
 * @param {String} todoId 
 */
const deleteTodo =  ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();
}

/**
 * Deletes all completed to-dos
 */
const deleteCompleted = () => {

    state.todos = state.todos.filter( todo => !todo.done);
    saveStateToLocalStorage();

}

/**
 * Sets up the new filter
 * @param {String} newFilter 
 */
const setFilter = ( newFilter = Filters.all ) => {
   if ( !Object.hasOwn( Filters, newFilter ) )
        throw new Error (`Option ${ newFilter } is not valid.`);
    state.filter = newFilter;
    saveStateToLocalStorage();
    
}

/**
 * Returns the current filter
 * @returns String
 */
const getCurrentFilter = () => {
    return state.filter;

}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore, 
    loadStore,
    setFilter,
    toggleTodo,
}