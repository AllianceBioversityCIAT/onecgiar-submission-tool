import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { ErrorService } from "@shared/services/error.service";
import { NotificationService } from "@shared/services/notification.service";
import { LoggerService } from "@shared/services/logger.service";

@Injectable({
    providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {
    
    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {

        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggerService);
        const notifier = this.injector.get(NotificationService);

        let message;
        let stackTrace;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            if(typeof error.error === 'object' && error.error !== null){
                message = error.error['description']
                // stackTrace = error.error['description']
            }else{
                message = errorService.getServerMessage(error);
                stackTrace = errorService.getServerStack(error);
            }
        } else {
            // Client Error
            message = errorService.getClientMessage(error);
            stackTrace = errorService.getClientStack(error);
        }
        
        notifier.showError(message);
        // Always log errors
        logger.logError(message, stackTrace);

        // console.error(error);
    }
}