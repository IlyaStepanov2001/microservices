import { Component, Input, OnInit } from '@angular/core';
import {Meal} from "../../models/meal";
import {MealService} from "../../services/meal.service";


@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit {
  @Input() dayId!: number;
  meals: Meal[] = [];

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.mealService.getMealsByDayId(this.dayId).subscribe((data) => {
      this.meals = data;
    });
  }
}
