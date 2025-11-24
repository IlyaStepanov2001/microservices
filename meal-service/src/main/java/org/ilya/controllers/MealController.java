package org.ilya.controllers;

import lombok.RequiredArgsConstructor;
import org.ilya.dto.DayDto;
import org.ilya.dto.MealSummaryDTO;
import org.ilya.entities.Food;
import org.ilya.feign.FoodClient;
import org.ilya.services.DayService;
import org.ilya.services.MealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/meal")
public class MealController {
    private final DayService dayService;
    private final MealService mealService;
    private final FoodClient foodClient;

    @DeleteMapping("/breakfast/{id}")
    public List<Food> deleteFromBreakfast(@PathVariable Long id) {
        return mealService.deleteFromBreakfast(id);
    }

    @DeleteMapping("/lunch/{id}")
    public List<Food> deleteFromLunch(@PathVariable Long id) {
        return mealService.deleteFromLunch(id);
    }

    @DeleteMapping("/dinner/{id}")
    public List<Food> deleteFromDinner(@PathVariable Long id) {
        return mealService.deleteFromDinner(id);
    }

    @GetMapping("/food")
    public List<Food> getFood() {
        return foodClient.getFood();
    }

    @GetMapping("/breakfast")
    public List<Food> getBreakfast() {
        return mealService.getBreakfast();
    }

    @GetMapping("/lunch")
    public List<Food> getLunch() {
        return mealService.getLunch();
    }

    @GetMapping("/dinner")
    public List<Food> getDinner() {
        return mealService.getDinner();
    }

    @GetMapping("/total-sum")
    public MealSummaryDTO getTotalSummary() {
        return mealService.calculateTotalSummary();
    }

    @GetMapping("/breakfast-sum")
    public MealSummaryDTO getBreakfastSummary() {
        return mealService.calculateMealSummary(mealService.getBreakfast());
    }

    @GetMapping("/lunch-sum")
    public MealSummaryDTO getLunchSummary() {
        return mealService.calculateMealSummary(mealService.getLunch());
    }

    @GetMapping("/dinner-sum")
    public MealSummaryDTO getDinnerSummary() {
        return mealService.calculateMealSummary(mealService.getDinner());
    }

    @PostMapping("/add-to-breakfast")
    public List<Food> addToBreakfast(@RequestBody Food food) {
        return mealService.addToBreakfast(food);
    }

    @PostMapping("/add-to-lunch")
    public List<Food> addToLunch(@RequestBody Food food) {
        return mealService.addToLunch(food);
    }

    @PostMapping("/add-to-dinner")
    public List<Food> addToDinner(@RequestBody Food food) {
        return mealService.addToDinner(food);
    }

    @GetMapping("/first")
    public ResponseEntity<?> endpoint(@RequestHeader("X-User-Name") String username) {
        return ResponseEntity.ok(Collections.singletonMap("username", username));
    }

    @PostMapping("/days")
    public ResponseEntity<?> saveDay(@RequestBody DayDto dayDto) {
        return dayService.save(dayDto);
    }
}
