import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Day } from 'src/app/models/day'

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private apiUrl = '/api/days'; // URL к вашему API

  constructor(private http: HttpClient) {}

  createDay(day: Day): Observable<Day> {
    return this.http.post<Day>(`${this.apiUrl}/days`, day);
  }

  // Получить все дни для пользователя
  getDaysByUserId(userId: number): Observable<Day[]> {
    return this.http.get<Day[]>(`${this.apiUrl}?userId=${userId}`);
  }
}
