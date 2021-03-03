import { ParseError } from "got/dist/source";

export class ResponseHandler {
    private response;
    private title;
    constructor(title: string, response: {} | ParseError) {
        this.response = response;
        this.title = title;
    }

}