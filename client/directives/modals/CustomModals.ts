import {Component, OnInit, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {RestaurantService} from "../../providers/Restaurant.service";
import {FoodService} from "../../providers/Menu.server";

declare var $;

@Component({
    selector: 'custom-modal',
    templateUrl: 'client/directives/modals/CustomModals.component.html',
    providers: [RestaurantService, FoodService]
})
export class CustomModals implements OnInit, AfterViewInit {

    @Output() WaiterChosen = new EventEmitter;
    AllTables;
    CurrentTable;
    TableString;
    myModal;

    tax;
    total_price;

    WaiterLoader = "ui disabled dimmer";
    FoodLoader = "ui disabled dimmer";

    MyWaiters = {
        "waiter1": "Sarah King",
        "waiter2": "Kevin Tran",
        "waiter3": "Miley Cyrus"
    };


    constructor(public restService: RestaurantService, public foodModel: FoodService) {
        console.log(23423);
    }

    ngOnInit() { }

    ngAfterViewInit(){
        this.myModal = $('.main-modal'); // => MODAL
        $('.ui.modal').modal({
            allowMultiple: false
        })
        $('.waiter-modal').modal('attach events', '#AssignWaiterButton');
    }

    StoreTableData(val){
        this.AllTables = val;
        console.log("Made it in here");
        console.log(val);
    }

    SetUpWhatToDisplay(table){
        console.log(this.AllTables[table]);
        this.TableString = table;
        this.CurrentTable = this.AllTables[table];
        this.FindOutTotalAndTax(this.CurrentTable.orders);
        this.myModal.modal("show");
        $(".ui.modal").css("top", "3%");
        $(".ui.modal").css("margin-top", "0");
    }

    FindOutTotalAndTax(total_notax){
        let total_without_tax = total_notax.reduce((p, c) => p += c.price ,0);
        this.tax = Math.round(((total_without_tax * 0.07))*100) / 100;
        // this.total_price = total_without_tax + this.tax;
        this.total_price = Math.round(((total_without_tax * 0.07) + total_without_tax)*100) / 100;;
        // console.log(total_without_tax, this.tax, this.total_price);
    }

    ChooseWaiter(val){
        this.WaiterLoader = "ui active dimmer";
        let waiter = this.MyWaiters[val];
        console.log(waiter);
        this.restService.SetWaitersToTable(waiter, this.TableString).subscribe((data) => {
            this.WaiterLoader = "ui disabled dimmer";
            this.AllTables[this.TableString].waiter_assigned = waiter;
            this.CurrentTable.waiter_assigned = waiter;
            console.log(data);
            this.myModal.modal("show");
        }, (err) => {
            this.WaiterLoader = "ui disabled dimmer";
            console.log("FAILED REQUEST");
            console.log(err);
        })
    }

    OpenFoodModal(){
        $(".food-modal").modal("show");
    }

    GoBackToMainModal(){
        $(".main-modal").modal("show");
    }

    AddFoodIntoTable(val){
        this.FoodLoader = "ui active dimmer";
        console.log(val);
        //Add new food into array
        let table = this.TableString;
        let OrderArr = this.CurrentTable.orders;
        let FoodObjToAdd = {
            order_name: val,
            price: this.foodModel.FoodMenu[val].price,
            special_request: "no cheese"
        };
        OrderArr.push(FoodObjToAdd);
        console.log(OrderArr);
        return this.restService.UpdateFoodTable(OrderArr, table).subscribe((data) => {
            this.FoodLoader = "ui disabled dimmer";
            this.AllTables[this.TableString].orders = OrderArr;
            this.CurrentTable.orders = OrderArr;
            this.FindOutTotalAndTax(this.CurrentTable.orders);
            $(".main-modal").modal("show");
        }, (err) => {
            console.log('FAILED');
            console.log(err);
        })
    }

    DeleteFoodItem(index){
        console.log(index);
        let table = this.TableString;
        let OrderArr = this.CurrentTable.orders;
        OrderArr.splice(index, 1);
        return this.restService.UpdateFoodTable(OrderArr, table).subscribe((data) => {
            this.AllTables[this.TableString].orders = OrderArr;
            this.CurrentTable.orders = OrderArr;
            this.FindOutTotalAndTax(this.CurrentTable.orders);
        }, (err) => {
            console.log('FAILED');
            console.log(err);
        })
    }


}













