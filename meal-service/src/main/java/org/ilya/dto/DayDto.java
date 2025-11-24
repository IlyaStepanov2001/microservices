package org.ilya.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.ilya.entities.Meal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class DayDto {
    private Long userId;
    private LocalDate date;
    private List<Meal> meals;
}
