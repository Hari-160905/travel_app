import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTrip() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(""); // start_date
  const [endDate, setEndDate] = useState("");     // end_date
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/trips",
        {
          title,
          destination,
          start_date: startDate,
          end_date: endDate,
          notes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res.data);
      navigate("/trips"); // go back to trips list
    } catch (err) {
      console.error(err);
      alert("Error creating trip");
    }
  };

  return (
    <div className="container">
      <h2>Create Trip</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <button type="submit">Create Trip</button>
      </form>
    </div>
  );
}

export default CreateTrip;