# Use OpenJDK image for Spring Boot
FROM openjdk:21-jdk-slim
WORKDIR /app
# Use the correct JAR name built by Maven
COPY target/stem-cell-banking-1.0.0.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8081

# Use environment variables for secrets (already set in application.properties)
ENTRYPOINT ["java", "-jar", "app.jar"]
