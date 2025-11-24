package org.ilya.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MealSummaryDTO {
    private double totalCalories;
    private double totalProtein;
    private double totalFat;
    private double totalCarbohydrate;

}
