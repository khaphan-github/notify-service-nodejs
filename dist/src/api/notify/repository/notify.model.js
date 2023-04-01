"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notify = void 0;
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
}, {
    versionKey: false
});
exports.Notify = mongoose.model('Notification', NotifySchema);
