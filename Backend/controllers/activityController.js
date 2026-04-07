const db = require('../config/db');

// ADD ACTIVITY
exports.addActivity = (req, res) => {
  const { trip_id, note_text, location_name } = req.body;
  const user_id = req.user.id;

  db.query(
    "SELECT * FROM trips WHERE id=? AND user_id=?",
    [trip_id, user_id],
    (err, result) => {

      if (err) return res.status(500).json({ message: err.message });

      if (result.length === 0) {
        return res.status(403).json({ message: "Not your trip" });
      }

      db.query(
        "INSERT INTO activities (trip_id, note_text, location_name) VALUES (?, ?, ?)",
        [trip_id, note_text, location_name],
        (err, result) => {
          if (err) return res.status(500).json({ message: err.message });

          res.json({ message: "Activity added", id: result.insertId });
        }
      );
    }
  );
};

// GET ACTIVITIES
exports.getActivities = (req, res) => {
  const trip_id = req.params.id;
  const user_id = req.user.id;

  db.query(
    "SELECT * FROM trips WHERE id=? AND user_id=?",
    [trip_id, user_id],
    (err, trips) => {

      if (err) return res.status(500).json({ message: err.message });
      if (trips.length === 0) {
        return res.status(404).json({ message: "Trip not found" });
      }

      db.query(
        "SELECT * FROM activities WHERE trip_id=?",
        [trip_id],
        (err, activities) => {
          if (err) return res.status(500).json({ message: err.message });

          res.json(activities);
        }
      );
    }
  );
};

// UPDATE ACTIVITY
exports.updateActivity = (req, res) => {
  const { location_name, note_text } = req.body;
  const activity_id = req.params.id;

  db.query(
    "UPDATE activities SET location_name=?, note_text=? WHERE id=?",
    [location_name, note_text, activity_id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: "Activity updated" });
    }
  );
};

// DELETE ACTIVITY
exports.deleteActivity = (req, res) => {
  const activity_id = req.params.id;

  db.query(
    "DELETE FROM activities WHERE id=?",
    [activity_id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: "Activity deleted" });
    }
  );
};