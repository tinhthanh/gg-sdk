import TableCrudController from "../server/controller/table.crud.controller";
import { MANAGER_CONFIG_SHEET } from "../utils/constan.enum";
import FirebaseController from "../server/controller/firebase.controller";
import { format, differenceInMinutes } from "date-fns";
import TelegramController from "../server/controller/telegram.controller";
const table = 'SYNC_WAITING_TIME_JOB';
function createTrigger(triggerName = '') {
  const scriptProperties = PropertiesService.getScriptProperties();
  const triggerId = scriptProperties.getProperty(table) ;
   if(!triggerId) {
     const trigger =   ScriptApp.newTrigger(triggerName)
       .timeBased()
       .everyMinutes(5)
       .create();
     scriptProperties.setProperty(table, trigger.getUniqueId());
     Logger.log(`JOB_${table} make schedule created successfully.`);
   }
}
export const syncWaitingTimeJob = () => {
  createTrigger('syncWaitingTimeJob');
  const tableCrudController = new TableCrudController();
  // TODO remove CONFIG_FIREBASE , them vao time o excute
   const firebaseConFig = tableCrudController.getById(MANAGER_CONFIG_SHEET , 'CONFIG_FIREBASE');
   if(!firebaseConFig.data) {
      Logger.log('syncWaitingTimeJob -> khong tim thay firebase config')
      return ;
   } else {
     const config = JSON.parse(firebaseConFig.data.data);
     const url = config.databaseURL;
     const dbConnect = new FirebaseController(url);
     const settings = dbConnect.getBySeqNo('SETTING' , 0);
     const licenseZaloData =  (settings || []).filter( it => it.id === 'LICENSE_ZALO_DATA').pop();
     if(!licenseZaloData) {
        return ;
     }
     Logger.log(licenseZaloData);
     const mapPhone = JSON.parse(licenseZaloData.value);
     Logger.log(mapPhone);
     if(mapPhone) {
       Object.values(mapPhone).forEach( sender  => {
           const temp =  tableCrudController.getAll(`${sender}_MANAGER_TASK`);
            const ll =  temp.filter( it => it.status === 'AWAIT' &&  it.exeDate === format(new Date(), 'dd/MM/yyyy')
                && differenceInMinutes(new Date(), new Date(it.lastUpdated)) > 30 ) ;
            if(ll.length > 0) {
              const device =  tableCrudController.getById(`DEVICE_REMOTE` , sender);
              if(device.status === "SUCCESS") {
                const item = device.data;
                Logger.log('DEVICE_REMOTE -> find');
                if(!item.qrCode) {
                  const bot = new TelegramController();
                  bot.sendTelegramMessage(`Số điện thoại này không làm task ${sender}_MANAGER_TASK`);
                }
              }
            } else {
              Logger.log('Không có thông báo khẩn cấp');
            }
          const list = temp.filter( it => it.status === 'WAITING_TIME' &&  it.exeDate === format(new Date(), 'dd/MM/yyyy'));
       const insertList =  list.filter( item => {
             const d = JSON.parse(`${item.data}`);
             return d.waitingTime &&  new Date().getTime() > new Date(d.waitingTime).getTime();
           }).map( it => {
              it.status = 'AWAIT';
             return it;
       });
          if(insertList.length > 0) {
            Logger.log(insertList);
          tableCrudController.addAll(`${sender}_MANAGER_TASK` , {data: insertList});
           } else {
            Logger.log('Không có tin nhắn nào cần update từ WAITING_TIME -> AWAIT');
          }
       });
     }
   }
}

