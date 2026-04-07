import { useState } from "react";
import axios from "axios";

function AddExpense({ tripId }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/expenses",
        {
          trip_id: tripId,
          description: desc,
          amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Expense Added 💰");

    } catch (err) {
      alert("Error adding expense ❌");
    }
  };

  return (
    <div>
      <input placeholder="Expense"
        onChange={e => setDesc(e.target.value)} />

      <input placeholder="Amount"
        onChange={e => setAmount(e.target.value)} />

      <button onClick={addExpense}>Add Expense</button>
    </div>
  );
}

export default AddExpense;