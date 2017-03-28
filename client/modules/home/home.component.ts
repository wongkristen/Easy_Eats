import {Component, OnInit, AfterViewInit, ViewChild} from "@angular/core";
import {RestaurantService} from "../../providers/Restaurant.service";
import {TableComponent} from "../../directives/diagram/diagram.component";
import {FoodService} from "../../providers/Menu.server";
import {CustomModals} from "../../directives/modals/CustomModals";

declare var $;

@Component({
    selector: "home",
    templateUrl: `client/modules/home/home.component.html`,
    styleUrls: [`client/modules/home/home.component.css`],
    providers: [TableComponent]
})
export class HomeComponent implements OnInit, AfterViewInit{

    @ViewChild('myModal') myModal: CustomModals;

    TableStatus;

    constructor(public API: RestaurantService, public foodMenu: FoodService) {}

    ngOnInit(){
        this.GetAllTable();
    }

    ngAfterViewInit(){
        console.log(this.foodMenu.FoodMenu);
        console.log(this.myModal.AllTables);
    }

    GetAllTable(){
        this.API.GetAllData().subscribe((data) => {
            console.log("Main Data");
            console.log(data);
            this.SetUpTableStatusArray(data.Current_Tables);
            this.myModal.StoreTableData(data.Current_Tables);
        }, (err) => {
            if (err) console.log(err);
        });
    }

    SetUpTableStatusArray(obj){
        var arr = [];
        Object.keys(obj).map((x) => {
           arr.push(obj[x]);
        });
        this.TableStatus = arr;
    }

    DiagramModalOpened(table){
        this.myModal.SetUpWhatToDisplay(table);
    }

}
