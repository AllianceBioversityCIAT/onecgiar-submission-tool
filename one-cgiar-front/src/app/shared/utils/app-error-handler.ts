import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ErrorService } from "../services/error.service";
import { LoggerService } from "../services/logger.service";
import { NotificationService } from "../services/notification.service";

@Injectable({
    providedIn: 'root'
})
export class AppErrorHandler implements ErrorHandler {

    constructor(private injector: Injector, private spinner: NgxSpinnerService) { }

    handleError(error: Error | HttpErrorResponse) {

        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggerService);
        const notifier = this.injector.get(NotificationService);
        // const auth = this.injector.get(AuthService);

        let message;
        let stackTrace:any;

        if (error instanceof HttpErrorResponse) {
            console.log('server error', error)
            // Server Error
            if (typeof error.error === 'object' && error.error !== null) {
                message = error.error['description']
                // stackTrace = error.error['description']
            } else {
                message = errorService.getServerMessage(error);
                stackTrace = errorService.getServerStack(error);
            }
            notifier.showError(message);
        } else {
            // Client Error
            console.log('client err', error)
            message = errorService.getClientMessage(error);
            stackTrace = errorService.getClientStack(error);
            // this.auth.logout();
        }

        this.spinner.hide();
        // Always log errors
        logger.logError(message, stackTrace);

        // console.error(error);
    }
}