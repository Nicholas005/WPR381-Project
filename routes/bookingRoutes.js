const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware/authMiddleware');
const bookingController = require('../controllers/bookingController');

router.post('/:eventId', isLoggedIn, bookingController.postBooking);
router.post('/:id/edit', isLoggedIn, bookingController.editBooking);
router.post('/:id/cancel', isLoggedIn, bookingController.cancelBooking);

module.exports = router;