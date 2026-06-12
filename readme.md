# Expense Tracker

## Requirements

- Java JDK 17 or higher
- Maven (or use included mvnw)

## How to Run

1. Extract the zip
2. Open CMD inside the project folder
3. Run: mvnw spring-boot:run
4. Open browser: http://localhost:8080

## Tech Stack

- Java + Spring Boot
- JPA + H2 Database
- JavaScript + Tabulator
- SweetAlert

## How to Run

1. Open terminal in the project root folder (same folder as pom.xml and mvnw)
2. Run:
   - Windows: .\mvnw.cmd spring-boot:run
   - Mac/Linux: ./mvnw spring-boot:run

3. Wait until you see "Started ExpenseTrackerApplication"
4. Open browser: http://localhost:8080

## Requirements

- Java JDK 17 or higher

## Project Files

src/main/java/com/yourpackage/expensetracker/
│
├── controller/
│ └── ExpenseController.java
│ → Handles HTTP requests (GET, POST, PUT, DELETE)
│ → Receives data from frontend and sends responses
│
├── service/
│ └── ExpenseService.java
│ → Contains the business logic
│ → Decides what happens when add/edit/delete is called
│
├── repository/
│ └── ExpenseRepository.java
│ → Talks to the H2 database using JPA (Abstraction)
│ → No SQL written manually — JPA handles it
│
├── model/
│ └── Expense.java
│ → Represents a single expense (id, title, amount, date, category)
│ → This class maps directly to the database table
│
└── ExpenseTrackerApplication.java
→ Main file — run this to start the project

src/main/resources/
│
├── static/
│ ├── index.html → Main page UI
│ ├── style.css → Styling
│ └── app.js → JavaScript: grouping, Tabulator, SweetAlert, API calls
│
└── application.properties
→ Database configuration (H2 settings)
