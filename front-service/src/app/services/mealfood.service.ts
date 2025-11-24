import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealFood } from 'src/app/models/mealfood'

@Injectable({
  providedIn: 'root'
})
export class MealFoodService {
  private apiUrl = '/api/meal-foods'; // URL к вашему API

  constructor(private http: HttpClient) {}

  // Получить все продукты в приемах пищи
  getMealFoodsByMealId(mealId: number): Observable<MealFood[]> {
    return this.http.get<MealFood[]>(`${this.apiUrl}?mealId=${mealId}`);
  }

  // Добавить продукт в прием пищи
  addMealFood(mealFood: MealFood): Observable<MealFood> {
    return this.http.post<MealFood>(this.apiUrl, mealFood);
  }

  // Обновить продукт в приеме пищи
  updateMealFood(id: number, mealFood: MealFood): Observable<MealFood> {
    return this.http.put<MealFood>(`${this.apiUrl}/${id}`, mealFood);
  }

  // Удалить продукт из приема пищи
  deleteMealFood(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
