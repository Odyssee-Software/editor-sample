import { Page } from 'editor-page-types';
export declare const database: <response>(event: string, message: string | Record<string, any>) => Promise<CustomEvent<response>>;
/**
 * The function `insert` takes in a single object or an array of objects and inserts it into a
 * database.
 * @param {Record<string,any>|Record<string,any>[]} data - The parameter `data` can be either a single
 * object of type `Record<string, any>` or an array of objects of type `Record<string, any>`.
 * @returns the result of calling the `database` function with the arguments `'insert'` and
 * `JSON.stringify(data)`.
*/
export declare const insert: (data: Page | Page[]) => Promise<CustomEvent<Page>>;
export declare const find: (data: Page | Page[]) => Promise<CustomEvent<Page[]>>;
export declare const update: (update: {
    search: Partial<Page>;
    insert: Partial<Page> | Partial<Page>[];
}) => Promise<CustomEvent<Page>>;
export declare const findPage: (data: Partial<Page> | Partial<Page>[]) => Promise<CustomEvent<Page[]>>;
export declare const findAllPages: () => Promise<CustomEvent<Page[]>>;
export declare const createPage: (data: Partial<Page>) => Promise<CustomEvent<Page>>;
