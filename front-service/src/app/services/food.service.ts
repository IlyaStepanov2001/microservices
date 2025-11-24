import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, tap, throwError} from "rxjs";
import {IProduct} from "../models/product";
import {ErrorService} from "./error.service";
import {products} from "../data/products";
import {IFood} from "../models/food";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = 'http://localhost:8080';
  private foodToEdit: IFood
  food: IFood[] = []

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  setFoodToEdit(food: IFood): void {
    this.foodToEdit = food
  }

  getFoodToEdit(): IFood {
    return this.foodToEdit
  }

  getAll(): Observable<IFood[]> {
    return this.http.get<IFood[]>(`${this.apiUrl}/food`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json'
      })
    })
      .pipe(
        tap(food => this.food = food),
        catchError(this.errorHandler.bind(this))
      )
  }

  create(food: IFood): Observable<IFood> {
    this.food.push(food)
    return this.http.post<IFood>(`${this.apiUrl}/food/add-food`, food, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json'
      })
    })
      // .pipe(
      //   tap(prod => this.products.push(prod))
      // )
  }

  delete(food: IFood): void {
    const index = this.food.indexOf(food)
    this.food.splice(index, 1)
    this.http.delete(`${this.apiUrl}/food/${food.name}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        // 'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (response) => {
        console.log("Продукт удалён с сервера:", response);
      },
      error: (error) => {
        console.error("Ошибка при удалении продукта:", error);
      }
    })
  }

  edit(food: IFood): Observable<IFood> {
    // Локальное обновление списка продуктов, если необходимо
    const index = this.food.findIndex(f => f.name === food.name);
    if (index !== -1) {
      this.food[index] = food;  // Обновляем продукт в локальном массиве
    }

    // Отправляем PUT-запрос для обновления продукта на сервере
    return this.http.put<IFood>(`${this.apiUrl}/food/${food.name}`, food, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json'
      })
    });
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError( () => error.message)
  }
}
