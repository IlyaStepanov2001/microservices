package org.ilya.redis;

public class FoodMessageListener {

    public void onMessage(String message) {
        System.out.println("Получено сообщение от food-channel: " + message);
    }
}
