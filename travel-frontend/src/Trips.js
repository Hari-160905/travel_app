import { useEffect, useState } from "react";
import axios from "axios";
import AddExpense from "./AddExpense";
import AddActivity from "./AddActivity";
import { useNavigate } from "react-router-dom";

function Trips() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/trips", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTrips(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FINAL DATE FIX (NO TIMEZONE ISSUE)
  const formatDate = (date) => {
    if (!date) return "";

    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ✅ DELETE TRIP
  const deleteTrip = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Trip Deleted 🗑️");
      fetchTrips();

    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  // ✅ EDIT TRIP (FULLY FIXED)
  const editTrip = async (trip) => {
    const currentStart = formatDate(trip.start_date);
    const currentEnd = formatDate(trip.end_date);

    const newTitle = prompt("Enter new title", trip.title);
    const newDestination = prompt("Enter destination", trip.destination);

    const newStartDate = prompt(
      "Enter start date (YYYY-MM-DD)",
      currentStart
    );

    const newEndDate = prompt(
      "Enter end date (YYYY-MM-DD)",
      currentEnd
    );

    const newNotes = prompt("Enter notes", trip.notes);

    if (!newTitle) return;

    // 🔥 AVOID UNNECESSARY UPDATE
    if (
      newTitle === trip.title &&
      newDestination === trip.destination &&
      newStartDate === currentStart &&
      newEndDate === currentEnd &&
      newNotes === trip.notes
    ) {
      alert("No changes made ⚠️");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/trips/${trip.id}`,
        {
          title: newTitle,
          destination: newDestination,
          start_date: newStartDate || currentStart,
          end_date: newEndDate || currentEnd,
          notes: newNotes
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Updated ✅");
      fetchTrips();

    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="trips-container">
      <h2>Your Trips</h2>

      {trips.map(trip => (
        <div key={trip.id} className="trip-card">

          <h3
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate(`/trips/${trip.id}`)}
          >
            {trip.title}
          </h3>

          <p>{trip.destination}</p>

          <button onClick={() => editTrip(trip)}>Edit</button>
          <button onClick={() => deleteTrip(trip.id)}>Delete</button>

          <br /><br />

          <AddActivity tripId={trip.id} />
          <AddExpense tripId={trip.id} />

        </div>
      ))}
    </div>
  );
}

export default Trips;