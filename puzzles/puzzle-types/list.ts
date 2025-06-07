import CryptographBase from "./base";

/**
 * Rough Draft Unfinished
 * Example: U.S. Presidents who have been impeached
 */
class List extends CryptographBase {
    setup: string

    constructor(setup: string, elements: string[],) {
        // @ts-ignore
        super(elements, "List")
        this.setup = setup
    }
}

export { List };
