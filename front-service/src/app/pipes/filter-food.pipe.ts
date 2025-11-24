import { Pipe, PipeTransform } from '@angular/core';
import {IProduct} from "../models/product";
import {IFood} from "../models/food";

@Pipe({
  name: 'filterFood'
})
export class FilterFoodPipe implements PipeTransform {

  transform(food: IFood[], search: string): IFood[] {
    if (search.length === 0) return food
    return food.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
  }

}
