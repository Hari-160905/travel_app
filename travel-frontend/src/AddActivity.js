import { useState } from "react";
import axios from "axios";

function AddActivity({ tripId }) {
  const [place, setPlace] = useState("");

  const addActivity = async () => {

    if (!place.trim()) {
      alert("Enter a place");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/activities",
        {
          trip_id: tripId,
          location_name: place,
          note_text: ""
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Place Added ✅");
      setPlace(""); // clear input

    } catch (err) {
      console.error(err);
      alert("Error adding place ❌");
    }
  };

  return (
    <div>
      <input
        placeholder="Place visited"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <button onClick={addActivity}>Add Place</button>
    </div>
  );
}

export default AddActivity;