# Expense Tracker

## Requirements

- Java JDK 17 or higher
- Maven (or use included mvnw)

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

## Features

- Add, Edit, Delete expenses
- View expenses in a sortable table (Tabulator)
- Group expenses by date
- Group expenses by category with sum
- Overall total displayed at top
- Success/error feedback via SweetAlert

## Database

Uses H2 in-memory/file database, created automatically on first run. No setup needed.

## Authors

Umaima Tahir, 
Abdul Raheem, 
Asadullah, 
Alishba Khan, 
Saim Kamran, 
Vazeema Khan, 

## Project Structure

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
│ → No SQL written manually, JPA handles it
│
├── model/
│ └── Expense.java
│ → Represents a single expense (id, title, amount, date, category)
│ → This class maps directly to the database table
│
└── ExpenseTrackerApplication.java
→ Main file, run this to start the project

src/main/resources/
│
├── static/
│ ├── index.html → Main page UI
│ ├── style.css → Styling
│ └── app.js → JavaScript: grouping, Tabulator, SweetAlert, API calls
│
└── application.properties
→ Database configuration (H2 settings)


