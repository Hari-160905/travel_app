import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container dashboard-buttons">
      <h2>Dashboard</h2>

      <button onClick={() => navigate("/trips")}>
        View Trips
      </button>

      <button onClick={() => navigate("/create-trip")}>
        Create Trip
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>

      <button onClick={() => navigate("/assistant")}>
     Travel Assistant 🤖
    </button>

    </div>
  );
}

export default Dashboard;