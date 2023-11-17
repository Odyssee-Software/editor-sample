import { TPage } from 'types-pages';
export declare const database: <response>(event: string, message: string | Record<string, any>) => Promise<CustomEvent<response>>;
/**
 * The function `insert` takes in a single object or an array of objects and inserts it into a
 * database.
 * @param {Record<string,any>|Record<string,any>[]} data - The parameter `data` can be either a single
 * object of type `Record<string, any>` or an array of objects of type `Record<string, any>`.
 * @returns the result of calling the `database` function with the arguments `'insert'` and
 * `JSON.stringify(data)`.
*/
export declare const insert: (data: TPage | TPage[]) => Promise<CustomEvent<TPage>>;
export declare const find: (data: TPage | TPage[]) => Promise<CustomEvent<TPage[]>>;
export declare const update: (update: {
    search: Partial<TPage>;
    insert: Partial<TPage> | Partial<TPage>[];
}) => Promise<CustomEvent<TPage>>;
export declare const findPage: (data: Partial<TPage> | Partial<TPage>[]) => Promise<CustomEvent<TPage[]>>;
export declare const findAllPages: () => Promise<CustomEvent<TPage[]>>;
export declare const createPage: (data: TPage) => Promise<CustomEvent<TPage>>;
