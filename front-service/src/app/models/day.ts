import {Meal} from "./meal";

export interface Day {
  id: number;       // ID дня
  userId: number;   // ID пользователя
  date: string;     // Дата дня в формате ISO 8601 (например, "2024-12-18")
  meals: Meal[];    // Список приемов пищи (завтрак, обед, ужин)
}
