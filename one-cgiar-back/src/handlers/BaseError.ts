import { HttpStatusCode } from "./Constants";
import { logger } from "./Logger";

class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;

    constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

//free to extend the BaseError
class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error')
    {
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