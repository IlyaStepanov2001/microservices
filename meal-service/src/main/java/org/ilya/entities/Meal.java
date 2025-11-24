package org.ilya.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "meals")
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "meal_type", nullable = false)
    private String mealType;

    @ManyToOne
    @JoinColumn(name = "day_id", nullable = false)
    private Day day;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<MealFood> mealFoods;

}
