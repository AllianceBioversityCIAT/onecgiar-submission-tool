import { HttpStatusCode } from "../interfaces/Constants";
import { logger } from "./Logger";

class BaseError extends Error {
    public readonly name: string;
    public readonly description: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;

    constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.description = description;

        Error.captureStackTrace(this);
    }
}




class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
        super(name, httpCode, description, isOperational);
        logger.error(
            name,
            {
                httpCode,
                description,
                isOperational
            }
        );
    }

}

export { APIError, BaseError }