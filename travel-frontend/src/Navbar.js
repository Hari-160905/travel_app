import { useLocation } from "react-router-dom";


function Navbar() {
  const location = useLocation();

  // check if TripDetails page
  const isDetailsPage = location.pathname.startsWith("/trips/");

  return (
    <div className={isDetailsPage ? "navbar small" : "navbar"}>
      <h1>TravelDiaries</h1>
    </div>
  );
}

export default Navbar;