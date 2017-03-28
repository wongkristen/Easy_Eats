import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/Rx';


@Injectable()
export class RestaurantService{

    constructor(public http: Http) { }

    GetAllData(){
        console.log("Getting all tables");
        return this.http.get('/api/getalldata').map((res:Response) => res.json());
    }

    GetAllOpenTable(){
        console.log("Getting all tables that are currently open");
    }

    GetSingleTable(id){
        console.log("Get all single table");
    }

    //Set Waiter To Table
    SetWaitersToTable(waiter, table){
      let obj = {
          waiter: waiter,
          table: table
      };
    let body = JSON.stringify(obj);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`/api/setwaiter`, body, options).map((res: Response) => res.json());
    }

    //Add Food to Table
    UpdateFoodTable(orderArr, table){
        let obj = {
            table: table,
            orders: orderArr
        };
        let body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`/api/updatefood`, body, options).map((res: Response) => res.json());
    }

}