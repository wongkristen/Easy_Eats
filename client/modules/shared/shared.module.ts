import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import {RestaurantService} from "../../providers/Restaurant.service";
import {TableComponent} from "../../directives/diagram/diagram.component";
import {CustomModals} from "../../directives/modals/CustomModals";
import {FoodService} from "../../providers/Menu.server";


@NgModule({
    imports:      [ CommonModule ],
    declarations: [ TableComponent, CustomModals ],
    exports:      [ TableComponent, CustomModals ]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                RestaurantService,
                FoodService
            ]
        };
    }
}
