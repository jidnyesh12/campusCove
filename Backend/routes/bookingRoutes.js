const express = require('express');
const {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking,
  updatePaymentStatus,
  removeCustomer
} = require('../Controllers/bookingController');

const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Create booking & get all bookings
router.route('/')
  .post(createBooking)
  .get(getBookings);

// Get single booking & update booking status
router.route('/:id')
  .get(getBooking)
  .put(updateBookingStatus);

// Cancel booking
router.route('/:id/cancel')
  .put(cancelBooking);

// Remove customer (owner only)
router.route('/:id/remove-customer')
  .put(removeCustomer);

// Update payment status
router.route('/:id/payment')
  .put(updatePaymentStatus);

module.exports = router; 