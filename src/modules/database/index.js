import { Dispatcher } from "thorino-ipc";
/* The line `export const database = Dispatcher( 'database.service' );` is creating a dispatcher object
named `database` using the `Dispatcher` function from the `thorino-ipc` library. The dispatcher
object is used to send and receive messages between different parts of the application. In this
case, the dispatcher is named `'database.service'`. */
export const database = Dispatcher('database.service');
/**
 * The function `insert` takes in a single object or an array of objects and inserts it into a
 * database.
 * @param {Record<string,any>|Record<string,any>[]} data - The parameter `data` can be either a single
 * object of type `Record<string, any>` or an array of objects of type `Record<string, any>`.
 * @returns the result of calling the `database` function with the arguments `'insert'` and
 * `JSON.stringify(data)`.
*/
export const insert = (data) => {
    return database('insert', data);
};
export const find = (data) => {
    return database('find', data);
};
export const update = (update) => {
    return database('update', update);
};
export const findPage = (data) => {
    return database('find-page', data);
};
export const findAllPages = () => {
    return database('find-all-pages', {});
};
export const createPage = (data) => {
    return database('create-page', data);
};
//# sourceMappingURL=index.js.map