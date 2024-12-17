import TableCrudController from "../server/controller/table.crud.controller";
import { MANAGER_CONFIG_SHEET } from "../utils/constan.enum";
import FirebaseController from "../server/controller/firebase.controller";
import { addDays, isTomorrow, format, subDays } from "date-fns";
import { uuid } from "../utils/utils";
// TODO làm lại logic sync bookinng để tự động nhắn tin
const table = 'READ_BOOKING_JOB';
function createTrigger(triggerName = '') {
  const now = new Date();
  const today6pm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0); // Lúc 6 giờ chiều hôm nay
  const tomorrow6pm = addDays(today6pm, 1); // Lúc 6 giờ chiều ngày mai
  const scriptProperties = PropertiesService.getScriptProperties();
  const triggerId = scriptProperties.getProperty(table) ;
   if(triggerId) {
     scriptProperties.deleteProperty(table)
     ScriptApp.getProjectTriggers().forEach(function(trigger) {
       if (trigger.getUniqueId() === triggerId) {
         ScriptApp.deleteTrigger(trigger);
         Logger.log('End remove trigger');
       }
     });
   }
  const trigger =   ScriptApp.newTrigger(triggerName)
    .timeBased()
    .at(tomorrow6pm)
    .create();
  scriptProperties.setProperty(table, trigger.getUniqueId());
  Logger.log(`JOB_${table} make schedule created successfully.`);
}
export const syncBookingJob = () => {
  createTrigger('syncBookingJob');
  const tableCrudController = new TableCrudController();
  // TODO remove CONFIG_FIREBASE , them vao time o excute
   const firebaseConFig = tableCrudController.getById(MANAGER_CONFIG_SHEET , 'CONFIG_FIREBASE');
  const template = tableCrudController.getById(MANAGER_CONFIG_SHEET , 'CONFIG_VNPAY_TEMPLATE');
  let mapTemplate = {};
  if(!template.data) {
    Logger.log('syncBookingJob -> khong tim thay template')
    return ;
  } else {
    Logger.log(template)
    mapTemplate = JSON.parse(template.data.data);
  }
   if(!firebaseConFig.data) {
      Logger.log('syncBookingJob -> khong tim thay firebase config')
      return ;
   } else {
     const config = JSON.parse(firebaseConFig.data.data);
     const url = config.databaseURL;
     const dbConnect = new FirebaseController(url);
    const bookings = dbConnect.getBySeqNo('BOOKING', 0).map( it => ({
              id : it.id,
              brand: it.brand,
              cusId: it.cusId,
              deleted: it.deleted,
              note: it.note,
              petName: it.petName,
              petId : it.petId,
              phone: it.phone,
              priority: it.priority,
              seqNo: it.seqNo,
              status: it.status,
              sync: it.sync,
              time: it.time,
              userName: it.userName,
              createdBy: it.createdBy,
              createAt: it.createAt
    }));
    Logger.log('Add list booking ' + bookings.length );
     const settings = dbConnect.getBySeqNo('SETTING' , 0);
     const licenseZaloData =  (settings || []).filter( it => it.id === 'LICENSE_ZALO_DATA').pop();
     if(!licenseZaloData) {
        return ;
     }
     Logger.log(licenseZaloData);
     // loc ra status  === 0 ( Đã xác nhận ) // va co cai dat so dien thoai cho chi nhanh
     const mapPhone = JSON.parse(licenseZaloData.value);
     const newBooking = bookings;
     console.log(newBooking.length);
     const collectPhone = {}; // handle case một số điẹn thoại không được đặt lịch nhiều lần
    const taskTomorrow = newBooking.filter( it => ( it.status === 0  ||  it.status === 1 ) && mapPhone[it.brand])
      .filter((appointment) => { // chi linh hen ngay mai
       return isTomorrow(new Date(appointment.time));
      })
      .filter( it =>  it.phone && (/((09|03|07|08|05)+([0-9]{8})\b)/g.test((it.phone || '').replace(/[().]/g, "")))) // filter la sdt di dong
      .reduce( (pre , it ) => {
        let message ;
        if(mapTemplate[it.priority]) {
          const dataBuilder = {
            phone: mapPhone[it.brand],
            time: format(new Date(it.time), 'HH:mm'),
            day: format(new Date(it.time), 'dd/MM'),
            userName: it.userName,
            petName: it.petName || 'Bé'
          };
           message = mapTemplate[it.priority].replace(/\${(.*?)}/g, (match, p1) => dataBuilder[p1.trim()]);
        }
        if(message) {
          const task = {
            actionType: 'REMINDER_CALENDAR',
            sender: mapPhone[it.brand],
            phone: it.phone,
            message,
            exeDate: format(new Date(), 'dd/MM/yyyy'),
            time: format(new Date(it.time), 'dd/MM/yyyy;HH:mm')
          }
          Logger.log('triger add reminder', task);
          const data = { phone: it.phone, message: task.message, time: task.time };
          const save = {
            id: uuid(),
            data: JSON.stringify(data),
            status: "AWAIT",
            "log": "",
            actionType: task.actionType,
            exeDate: task.exeDate
          };
          if(!collectPhone[it.phone]) { // đã push vào rồi k được  push nữa
            pre[mapPhone[it.brand]] = [...(pre[mapPhone[it.brand]]||[]), save];
          }
          collectPhone[it.phone] =  save ;
        }
        return pre;
      }, {});
     Logger.log(taskTomorrow);
     Object.keys(taskTomorrow).forEach( sender => {
       Logger.log( taskTomorrow[sender] );
       tableCrudController.addAll(`${sender}_MANAGER_TASK`, {data:  taskTomorrow[sender] });
       Logger.log('add by sender');
     });

   }
}

