require("dotenv").config();

const express = require('express');
const cors = require('cors');

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const activityRoutes = require('./routes/activityRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const aiRoutes = require('./routes/aiRoutes'); 

app.use('/', authRoutes);
app.use('/trips', tripRoutes);
app.use('/activities', activityRoutes);
app.use('/expenses', expenseRoutes);
app.use('/', aiRoutes);

// ROOT
app.get('/', (req, res) => {
  res.send("🚀 Travel App Backend Running");
});

// SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});