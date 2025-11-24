package org.ilya.services;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.ilya.dto.MealSummaryDTO;
import org.ilya.entities.Food;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
@RequiredArgsConstructor
public class MealService {
    private final List<Food> breakfast;
    private final List<Food> lunch;
    private final List<Food> dinner;

    public List<Food> deleteFromBreakfast(Long id) {
        breakfast.stream().filter(food -> food.getId() == id).findFirst().ifPresent(breakfast::remove);
        return breakfast;
    }

    public List<Food> deleteFromLunch(Long id) {
        lunch.stream().filter(food -> food.getId() == id).findFirst().ifPresent(lunch::remove);
        return lunch;
    }

    public List<Food> deleteFromDinner(Long id) {
        dinner.stream().filter(food -> food.getId() == id).findFirst().ifPresent(dinner::remove);
        return dinner;
    }

    public List<Food> addToBreakfast(Food food) {
        breakfast.add(food);
        return breakfast;
    }

    public List<Food> addToLunch(Food food) {
        lunch.add(food);
        return lunch;
    }

    public List<Food> addToDinner(Food food) {
        dinner.add(food);
        return dinner;
    }

    public MealSummaryDTO calculateMealSummary(List<Food> foodList) {
        double totalCalories = 0;
        double totalProtein = 0;
        double totalFat = 0;
        double totalCarbohydrate = 0;

        for (Food food : foodList) {
            totalCalories += food.getCalories();
            totalProtein += food.getProtein();
            totalFat += food.getFat();
            totalCarbohydrate += food.getCarbohydrate();
        }

        return new MealSummaryDTO(totalCalories, totalProtein, totalFat, totalCarbohydrate);
    }

    public MealSummaryDTO calculateTotalSummary() {
        MealSummaryDTO breakfastSummary = calculateMealSummary(breakfast);
        MealSummaryDTO lunchSummary = calculateMealSummary(lunch);
        MealSummaryDTO dinnerSummary = calculateMealSummary(dinner);

        double totalCalories = 0;
        double totalProtein = 0;
        double totalFat = 0;
        double totalCarbohydrate = 0;

        totalCalories = breakfastSummary.getTotalCalories() +
                lunchSummary.getTotalCalories() +
                dinnerSummary.getTotalCalories();

        totalProtein = breakfastSummary.getTotalProtein() +
                lunchSummary.getTotalProtein() +
                dinnerSummary.getTotalProtein();

        totalFat = breakfastSummary.getTotalFat() +
                lunchSummary.getTotalFat() +
                dinnerSummary.getTotalFat();

        totalCarbohydrate = breakfastSummary.getTotalCarbohydrate() +
                lunchSummary.getTotalCarbohydrate() +
                dinnerSummary.getTotalCarbohydrate();

        return new MealSummaryDTO(
                totalCalories,
                totalProtein,
                totalFat,
                totalCarbohydrate
        );
    }
}
