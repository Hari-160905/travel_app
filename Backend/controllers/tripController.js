const db = require('../config/db');

// ✅ CREATE TRIP
exports.createTrip = (req, res) => {
  const { title, destination, start_date, end_date, notes } = req.body;
  const user_id = req.user.id;

  db.query(
    "INSERT INTO trips (user_id, title, destination, start_date, end_date, notes) VALUES (?, ?, ?, ?, ?, ?)",
    [user_id, title, destination, start_date, end_date, notes],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: "Trip created", tripId: result.insertId });
    }
  );
};

// ✅ GET ALL TRIPS
exports.getTrips = (req, res) => {
  const user_id = req.user.id;

  db.query(
    "SELECT * FROM trips WHERE user_id=?",
    [user_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json(result);
    }
  );
};

// ✅ GET SINGLE TRIP (🔥 THIS WAS MISSING)
exports.getSingleTrip = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  db.query(
    `SELECT id, title, destination, notes,
     DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date,
     DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date
     FROM trips WHERE id=? AND user_id=?`,
    [id, user_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json(result[0] || {});
    }
  );
};

// ✅ UPDATE TRIP
exports.updateTrip = (req, res) => {
  const { title, destination, start_date, end_date, notes } = req.body;
  const { id } = req.params;
  const user_id = req.user.id;

  db.query(
    "UPDATE trips SET title=?, destination=?, start_date=?, end_date=?, notes=? WHERE id=? AND user_id=?",
    [title, destination, start_date, end_date, notes, id, user_id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: "Trip updated" });
    }
  );
};

// ✅ DELETE TRIP
exports.deleteTrip = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  db.query(
    "DELETE FROM trips WHERE id=? AND user_id=?",
    [id, user_id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: "Trip deleted" });
    }
  );
};