let mongoose = require('mongoose');

const NotifySchema = new mongoose.Schema({
  UserId: {
    type: String,
  },
  CreatedDate: {
    type: Date,
    default: Date.now
  },
  Message: {
    type: String,
  },
  IsReaded: {
    type: Boolean,
  }
},
  {
    versionKey: false
  });

export const Notify = mongoose.model('Notification', NotifySchema);