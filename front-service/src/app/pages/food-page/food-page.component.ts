import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {FoodService} from "../../services/food.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.scss']
})
export class FoodPageComponent implements OnInit {

  title = 'food-service'
  loading = false
  term = ''


  constructor(
    public foodService: FoodService,
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loading = true
    // this.products$ = this.productsService.getAll().pipe(
    //   tap( () => this.loading = false)
    // )
    this.foodService.getAll().subscribe(() => {
      this.loading = false
    })
  }

}
