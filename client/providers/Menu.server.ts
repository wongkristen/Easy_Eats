import { Injectable } from '@angular/core';

@Injectable()
export class FoodService {

    public FoodMenu;

    constructor() {
        this.FoodMenu = {
            Hamburger: {
                price: 5.35
            },
            Drink: {
                price: 2.99
            },
            Fries: {
                price: 3.99
            },
            IceCream: {
                price: 4.99
            }
        };
    }
}