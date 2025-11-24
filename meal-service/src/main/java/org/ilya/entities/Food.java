package org.ilya.entities;

import lombok.Data;

@Data
public class Food {
    private int id;
    private String name;
    private int calories;
    private double protein;
    private double fat;
    private double carbohydrate;
}
