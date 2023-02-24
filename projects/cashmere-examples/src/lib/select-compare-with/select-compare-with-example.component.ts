import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

interface Topping {
    id: number;
    name: string;
    price: string;
}

/**
 * @title Select using compareWith
 */
@Component({
    selector: 'hc-select-compare-with-example',
    templateUrl: 'select-compare-with-example.component.html',
    styleUrls: ['select-compare-with-example.component.scss']
})
export class SelectCompareWithExampleComponent implements OnInit {
    pizzaToppingForm: FormGroup;
    toppings: Array<Topping> = [
        {id: 1, name: 'Pepperoni', price: "$0.59"},
        {id: 2, name: 'Olives', price: "$0.79"},
        {id: 3, name: 'Sausage', price: "$0.99"},
        {id: 4, name: 'Bacon', price: "$0.99"},
        {id: 5, name: 'Chicken', price: "$0.99"},
    ];

    constructor(private formBuilder: FormBuilder) { }

    public ngOnInit(): void {
        this.pizzaToppingForm = this.formBuilder.group({
            "selectedTopping": {id: 5, name: 'Chicken', price: '$0.99'}
        });
    }

    pizzaToppingsComparer(option1: Topping, option2: Topping): boolean {
        return option1 && option2 && option1.id === option2.id;
    }
}
