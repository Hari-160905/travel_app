import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password
      });

      alert("Signup Successful ✅");
      navigate("/");

    } catch (err) {
      alert("Signup Failed ❌");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      <input placeholder="Username"
        onChange={e => setUsername(e.target.value)} />

      <input placeholder="Email"
        onChange={e => setEmail(e.target.value)} />

      <input type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)} />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;