import { v4 as uuid } from 'uuid';

export class Todo {

    description = '';

    /**
     * Creates a new Todo instance 
     * @param {String} description  
     */
    constructor ( description ) {
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }

}