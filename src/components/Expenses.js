import React, { useState, useEffect } from 'react';

function Expenses() {
    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [expensesByUser, setExpensesByUser] = useState({});

    useEffect(() => {
        fetch('http://localhost:4000/expenses')
            .then((response) => response.json())
            .then((data) => {
                setExpenses(data);
                calculateTotals(data);
            });
    }, []);

    const calculateTotals = (expenses) => {
        let total = 0;
        let byUser = {};

        expenses.forEach(expense => {
            total += expense.amount;
            if (byUser[expense.payer]) {
                byUser[expense.payer] += expense.amount;
            } else {
                byUser[expense.payer] = expense.amount;
            }
        });

        setTotalExpense(total);
        setExpensesByUser(byUser);
    };

    return (
        <div>
            <h2>Expenses</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>{expense.description} - ${expense.amount} (Paid by {expense.payer})</li>
                ))}
            </ul>
            <h3>Total Expense: ${totalExpense}</h3>
            <h4>Expenses by User</h4>
            <ul>
                {Object.entries(expensesByUser).map(([user, amount]) => (
                    <li key={user}>{user}: ${amount}</li>
                ))}
            </ul>
        </div>
    );
}

export default Expenses;
