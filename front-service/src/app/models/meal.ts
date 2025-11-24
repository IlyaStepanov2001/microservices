import {MealFood} from "./mealfood";

export interface Meal {
  id: number;
  mealType: string; // Тип приема пищи: завтрак, обед или ужин
  dayId: number;    // ID дня, к которому привязан прием пищи
  mealFoods: MealFood[]; // Продукты, связанные с приемом пищи
}
