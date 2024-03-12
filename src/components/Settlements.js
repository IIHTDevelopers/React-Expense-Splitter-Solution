import React, { useState, useEffect } from 'react';

function Settlements() {
    const [expenses, setExpenses] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [settlements, setSettlements] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/expenses')
            .then(response => response.json())
            .then(data => setExpenses(data));

        fetch('http://localhost:4000/participants')
            .then(response => response.json())
            .then(data => setParticipants(data.map(participant => ({
                ...participant,
                paid: 0,
                owes: 0,
            }))));
    }, []);

    useEffect(() => {
        if (expenses.length > 0 && participants.length > 0) {
            calculateSettlements();
        }
    }, [expenses, participants]);

    const calculateSettlements = () => {
        let totalExpense = 0;
        let expenseContributions = participants.map(participant => ({
            ...participant,
            paid: 0,
            owes: 0,
        }));

        // Calculate total expenses and how much each participant has paid
        expenses.forEach(expense => {
            totalExpense += expense.amount;
            const dividedAmount = expense.amount / expense.dividedAmong.length;
            expenseContributions = expenseContributions.map(participant => {
                if (participant.name === expense.payer) {
                    participant.paid += expense.amount;
                }
                if (expense.dividedAmong.includes(participant.name)) {
                    participant.owes += dividedAmount;
                }
                return participant;
            });
        });

        const averageExpense = totalExpense / participants.length;

        // Calculate settlements
        const updatedSettlements = expenseContributions.map(participant => {
            const balance = participant.paid - participant.owes;
            return {
                name: participant.name,
                balance: balance.toFixed(2),
            };
        });

        setSettlements(updatedSettlements);
    };

    return (
        <div>
            <h2>Settlements</h2>
            {settlements.map((settlement, index) => (
                <div key={index}>
                    {settlement.name} balance: {settlement.balance >= 0 ? `owes nothing, is owed $${settlement.balance}` : `owes $${Math.abs(settlement.balance)}`}
                </div>
            ))}
        </div>
    );
}

export default Settlements;
