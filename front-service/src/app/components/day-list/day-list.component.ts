import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Meal} from "../../models/meal";
import {Day} from "../../models/day";
import {DayService} from "../../services/day.service";
import {MealService} from "../../services/meal.service";
import {MealFoodService} from "../../services/mealfood.service";
import {MealFood} from "../../models/mealfood";

@Component({
  selector: 'app-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss']
})
export class DayListComponent implements OnInit {
  days: Day[] = [];  // Список дней
  selectedDate: string = '';  // Выбранная дата
  selectedDay: Day | null = null;  // Выбранный день
  selectedMeals: Meal[] = [];  // Приёмы пищи на выбранный день

  breakfastForm: FormGroup;
  lunchForm: FormGroup;
  dinnerForm: FormGroup;

  userId = 1;  // Пример ID пользователя, который будет использоваться для всех новых дней

  constructor(
    private dayService: DayService,
    private mealService: MealService,
    private mealFoodService: MealFoodService,
    private fb: FormBuilder
  ) {
    this.breakfastForm = this.fb.group({
      foodId: [''],
      quantity: ['']
    });

    this.lunchForm = this.fb.group({
      foodId: [''],
      quantity: ['']
    });

    this.dinnerForm = this.fb.group({
      foodId: [''],
      quantity: ['']
    });
  }

  ngOnInit(): void {
    // Загружаем список дней пользователя
    this.dayService.getDaysByUserId(this.userId).subscribe(
      (days) => {
        this.days = days;
      },
      (error) => {
        console.error('Ошибка загрузки дней', error);
      }
    );
  }

  // Метод для выбора дня
  onDateChange(event: any): void {
    const selectedDate = event.value.toISOString().split('T')[0];  // Преобразуем в строку формата YYYY-MM-DD
    this.selectedDate = selectedDate;

    // Проверяем, существует ли день в базе
    this.selectedDay = this.days.find((day) => day.date === selectedDate) || null;

    if (!this.selectedDay) {
      // Если дня нет в базе, создаём новый день
      this.selectedDay = { date: selectedDate, id: 0, userId: this.userId, meals: [] }; // Добавляем userId
    }

    // Загружаем приёмы пищи для выбранного дня, если день существует
    if (this.selectedDay.id !== 0) {
      this.mealService.getMealsByDayId(this.selectedDay.id).subscribe((meals) => {
        this.selectedMeals = meals;
        this.updateForms();
      });
    }
  }

  // Обновляем формы с данными о приёмах пищи для выбранного дня
  updateForms(): void {
    const breakfast = this.selectedMeals.find((meal) => meal.mealType === 'Завтрак');
    const lunch = this.selectedMeals.find((meal) => meal.mealType === 'Обед');
    const dinner = this.selectedMeals.find((meal) => meal.mealType === 'Ужин');

    // Если данных нет, формы остаются пустыми для ввода новых данных
    if (breakfast) {
      this.breakfastForm.patchValue({
        foodId: breakfast.mealFoods[0]?.foodId || '',
        quantity: breakfast.mealFoods[0]?.quantity || ''
      });
    } else {
      this.breakfastForm.reset();  // Сбрасываем форму, если данных нет
    }

    if (lunch) {
      this.lunchForm.patchValue({
        foodId: lunch.mealFoods[0]?.foodId || '',
        quantity: lunch.mealFoods[0]?.quantity || ''
      });
    } else {
      this.lunchForm.reset();  // Сбрасываем форму, если данных нет
    }

    if (dinner) {
      this.dinnerForm.patchValue({
        foodId: dinner.mealFoods[0]?.foodId || '',
        quantity: dinner.mealFoods[0]?.quantity || ''
      });
    } else {
      this.dinnerForm.reset();  // Сбрасываем форму, если данных нет
    }
  }

  // Метод для обновления продуктов в приёме пищи
  updateMealFood(mealId: number, form: FormGroup): void {
    const updatedMealFood: MealFood = {
      id: 0,  // Если ID = 0, значит продукт ещё не существует
      foodId: form.value.foodId,
      quantity: form.value.quantity,
      mealId: mealId
    };

    this.mealFoodService.updateMealFood(mealId, updatedMealFood).subscribe(() => {
      alert('Продукты обновлены!');
      this.updateForms();  // Обновляем формы после сохранения
    });
  }

  // Метод для сохранения нового дня в базе
  saveNewDay(): void {
    if (this.selectedDay && this.selectedDay.id === 0) {
      // Создаём новый день в базе с добавлением userId
      this.selectedDay.userId = this.userId;  // Обязательно добавляем userId
      this.dayService.createDay(this.selectedDay).subscribe((createdDay) => {
        this.selectedDay = createdDay;  // Присваиваем ID, полученный после создания
        alert('День успешно добавлен!');
      });
    }
  }
}
