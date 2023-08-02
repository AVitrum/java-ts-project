FROM openjdk:20
WORKDIR /app
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar
COPY public/images /app/public/images
ENTRYPOINT ["java", "-jar", "app.jar"]

