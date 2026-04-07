const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "travel_secret_key";

// SIGNUP
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashed],
      (err) => {
        if (err) return res.status(500).json({ message: err.message });

        res.json({ message: "Signup successful" });
      }
    );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM Users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ message: "DB error" });

      if (result.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      const user = result[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.user_id },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({ message: "Login successful", token });
    }
  );
};