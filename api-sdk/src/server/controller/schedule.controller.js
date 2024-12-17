import { jobSyncProductKiotViet } from "../../job/sync-product-kiot.job";
export default class ScheduleController {
  constructor() {}
  getAll() {
   return ScriptApp.getProjectTriggers().map( it => ({
     uniqueId: it.getUniqueId(),
     handlerFunction: it.getHandlerFunction(),
     eventType: it.getEventType(),
     triggerSource: it.getTriggerSource(),
     triggerSourceId: it.getTriggerSourceId()
   }));
  }
  // sync product kiot viet
  syncProductKiotViet() {
    return jobSyncProductKiotViet();
  }

}
