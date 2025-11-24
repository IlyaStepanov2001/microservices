import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../models/product";
import {IFood} from "../../models/food";
import {FoodService} from "../../services/food.service";
import {ModalService} from "../../services/modal.service";
import {CreateProductComponent} from "../create-product/create-product.component";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {

  @Input() food: IFood

  constructor( public foodService: FoodService,
               public modalService: ModalService) {
  }

  details = false

  editBtn(food: IFood){
    this.foodService.setFoodToEdit(food)
    this.modalService.isEdit = true
  }

  delete(food: IFood): void {
    this.foodService.delete(food)
    //   .subscribe(() => {
    //   // Логика после удаления
    // })

  }
}
