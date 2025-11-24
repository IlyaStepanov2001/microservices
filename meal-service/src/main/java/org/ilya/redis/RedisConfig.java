package org.ilya.redis;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

@Configuration
public class RedisConfig {

    @Bean
    public RedisMessageListenerContainer messageListenerContainer(RedisConnectionFactory connectionFactory, MessageListenerAdapter messageListenerAdapter) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(messageListenerAdapter, new ChannelTopic("food-channel"));
        return container;
    }

    @Bean
    public MessageListenerAdapter messageListenerAdapter(FoodMessageListener foodMessageListener) {
        return new MessageListenerAdapter(foodMessageListener, "onMessage");
    }

    @Bean
    public FoodMessageListener foodMessageListener() {
        return new FoodMessageListener();
    }
}
