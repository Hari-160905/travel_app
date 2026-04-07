import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TripDetails() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [total, setTotal] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (date) => {
    if (!date) return "";
    if (date.length === 10) return date;
    return date.split("T")[0];
  };

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const tripRes = await axios.get(`http://localhost:5000/trips/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ CHANGED
        const totalRes = await axios.get(
          `http://localhost:5000/expenses/${id}/total`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // ✅ CHANGED
        const expRes = await axios.get(
          `http://localhost:5000/expenses/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // ✅ CHANGED
        const actRes = await axios.get(
          `http://localhost:5000/activities/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setTrip(tripRes.data);
        setTotal(totalRes.data.total || 0);
        setExpenses(expRes.data);
        setActivities(actRes.data);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Error loading data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ================= EXPENSES =================

  const deleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/expenses/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Deleted ✅");
      window.location.reload();
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  const editExpense = async (exp) => {
    const newDesc = prompt("Enter description", exp.description);
    const newAmount = prompt("Enter amount", exp.amount);

    if (!newDesc || !newAmount) return;

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/expenses/${exp.id}`,
        {
          description: newDesc,
          amount: Number(newAmount), // ✅ small fix
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Updated ✅");
      window.location.reload();
    } catch (err) {
      alert("Update failed ❌");
    }
  };

  // ================= ACTIVITIES =================

  const deleteActivity = async (activityId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Deleted ✅");
      window.location.reload();
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  const editActivity = async (act) => {
    const newPlace = prompt("Enter place", act.location_name);
    const newNote = prompt("Enter note", act.note_text);

    if (!newPlace || !newNote) return;

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/activities/${act.id}`,
        {
          location_name: newPlace,
          note_text: newNote,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Updated ✅");
      window.location.reload();
    } catch (err) {
      alert("Update failed ❌");
    }
  };

  // ================= UI =================

  if (loading) return <p>Loading trip details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!trip || Object.keys(trip).length === 0)
    return <p>Trip not found.</p>;

  return (
    <div className="details-container">
      <div className="trip-card">
        <h2>Trip Details</h2>

        <h3>{trip.title}</h3>
        <p><strong>Destination:</strong> {trip.destination}</p>
        <p><strong>Start Date:</strong> {formatDate(trip.start_date)}</p>
        <p><strong>End Date:</strong> {formatDate(trip.end_date)}</p>
        <p><strong>Notes:</strong> {trip.notes || "No notes available"}</p>

        <h3>Total Expense 💰: ₹{total}</h3>

        <h3>Expenses:</h3>
        {expenses.length === 0 ? (
          <p>No expenses added</p>
        ) : (
          <ul>
            {expenses.map((exp) => (
              <li key={exp.id}>
                <span>{exp.description} - ₹{exp.amount}</span>

                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => editExpense(exp)}>
              Edit
                 </button>

              <button className="delete-btn" onClick={() => deleteExpense(exp.id)}>
                   Delete
                </button>
                  </div>
              </li>
            ))}
          </ul>
        )}

        <h3>Places Visited:</h3>
        {activities.length === 0 ? (
          <p>No places added</p>
        ) : (
          <ul>
            {activities.map((act) => (
              <li key={act.id}>
                <span>{act.location_name} - {act.note_text}</span>

                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => editActivity(act)}>
               Edit
                </button> 

               <button className="delete-btn" onClick={() => deleteActivity(act.id)}>
             Delete
      </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TripDetails;