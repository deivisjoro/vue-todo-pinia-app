
export default class Task{
    constructor( description ){
        this.id = Date.now() + Math.round((Math.random() * 1000));
        this.description = description;
        this.done = false;
        this.created = Date.now();
        this.updated = Date.now();
    }
}