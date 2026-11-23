package pe.jheyssun.aulavx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class AulaVxApplication {
    public static void main(String[] args) { SpringApplication.run(AulaVxApplication.class, args); }
}
