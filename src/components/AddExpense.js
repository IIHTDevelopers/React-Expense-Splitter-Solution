import React, { useState, useEffect } from 'react';

function AddExpense() {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [payer, setPayer] = useState('');
    const [participants, setParticipants] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);

    useEffect(() => {
        // Assume you fetch the list of participants from your backend
        fetch('http://localhost:4000/participants')
            .then((response) => response.json())
            .then((data) => setParticipants(data));
    }, []);

    const handleAddExpense = (e) => {
        e.preventDefault();
        const newExpense = {
            description,
            amount: parseFloat(amount),
            payer,
            dividedAmong: selectedParticipants,
        };

        fetch('http://localhost:4000/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newExpense),
        })
            .then((response) => response.json())
            .then((data) => {
                // Optionally reset form fields and update UI
                setDescription('');
                setAmount('');
                setPayer('');
                setSelectedParticipants([]);
            });
    };

    const handleParticipantSelection = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedParticipants(value);
    };

    return (
        <div>
            <h3>Add a New Expense</h3>
            <form onSubmit={handleAddExpense}>
                <div>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Amount:
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Payer:
                        <select
                            value={payer}
                            onChange={(e) => setPayer(e.target.value)}
                            required
                        >
                            <option value="">Select who paid</option>
                            {participants.map((participant) => (
                                <option key={participant.id} value={participant.name}>
                                    {participant.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Divide Among:
                        <select
                            multiple={true}
                            value={selectedParticipants}
                            onChange={handleParticipantSelection}
                            required
                        >
                            {participants.map((participant) => (
                                <option key={participant.id} value={participant.name}>
                                    {participant.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
}

export default AddExpense;
