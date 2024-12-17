import ContractController from "../server/controller/contract.controller";
import FirebaseController from "../server/controller/firebase.controller";

export const createSixMinuteSchedule = () => {
  const scriptProperties = PropertiesService.getScriptProperties();
  const triggerId = scriptProperties.getProperty('SIX_MINUTE_TRIGGER_ID');

  if (triggerId) {
    // Đã tồn tại trigger, hủy trigger cũ
    ScriptApp.getProjectTriggers().forEach(function(trigger) {
      if (trigger.getUniqueId() === triggerId) {
        ScriptApp.deleteTrigger(trigger);
      }
    });
  }

  // Tạo trigger mới
  const trigger = ScriptApp.newTrigger('runJob')
    .timeBased()
    .everyMinutes(5)
    .create();

  // Lưu triggerId vào Script Properties
  scriptProperties.setProperty('SIX_MINUTE_TRIGGER_ID', trigger.getUniqueId());

  Logger.log('Six-minute schedule created successfully.');
}

export const runJob = () => {
  const contractController = new ContractController();
  const firebaseController = new FirebaseController();
  const startTime = new Date();
  const timeThreshold = 4 * 60 * 1000; // 4 phút (tính bằng milliseconds)
  const  items = firebaseController.getAll('PHONE_CUSTOMER').filter( it => it.status !== 'DONE');
  let count = 0;
  for(let item of items) {
    try {
      contractController.addContact([item]);
    } catch (e) {
      Logger.log('Error -> runJob -> addContact ' + e);
    }
    firebaseController.updateById('PHONE_CUSTOMER' ,item.id , {...item, status:'DONE'});
    count++;
    if ((new Date() - startTime) >= timeThreshold) {
      break;
    }
  }
  Logger.log('Job running done...' + count);
}
