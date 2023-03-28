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

  public getNotifyByUserId = (userId: string, limit: number) => {
    const query = { UserId: userId };
    return Notify.find(query).sort({ CreatedDate: -1 }).limit(limit);
  }
}