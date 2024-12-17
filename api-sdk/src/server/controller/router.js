import CryptojsController from './cryptojs.controller';
import SendEmailController from './send-email.controller';
import TableCrudController from "./table.crud.controller";
import FirebaseController from "./firebase.controller";
import LicenseController from "./license.controller";
import ContractController from "./contract.controller";
import { webHook } from "../../job/kiotviet/sync-main";
import EcommerceController from "../../job/kiotviet/api";
import AuthController from "./auth.controller";
import StoreController from "./store.controller";
import ScheduleController from "./schedule.controller";
import PortalController from "./portal.controller";
import CalendarController from "./calendar.controller";
import TelegramController from "./telegram.controller";
import ExportExcelController from "./export-excel.controller";
import {getDeploymentId} from "../../utils/utils";
import ManagementZaloController from "./management-zalo.controller";

const cryptojs = new CryptojsController();
const sendEmail = new SendEmailController();
const tableCrud = new TableCrudController();
const firebase = new FirebaseController();
const license = new LicenseController(tableCrud, sendEmail,cryptojs );
const contract = new ContractController();
const auth = new AuthController();
const cloud = new StoreController();
const schedule = new ScheduleController();
const portal = new PortalController();
const calendar = new CalendarController();
const exportExcel = new ExportExcelController();
const managementZaloController = new ManagementZaloController();
const jsonpack = require('jsonpack');
const routers = {
  encrypt: (params) => {
    const { text } = params;
   return cryptojs.encrypt(text)
  },
  decrypt: (params) => {
    const { text } = params;
    return cryptojs.decrypt(text)
  },
  SEND_OTP: (params) => {
    return sendEmail.sendOtp(params);
  },
  SEND_EMAIL: (params) => {
    const { recipient, subject, body } = params;
   return sendEmail.sendEmail(recipient, subject, body);
  } ,
  getById: (params) => {
    const { id, table } = params;
    return tableCrud.getById(table,id);
  },
  addAll: (params) => { // addAll
    const { table, sheetId } = params;
    if(sheetId && table.endsWith("_MANAGER_TASK")) {
      const scriptUrl = ScriptApp.getService().getUrl();
      const regex = /\/s\/(.*?)\/exec/;
      const match = scriptUrl.match(regex);
      let deploymentId = '';
      if (match && match[1]) {
        deploymentId = match[1];
      }
      const data = {
        id: "UPDATE_TASK",
        actionType: "ADD_TASK",
        phone: (table || '').split("_").shift(),
        sheetId: deploymentId
      };
      firebase.updateById("MANAGER_TASK", "UPDATE_TASK", data);
    }
    return tableCrud.addAll(table,params);
  },
  POST: (params) => { // add
    const { table , sheetId } = params;
    if(sheetId && table.endsWith("_MANAGER_TASK"))  {
      const scriptUrl = ScriptApp.getService().getUrl();
      const regex = /\/s\/(.*?)\/exec/;
      const match = scriptUrl.match(regex);
      let deploymentId = '';
      if (match && match[1]) {
        deploymentId = match[1];
      }
      const data =  {id : "UPDATE_TASK" , actionType: "ADD_TASK", phone: (table || '').split("_").shift(),sheetId :deploymentId } ;
      firebase.updateById( "MANAGER_TASK"  , "UPDATE_TASK", data);
    }
    return tableCrud.add(table,params);
  },
  GET:(params) => { // get all
    const { table , seqNo} = params;
    if(seqNo === undefined) {
      return tableCrud.getAll(table)
    } else {
      return tableCrud.getAll(table).filter( it => it.seqNo >  seqNo );
    }
  },
  UPLOAD: (params) => {
    return tableCrud.upload(params);
  },
  DATABASES: (params) => { // list database
    const {tables} = params;
    return tableCrud.databases(tables);
  },
  DELETE: (params) => {
    const { id, table } = params;
    return tableCrud.delete(table,id);
  },
  CLEAR: (params) => {
    const { table } = params;
    return tableCrud.clear(table);
  },
  ZALO: (params) => {
    return tableCrud.zalo(params);
  },
  FIREBASE: (params) => {
    const { table , data } = params;
    return firebase.addAll(table , data);
  },
  FIREBASE_addAll: (params) => {
    const { table , data } = params;
    return firebase.addAll(table , data);
  },
  FIREBASE_add: (params) => {
    const { table , data } = params;
    return firebase.addAll(table , [data]);
  },
  FIREBASE_getAll: (params) => {
    const { table } = params;
    return firebase.getAll(table);
  },
  FIREBASE_getById: (params) => {
    const { table , id } = params;
    return firebase.getById(table , id);
  },
  FIREBASE_deleteById: (params) => {
    const { table , id } = params;
    return firebase.deleteById(table , id);
  },
  FIREBASE_updateById: (params) => {
    const { table , data } = params;
    return firebase.updateById(table  ,data.id, data);
  },
  FIREBASE_getBySeqNo: (params) => {
    const { table , seqNo } = params;
    return firebase.getBySeqNo(table  ,seqNo);
  },
  LICENSE: (params) => {
    return license.addLicense(params);
  },
  CONTRACT: (params) => {
    const {data} =  params;
    return contract.addContact(data);
  },
  addContact: (params) => {
    return contract.addContact();
  },
  ecommerce:(params) => {
    const api = new EcommerceController();
    const { data, method } = params;
    if ( method === 'invoiceInApp') {
      return {data: jsonpack.pack(data)};
    }
    if( method === 'invoice') {
      const { jwt } = params;
      return api.createInvoice(data, jwt); // order sang kiot viet
    }
    if(method === 'forWordCall') {
      return api.forWordCall(data);
    }
    if(method === 'getToken') {
      const {client_id , client_secret} = data;
      return api.getToken(client_id, client_secret);
    }
    if( method === 'config' ) {
      const {key , value} = data;
      return api.config(key, value);
    }
    if( method === 'invoiceLastModifiedFrom') { // check order kiot viet
      const { jwt } = params;
      const {lastModifiedFrom } = data;
      return api.invoiceLastModifiedFrom(jwt ,lastModifiedFrom );
    }
  },
  api:(params) => {
    const { method , access_token} = params;
    if(method === 'login') {
      return auth.login();
    }
    if(method === 'information') {
      return auth.information(access_token);
    }
  },
  cloud: (params) => {
    const {databaseName ,tableName, method , data } = params;
    if( method === 'insert' || method === 'update' ) {
      if ((tableName || '').startsWith('SERVER_LOG_')) {
         const bot = new TelegramController();
         try {
           const message = {
             userName: data.userInfo.displayName ,
             email: data.userInfo.email,
             tableName,
             id: data.id,
             msg: (data.message || '').substring(0, 255)
           }
           bot.log(JSON.stringify(message))
           tableCrud.add(tableName,{data: data});
         } catch (e) {}
      }
      if( Array.isArray(data)) {
        return cloud.insert(databaseName,tableName, data);
        } else {
        return cloud.insert(databaseName,tableName, [data]);
      }
    }
    if( method === 'getAll') {
      const { pagination } = params;
      return cloud.getAll(databaseName,tableName,pagination);
    }
    if( method === 'delete' ) {
      const { ids } = params;
      return cloud.delete(databaseName, tableName, ids);
    }
    if( method === 'getBySeqNo') {
      const { seqNo } = params;
      return cloud.getBySeqNo(databaseName,tableName, seqNo );
    }
  },
  schedule: (params) => {
    const { method } = params;
    if( method === 'getAll' ) {
      return schedule.getAll();
    }
    if( method === 'job-sync-product') {
      return schedule.syncProductKiotViet();
    }
  },
  portal: (params) => {
    const { method } = params;
    if( method === 'getConfigByRetailer') {
      const { data, rootUrl }  = params;
      return portal.getConfigByRetailer(data.retailer,rootUrl)
    }
    if( method === 'getConfigByDomain') {
      const { data }  = params;
      return portal.getConfigByDomain(data.domain);
    }
    // ham nay de thuc hien import user
    if( method === 'import-user') {
      const { data , apiKey , url}  = params;
      for( let i = 0 ; i < data.length ; i++) {
        const { email } = data[i];
        const  { idToken, localId } = portal.loginUser( email , "Vetgo@123",apiKey);
        if(idToken) {
          data[i].uid = localId;
        } else {
          const { localId } = portal.createUser(email, "Vetgo@123",apiKey  ) ;
          data[i].uid = localId;
        }
      }
      const dbFirebase = new FirebaseController(url);
      return dbFirebase.addAll("USERS", data)
    }
    if( method === 'import-data') {
      const { data , table , url}  = params;
      const dbFirebase = new FirebaseController(url);
      return dbFirebase.addAll(table, data)
    }
  },
  calendar: (params) => {
    const { method, calendarName } = params;
    if( method === 'setColorCalendar' ) {
      const { data } = params;
      const { color } = data;
      return calendar.setColorCalendar(calendarName , color );
    }
    if( method === 'createEventCustom' ) {
      const { data } = params;
     const payload  = {
        title: data.title,
        start: new Date(data.start),
        end: new Date(data.end),
        colorId: data.colorId,
        options: data.options,
      }
      return calendar.createEventCustom(calendarName , payload );
    }
  },
  export_excel: (params) => {
    const { method } = params;
    if( method === 'export' ) {
      const { data , fileName , header} = params;
      return exportExcel.exportExcel({data} , header, fileName );
    }
  },
  zalo_task: (params) => {
    const { method, calendarName } = params;
    if( method === 'getRangeEvents') {
      const { data } = params;
      return calendar.getRangeEvents(calendarName,data)
    }
    // TODO  status FINISH || FAILED || SEND_MESSAGE
    // actionType = ADD_FRIEND || REMINDER_CALENDAR || SEND_MESSAGE
    if(method === 'updateConfig') {
      const { data } = params;
     return firebase.updateById('config_mapping' , data.id, data);
    }
    if(method === 'license') {
      const deploymentId = getDeploymentId();
      return managementZaloController.getLicense(deploymentId);
    }
  }
};

 function router(e) {
  try {
    let obj = JSON.parse(e.postData.contents);
    const payload = obj[Utilities.base64Encode('payload').replace('==','')];
    if(payload) {
      const deploymentId = getDeploymentId();
      const { data }  = cryptojs.decrypt(payload, deploymentId);
      obj = JSON.parse(data);
    }
    // const obj = JSON.parse(e.postData.contents);
    // interceptor(obj);
    if(obj['Attempt'] &&  obj['Attempt'] === 1) { // trigger webhook kiotviet
      webHook(obj);
    }
    const { actionType } = obj;
    if(routers[actionType]) {
      let rs = routers[actionType](obj);
      if(payload) {
        const deploymentId = getDeploymentId();
          rs  = {[Utilities.base64Encode('payload').replace('==','')] : cryptojs.encrypt(JSON.stringify(rs), deploymentId).data};
      }
      return ContentService.createTextOutput(JSON.stringify(rs)).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({msg: 'Action not found' })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(err);
  }
}

export default router;
