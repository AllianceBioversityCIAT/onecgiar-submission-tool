import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from '@shared/pipes/order-by.pipe';


@NgModule({
    declarations: [
        OrderByPipe
    ],
    exports: [
        OrderByPipe
    ],
    providers: [OrderByPipe],
    imports: [
        CommonModule,
    ],
})
export class SharedModule { }