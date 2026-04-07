const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  addExpense,
  getExpenses,
  getTotalExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

router.post('/', auth, addExpense);
router.get('/:id', auth, getExpenses);
router.get('/:id/total', auth, getTotalExpense);
router.put('/:id', auth, updateExpense);
router.delete('/:id', auth, deleteExpense);

module.exports = router;