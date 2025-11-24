import { Component, Input, OnInit } from '@angular/core';
import {MealFood} from "../../models/mealfood";
import {MealFoodService} from "../../services/mealfood.service";


@Component({
  selector: 'app-meal-food-list',
  templateUrl: './meal-food-list.component.html',
  styleUrls: ['./meal-food-list.component.scss']
})
export class MealFoodListComponent implements OnInit {
  @Input() mealId!: number; // ID приема пищи, к которому привязаны продукты
  mealFoods: MealFood[] = [];

  constructor(private mealFoodService: MealFoodService) {}

  ngOnInit(): void {
    this.loadMealFoods();
  }

  // Метод для загрузки продуктов для конкретного приема пищи
  loadMealFoods(): void {
    this.mealFoodService.getMealFoodsByMealId(this.mealId).subscribe((data) => {
      this.mealFoods = data;
    });
  }

  // Метод для удаления продукта из приема пищи
  deleteMealFood(mealFoodId: number): void {
    if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
      this.mealFoodService.deleteMealFood(mealFoodId).subscribe(() => {
        this.loadMealFoods(); // Перезагружаем продукты после удаления
        alert('Продукт удален.');
      });
    }
  }
}
