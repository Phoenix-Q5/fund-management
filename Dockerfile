# ========== 1) Build stage ==========
FROM gradle:8.10-jdk17-alpine AS build

WORKDIR /app

COPY build.gradle.kts settings.gradle.kts ./

COPY gradle ./gradle
COPY gradlew ./

COPY src ./src

RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]