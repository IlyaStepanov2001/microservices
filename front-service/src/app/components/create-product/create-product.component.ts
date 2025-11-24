import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {ModalService} from "../../services/modal.service";
import {FoodService} from "../../services/food.service";
import {window} from "rxjs";
import {IFood} from "../../models/food";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  public foodToEdit: IFood | null = null;

  constructor(
    private foodService: FoodService,
    public modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    if (this.modalService.isEdit) {
      this.foodToEdit = this.foodService.getFoodToEdit()
      this.form.patchValue({
        name: this.foodToEdit.name,
        calories: this.foodToEdit.calories,
        protein: this.foodToEdit.protein,
        fat: this.foodToEdit.fat,
        carbohydrate: this.foodToEdit.carbohydrate
      });
    }
  }

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    calories: new FormControl<number>(0),
    protein: new FormControl<number>(0),
    fat: new FormControl<number>(0),
    carbohydrate: new FormControl<number>(0)
  })

  get title() {
    return this.form.controls.name as FormControl
  }

  submitCreate() {
    console.log(this.form.value)
    this.foodService.create({
      name: this.form.value.name as string,
      calories: this.form.value.calories as number,
      protein: this.form.value.protein as number,
      fat: this.form.value.fat as number,
      carbohydrate: this.form.value.carbohydrate as number,
    }).subscribe(() => {
      // this.modalService.close()
    })
  }

  submitEdit() {
    console.log(this.form.value)
    this.foodService.edit({
      name: this.form.value.name as string,
      calories: this.form.value.calories as number,
      protein: this.form.value.protein as number,
      fat: this.form.value.fat as number,
      carbohydrate: this.form.value.carbohydrate as number,
    }).subscribe(() => {
      // this.modalService.close()
    })
  }

  onSubmit() {
    if (this.modalService.isEdit) {
      this.submitEdit(); // Редактирование
      this.modalService.isEdit = false
    } else {
      this.submitCreate(); // Создание нового
      this.modalService.isCreate = false
    }
  }

}
