import React from 'react';
import Expenses from './components/Expenses';
import AddExpense from './components/AddExpense';
import Settlements from './components/Settlements';

function App() {
  return (
    <div>
      <h1>Simple Expense Splitter</h1>
      <Expenses />
      <AddExpense />
      <Settlements />
    </div>
  );
}

export default App;
