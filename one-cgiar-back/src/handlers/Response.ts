import { ParseError } from "got/dist/source";
import { Response } from 'express'
import { getRepository } from "typeorm";
import { InitiativesByUsers } from "../entity/InititativesByUsers";
import { APIError } from "./BaseError";
import { HttpStatusCode } from "./Constants";

export class ResponseHandler {
    private response;
    private title;
    constructor(title: string, response: {} | ParseError, userInitiativeRole?: [] | {}) {
        this.response = this.getMetada(response);
        this.title = title;
    }

    private getMetada(response: {}) {
        // read object properties
        // for (const key in response) {
        //     if (Object.prototype.hasOwnProperty.call(response, key)) {
        //         const element = response[key];
        //         console.log(key)
        //     }
        // }
        return response
    }

}