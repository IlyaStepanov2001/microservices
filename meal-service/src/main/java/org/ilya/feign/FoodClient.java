package org.ilya.feign;

import org.ilya.entities.Food;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "food-service")
public interface FoodClient {
    @GetMapping("/food")
    List<Food> getFood();
}
