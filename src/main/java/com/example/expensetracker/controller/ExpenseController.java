package com.example.expensetracker.controller;

// import com.example.expensetracker.dto.ExpenseSummary;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.service.ExpenseService;
import com.example.expensetracker.repository.ExpenseRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@CrossOrigin
public class ExpenseController {



    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }




    // fetches data when triggered by js
    @GetMapping
    public List<Expense> getAll() {
        return service.getAllExpenses();
    }

    @PostMapping
    public ResponseEntity<String> add(@RequestBody Expense expense) {
        service.addExpense(expense);
        return ResponseEntity.status(201).body("Expense created successfully");

    }

    // update/edit data method
    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Expense updated) {
        service.updateExpense(id, updated);
        return ResponseEntity.ok("Expense updated successfully");
    }

    // delete data method
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteExpense(id);
        return ResponseEntity.ok("Expense deleted successfully");
    }

}