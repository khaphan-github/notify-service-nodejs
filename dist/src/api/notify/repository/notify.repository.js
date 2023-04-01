"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyRepository = void 0;
const notify_model_1 = require("./notify.model");
class NotifyRepository {
    constructor() {
        this.saveNotify = (notify) => __awaiter(this, void 0, void 0, function* () {
            const notifyToSave = new notify_model_1.Notify({
                UserId: notify.UserId,
                Message: JSON.stringify(notify.Message),
                IsReaded: false,
            });
            return yield notifyToSave.save();
        });
        // Mark this notifi is readed
        this.updateNewNotifyByUserId = (notifiId) => {
            const query = { _id: notifiId };
            const update = { IsReaded: true };
            return notify_model_1.Notify.findOneAndUpdate(query, update, { new: true });
        };
        this.getNotifyByUserId = (userId, limit, page) => __awaiter(this, void 0, void 0, function* () {
            const query = { UserId: userId };
            return yield notify_model_1.Notify.find(query).sort({ CreatedDate: -1 }).skip(page * limit).limit(limit);
        });
    }
}
exports.NotifyRepository = NotifyRepository;
