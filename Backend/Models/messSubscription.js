const mongoose = require('mongoose');

const messSubscriptionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mess: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mess',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  subscriptionDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MessSubscription', messSubscriptionSchema);