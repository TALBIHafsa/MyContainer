# Builder stage
FROM maven:3.9.4-eclipse-temurin-21-alpine AS builder

WORKDIR /app

COPY pom.xml mvnw ./
COPY .mvn .mvn/

RUN ./mvnw dependency:resolve

COPY . .

RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:23-jre-alpine

WORKDIR /app

COPY --from=builder /app/target/CONTproject-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 5000

ENTRYPOINT ["java", "-jar", "app.jar"]
