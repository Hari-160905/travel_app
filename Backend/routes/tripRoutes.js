const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  createTrip,
  getTrips,
  getSingleTrip,
  updateTrip,
  deleteTrip
} = require('../controllers/tripController');

// routes
router.post('/', auth, createTrip);
router.get('/', auth, getTrips);
router.get('/:id', auth, getSingleTrip); // 🔥 important
router.put('/:id', auth, updateTrip);
router.delete('/:id', auth, deleteTrip);

module.exports = router;