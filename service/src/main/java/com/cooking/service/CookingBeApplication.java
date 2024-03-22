package com.cooking.service;

import com.cooking.service.config.RedisConfig;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(RedisConfig.class)
public class CookingBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(CookingBeApplication.class, args);
	}
}
