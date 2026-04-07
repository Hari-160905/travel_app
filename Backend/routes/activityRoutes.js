const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  addActivity,
  getActivities,
  updateActivity,
  deleteActivity
} = require('../controllers/activityController');

router.post('/', auth, addActivity);
router.get('/:id', auth, getActivities);
router.put('/:id', auth, updateActivity);
router.delete('/:id', auth, deleteActivity);

module.exports = router;