const db = require('../config/db');

// ADD EXPENSE
exports.addExpense = (req, res) => {
  const { trip_id, description, amount } = req.body;
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
        "INSERT INTO expenses (trip_id, description, amount) VALUES (?, ?, ?)",
        [trip_id, description, amount],
        (err, result) => {
          if (err) return res.status(500).json({ message: err.message });

          res.json({ message: "Expense added", id: result.insertId });
        }
      );
    }
  );
};

// GET EXPENSES
exports.getExpenses = (req, res) => {
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
        "SELECT * FROM expenses WHERE trip_id=?",
        [trip_id],
        (err, expenses) => {
          if (err) return res.status(500).json({ message: err.message });

          res.json(expenses);
        }
      );
    }
  );
};

// TOTAL EXPENSE
exports.getTotalExpense = (req, res) => {
  const trip_id = req.params.id;

  db.query(
    "SELECT SUM(amount) as total FROM expenses WHERE trip_id=?",
    [trip_id],
    (err, result) => {

      if (err) return res.status(500).json({ message: err.message });

      res.json({ total: result[0].total || 0 });
    }
  );
};

// UPDATE EXPENSE
exports.updateExpense = (req, res) => {
  const { description, amount } = req.body;
  const expense_id = req.params.id;

  db.query(
    "UPDATE expenses SET description=?, amount=? WHERE id=?",
    [description, amount, expense_id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: "Expense updated" });
    }
  );
};

// DELETE EXPENSE
exports.deleteExpense = (req, res) => {
  const expense_id = req.params.id;

  db.query(
    "DELETE FROM expenses WHERE id=?",
    [expense_id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: "Expense deleted" });
    }
  );
};