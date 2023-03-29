import { NotifyDTO } from "../dto/notify.dto";
import { Notify } from "./notify.model";


export class NotifyRepository {
  public saveNotify = async (notify: NotifyDTO) => {

    const notifyToSave = new Notify({
      UserId: notify.UserId,
      Message: JSON.stringify(notify.Message),
      IsReaded: false,
    });


    return await notifyToSave.save();
  }

  // Mark this notifi is readed
  public updateNewNotifyByUserId = (notifiId: string) => {
    const query = { _id: notifiId };
    const update = { IsReaded: true };
    return Notify.findOneAndUpdate(query, update, { new: true });
  }

  public getNotifyByUserId = async (userId: string, limit: number, page: number) => {
    const query = { UserId: userId };
    return await Notify.find(query).sort({ CreatedDate: -1 }).skip(page * limit).limit(limit);
  }
}