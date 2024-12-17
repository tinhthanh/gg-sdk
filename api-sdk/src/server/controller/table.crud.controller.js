import { uuid } from '../../utils/utils';
export default class TableCrudController {
  constructor() {
    this.app = SpreadsheetApp.getActiveSpreadsheet();
  }
  getById(table,id) {
   const sheet = this.app.getSheetByName(table);
   if (!sheet) {
      return { status : "FAILED" , data: null, msg: 'FIND NOT FOUND' };
    } else {
    const currentKeyOfObj = sheet
        .getRange(1, 1, 1, sheet.getLastColumn())
        .getValues()[0];
      const dataMap = currentKeyOfObj.reduce((cur, pre, index) => {
        cur[index] = pre;
        return cur;
      }, {});
      const columnValues = sheet
        .getRange(1, 1, sheet.getLastRow(), 1)
        .getValues();
      const searchResult = columnValues.findIndex(([r]) => r == id);
      if (searchResult != -1) {
        const result = sheet
          .getRange(searchResult + 1, 1, 1, currentKeyOfObj.length)
          .getValues()[0]
          .reduce((pre, cur, index) => {
            pre[dataMap[index]] = cur;
            return pre;
          }, {});
        return { status: "SUCCESS", data: result};
      } else {
        return { status : "FAILED" , data: null, msg: 'FIND NOT FOUND' };
      }
    }
  }
  getAll(table) {
   const sheet = this.app.getSheetByName(table);
    if (!sheet) {
      return [];
    } else {
      const currentKeyOfObj = sheet
        .getRange(1, 1, 1, sheet.getLastColumn())
        .getValues()[0];
      const lr = sheet
        .getRange(sheet.getMaxRows(), 1)
        .getNextDataCell(SpreadsheetApp.Direction.UP)
        .getRow();
        const dataTables = sheet
          .getRange(2, 1, lr - 1, currentKeyOfObj.length)
          .getValues();
       return dataTables.map((it) => it.reduce((pre, cur, index) => {
          pre[currentKeyOfObj[index]] = cur;
          return pre;
        }, {}));
    }
  }
  // obj la {data: danh sach du lieu}
  addAll(table, obj = {data : []}) {
    let sheet = this.app.getSheetByName(table);
    let listData = [];
    let tableFields = [];
    let currentKeyOfObj = [];
    if (!Array.isArray(obj.data)) {
      listData = [obj.data];
      tableFields = Object.keys({...obj.data , deleted: null, seqNo: null , createdAt: null, lastUpdated: null});
    } else {
      listData = obj.data;
      if (listData.length > 0) {
        tableFields = Object.keys({...listData[0] , deleted: null, seqNo: null , createdAt: null, lastUpdated: null});
      } else {
        return { status : "FAILED" , data: null, msg: 'FIND NOT FOUND' };
      }
    }
    if (!sheet) {
      Logger.log('creat table if dont exits');
      this.app.insertSheet(table);
      sheet = this.app.getSheetByName(table);
      // inset col
      sheet.getRange(1, 1, 1, tableFields.length).setValues([tableFields]);
      // sheet.hideColumns(1);
    }
    // get all col header
    currentKeyOfObj = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];
    const mapIds = sheet
      .getRange(2, 1, sheet.getLastRow(), 1)
      .getValues()
      .reduce((pre, cur, index) => {
        pre[[cur]] = index + 1;
        return pre;
      }, {});
    delete mapIds[''];
    const rs = [];
    const dataMap = currentKeyOfObj.reduce((cur, pre, index) => {
      cur[index] = pre;
      return cur;
    }, {});
    const dataNeedInsert = [];
    for (let i = 0; i < listData.length; i++) {
      const lr = sheet
        .getRange(sheet.getMaxRows(), 1)
        .getNextDataCell(SpreadsheetApp.Direction.UP)
        .getRow();
      const dataInsert = Object.keys(dataMap)
        .map( it => Number(it))
        .sort((a,b)=> a - b)
        .map((key) => listData[i][dataMap[key]]);
      if (Object.keys({...listData[i], deleted: null, seqNo: null , createdAt: null, lastUpdated: null}).length !== tableFields.length) {
        throw new Error('Column is not match.');
      }
      if (listData[i].id === null || listData[i].id === '' || mapIds[listData[i].id] === undefined) {
        // case insert
        if (dataInsert[0] == null || dataInsert[0] === '') {
          dataInsert[0] = uuid();
        }
        const indexDeleted = currentKeyOfObj.indexOf('deleted');
        const indexSeqNo = currentKeyOfObj.indexOf('seqNo');
        const indexCreatedAt = currentKeyOfObj.indexOf('createdAt');
        const indexLastUpdated = currentKeyOfObj.indexOf('lastUpdated');
        dataInsert[indexDeleted] = false;
        dataInsert[indexSeqNo] = new Date().getTime();
        dataInsert[indexCreatedAt] =  new Date().toISOString();
        dataInsert[indexLastUpdated] = new Date().toISOString();

        dataNeedInsert.push(dataInsert);
        //  sheet.getRange(lr + 1, 1, 1, tableFields.length).setValues([dataInsert]);
        mapIds[dataInsert[0]] = lr;
        listData[i].id = dataInsert[0];
        rs.push(listData[i]);
      } else {
        // case update
        const range =   sheet
          .getRange(mapIds[listData[i].id] + 1, 1, 1, tableFields.length);
        range.setNumberFormat('@');

        const indexDeleted = currentKeyOfObj.indexOf('deleted');
        const indexSeqNo = currentKeyOfObj.indexOf('seqNo');
        const indexCreatedAt = currentKeyOfObj.indexOf('createdAt');
        const indexLastUpdated = currentKeyOfObj.indexOf('lastUpdated');
        dataInsert[indexDeleted] = false;
        dataInsert[indexSeqNo] = new Date().getTime();
        dataInsert[indexCreatedAt] =  range.getValues()[0][indexCreatedAt];
        dataInsert[indexLastUpdated] = new Date().toISOString();
        range.setValues([dataInsert]);
        rs.push(listData[i]);
      }
    }
    if (dataNeedInsert.length > 0) {
      const lr = sheet
        .getRange(sheet.getMaxRows(), 1)
        .getNextDataCell(SpreadsheetApp.Direction.UP)
        .getRow();
      sheet.insertRows(sheet.getLastRow() + 1 , dataNeedInsert.length);
      const range = sheet
        .getRange(lr + 1, 1, dataNeedInsert.length, tableFields.length);
      range.setNumberFormat('@');
      range.setValues(dataNeedInsert);
    }
    return rs;
  }
  add(table, obj= {data: { deleted : false , id: null} }) {
    let tableFields = [];
    let currentKeyOfObj = [];
   let sheet = this.app.getSheetByName(table);
    if (!sheet) {
      Logger.log('creat table if dont exits');
      this.app.insertSheet(table);
      sheet = this.app.getSheetByName(table);
      Logger.log(sheet.getRange(1, 1, 1, 3).getValues());
      // inset col
      tableFields = Object.keys({...obj.data , deleted: null, seqNo: null , createdAt: null, lastUpdated: null});
      sheet.getRange(1, 1, 1, tableFields.length).setValues([tableFields]);
      // sheet.hideColumns(1);
    }
    // get header so sanh voi object client gui len
    tableFields = Object.keys({...obj.data , deleted: null, seqNo: null , createdAt: null, lastUpdated: null});
    currentKeyOfObj = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0]; // table row dau tien  ['id' , 'userName', 'seqNo' , 'deleted' , 'createdAt' , 'lastUpdated']
    if (currentKeyOfObj.length === tableFields.length) {
      // chua bi data insert row theo thu tu model
      const dataMap = currentKeyOfObj.reduce((cur, pre, index) => {
        cur[index] = pre;
        return cur;
      }, {});  // { '0' :'id' ,   '1': 'userName'  ,  '2'  : 'seqNo' ,  '3' : 'deleted' ,  '4' : 'createdAt' ,  '5' : 'lastUpdated'}
      const dataInsert = Object.keys(dataMap)
        .map( it => Number(it)) // covert về number
        .sort((a,b)=> a - b)
        .map((key) => obj.data[dataMap[key]]);
      // kiem tra create update hay delete
      const lr = sheet
        .getRange(sheet.getMaxRows(), 1)
        .getNextDataCell(SpreadsheetApp.Direction.UP)
        .getRow();
      const columnValues = sheet
        .getRange(1, 1, sheet.getLastRow(), 1)
        .getValues();
      const searchResult = columnValues.findIndex(([r]) => r == obj.data.id);
      Logger.log(searchResult);
      if (searchResult != -1) {
        // case update
        const range = sheet
          .getRange(searchResult + 1, 1, 1, tableFields.length);
        range.setNumberFormat('@');
        const indexDeleted = currentKeyOfObj.indexOf('deleted');
        const indexSeqNo = currentKeyOfObj.indexOf('seqNo');
        const indexCreatedAt = currentKeyOfObj.indexOf('createdAt');
        const indexLastUpdated = currentKeyOfObj.indexOf('lastUpdated');
        dataInsert[indexDeleted] = false;
        dataInsert[indexSeqNo] = new Date().getTime();
        dataInsert[indexCreatedAt] =  range.getValues()[0][indexCreatedAt];
        dataInsert[indexLastUpdated] = new Date().toISOString();
        range.setValues([dataInsert]);
        return { status: 'SUCCESS', data: obj.data, msg: 'UPDATE'};
      } else {

        sheet.insertRows(sheet.getLastRow() + 1 , 1);
        // case insert
        if (dataInsert[0] == null || dataInsert[0] === '') {
          dataInsert[0] = uuid();
        }
        const range =  sheet
          .getRange(lr + 1, 1, 1, tableFields.length);
        range.setNumberFormat('@');
        const indexDeleted = currentKeyOfObj.indexOf('deleted');
        const indexSeqNo = currentKeyOfObj.indexOf('seqNo');
        const indexCreatedAt = currentKeyOfObj.indexOf('createdAt');
        const indexLastUpdated = currentKeyOfObj.indexOf('lastUpdated');
        dataInsert[indexDeleted] = false;
        dataInsert[indexSeqNo] = new Date().getTime();
        dataInsert[indexCreatedAt] =  new Date().toISOString();
        dataInsert[indexLastUpdated] = new Date().toISOString();
        range.setValues([dataInsert]);
        obj.data.id = dataInsert[0];
        return { status: 'SUCCESS', data: obj.data, msg: 'INSERT'};
      }
    } else {
      return {status: "FAILED" , data: currentKeyOfObj, msg: 'Column is not match'};
    }
  }
  upload(obj) {
    let decode = Utilities.base64Decode(obj.base64.split('base64,').pop());
    let blob = Utilities.newBlob(decode, obj.type, obj.name);
    const parentFolder = DriveApp.getFolderById(DriveApp.getRootFolder().getId());
    const folders = parentFolder.getFoldersByName('CLIENT_IMAGES');
    let folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = parentFolder.createFolder('CLIENT_IMAGES');
    }
    let newFile = folder.createFile(blob);
    let link = `https://drive.google.com/uc?export=view&id=${newFile
      .setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
      .getId()}` ;
    return { status : 'SUCCESS', data: link, msg: 'UPDATE'};
  }
  databases(tables = []) {
    const result  =  tables.reduce( ( pre , curr ) => {
      const table =  curr ;
      const sheet = this.app.getSheetByName(table);
      if(!sheet) {
        return  pre;
      }
      const keyOfObj = sheet
        .getRange(1, 1, 1, sheet.getLastColumn())
        .getValues()[0];
      const lr = sheet
        .getRange(sheet.getMaxRows(), 1)
        .getNextDataCell(SpreadsheetApp.Direction.UP)
        .getRow();
      const dataTables = sheet
        .getRange(2, 1, lr - 1, keyOfObj.length)
        .getValues();
      let rs = dataTables.map((it) => it.reduce((pre, cur, index) => {
        pre[keyOfObj[index]] = cur;
        return pre;
      }, {}));
      pre[table] =  rs;
      return pre;
    } , {})
    return result;
  }
  delete(table, id) {
   const sheet = this.app.getSheetByName(table);
    if (!sheet) {
      return { status: 'FAILED', data: null, msg: 'NOT FOUND' };
    } else {
     const currentKeyOfObj = sheet
        .getRange(1, 1, 1, sheet.getLastColumn())
        .getValues()[0];
      const columnValues = sheet
        .getRange(1, 1, sheet.getLastRow(), 1)
        .getValues();
      const searchResult = columnValues.findIndex(([r]) => r === id);
      Logger.log(searchResult);
      if (searchResult !== -1) {
        const range = sheet
          .getRange(searchResult + 1, 1, 1, currentKeyOfObj.length);
        range.setNumberFormat('@');
        const indexDeleted = currentKeyOfObj.indexOf('deleted');
        const indexSeqNo = currentKeyOfObj.indexOf('seqNo');
        const indexLastUpdated = currentKeyOfObj.indexOf('lastUpdated');
        const dataUpdate = range.getValues()[0];
        dataUpdate[indexDeleted] = true;
        dataUpdate[indexSeqNo] = new Date().getTime();
        dataUpdate[indexLastUpdated] = new Date().toISOString();

        range.setValues([dataUpdate]);
          return { status: 'SUCCESS', data: null, msg: 'DELETE'};
      }
      return { status: 'FAILED', data: null, msg: 'NOT FOUND' };
    }
  }
  clear(table) {
  const sheet = this.app.getSheetByName(table);
    if (sheet) {
      this.app.deleteSheet(sheet);
      return { status: 'SUCCESS', data: null, msg: 'DELETE' };
    }  else {
      return { status: 'FAILED', data: null, msg: 'NOT FOUND' };
    }
  }
  zalo(obj) {
    if(obj.qrCode) {
      let qrCode = Utilities.base64Decode(obj.qrCode.split('base64,').pop());
      let qrCodeBlob = Utilities.newBlob(qrCode, 'image/png', 'qrCode-'+ new Date().getTime());
      const qrParentFolder = DriveApp.getFolderById(DriveApp.getRootFolder().getId());
      const qRfolders = qrParentFolder.getFoldersByName('DEVICE_REMOTE');
      let rQfolder;
      if (qRfolders.hasNext()) {
        rQfolder = qRfolders.next();
      } else {
        rQfolder = qrParentFolder.createFolder('DEVICE_REMOTE');
      }
      let newFile = rQfolder.createFile(qrCodeBlob);
      let link = `https://drive.google.com/uc?export=view&id=${newFile
        .setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
        .getId()}` ;
      obj.qrCode = link;
    }
    return { qrCode: obj.qrCode };
  }
}
