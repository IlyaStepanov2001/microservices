import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meal } from 'src/app/models/meal'

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = '/api/meals'; // URL к вашему API

  constructor(private http: HttpClient) {}

  // Получить все приемы пищи для дня
  getMealsByDayId(dayId: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.apiUrl}?dayId=${dayId}`);
  }

  // Создать новый прием пищи
  createMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.apiUrl, meal);
  }

  // Обновить прием пищи
  updateMeal(id: number, meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiUrl}/${id}`, meal);
  }

  // Удалить прием пищи
  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
