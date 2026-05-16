package com.example.expensetracker.service;

import com.example.expensetracker.model.Expense;
import com.example.expensetracker.repository.ExpenseRepository;
// import com.example.expensetracker.dto.ExpenseSummary;
import org.springframework.stereotype.Service;

// import java.time.LocalDate;
import java.util.*;

@Service
public class ExpenseService {

    private final ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo) {
        this.repo = repo;
    }


    // fetch all expenses 
    public List<Expense> getAllExpenses() {
        return repo.findAll();
    }

    // existing methods
    public Expense addExpense(Expense expense) {
        return repo.save(expense);
    }

    public Expense updateExpense(Long id, Expense updated) {

        Expense existing = repo.findById(id).orElseThrow(() -> new RuntimeException("Expense not found"));

        // update fields
        existing.setTitle(updated.getTitle());
        existing.setCategory(updated.getCategory());
        existing.setPaymentMethod(updated.getPaymentMethod());
        existing.setAmount(updated.getAmount());
        existing.setDate(updated.getDate());

        return repo.save(existing);
    }

    public void deleteExpense(Long id) {
        repo.deleteById(id);
    }
}