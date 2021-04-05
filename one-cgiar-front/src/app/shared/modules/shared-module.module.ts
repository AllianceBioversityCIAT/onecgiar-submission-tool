import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { ShowActivePipe } from '../pipes/show-active.pipe';


@NgModule({
    declarations: [
        OrderByPipe, ShowActivePipe
    ],
    exports: [
        OrderByPipe, ShowActivePipe
    ],
    providers: [],
    imports: [
        CommonModule,
    ],
})
export class SharedModule { }