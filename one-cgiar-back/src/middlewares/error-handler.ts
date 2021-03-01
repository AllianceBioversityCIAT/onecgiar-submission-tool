import { APIError, BaseError } from "../handlers/BaseError";
import { logger } from "../handlers/Logger";

class ErrorHandler {
    public async handleError(err: Error): Promise<void> {
        console.log('handleError ')
        await logger.error(
            'Error message from the centralized error-handling component',
            err,
        );
        // await sendMailToAdminIfCritical();
        // await sendEventsToSentry();
    }

    public isTrustedError(error: Error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}
export const errorHandler = new ErrorHandler();