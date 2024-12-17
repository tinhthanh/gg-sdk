import { paginate } from "../../utils/utils";
import TelegramController from "./telegram.controller";
const bot = new TelegramController();
export default class StoreController {
  constructor() {}
  delete(databaseName = '' , tableName = '' , ids = []) {
    const tableF = this.getTable(databaseName , tableName);
    const dataF = tableF.getFilesByName('data.json');
    if (dataF.hasNext()) {
      const file = dataF.next();
      const content = file.getBlob().getDataAsString();
      try {
        const oldData = JSON.parse(content);
          for ( let [index, id]  of ids.entries() ) {
             bot.log('delete ' + id);
             oldData[String(id)] = {...oldData[String(id)] , deleted: true , seqNo: new Date().getTime() + index};
          }
        file.setContent(JSON.stringify(oldData));
        Logger.log("Nội dung tệp JSON:");
        return {status: 'success', msg:"update "};
      } catch (e) {
        Logger.log("Lỗi khi phân tích nội dung JSON: " + e);
        return {status: 'error', msg:"decode"};
      }
    } else {
      return {status: 'success', msg:""};
    }
  }
  getBySeqNo(databaseName = '' , tableName = '' , seqNo = 0) {
   const data = this.getAll(databaseName , tableName);
   return (data.content || []).filter( it => it.seqNo > seqNo);
  }
  // thay thế toàn bộ table bằng data mới
  patch(databaseName = '' , tableName = '', data = []) {
    const newData = (data || []).reduce( (pre , curr, index) => {
      if(curr.id) {
        pre[String(curr.id)] = curr;
      }
      return pre;
    }, {});
    const tableF = this.getTable(databaseName , tableName);
    const  dataF = tableF.getFilesByName('data.json');
    if(dataF.hasNext()) {
      const file = dataF.next();
      try {
        file.setContent(JSON.stringify(newData));
        Logger.log("Nội dung tệp JSON:");
        return {status: 'success', msg:"update json"};
      } catch (e) {
        Logger.log("Lỗi khi phân tích nội dung JSON: " + e);
      }
    } else {
      // tạo mới
      tableF.createFile('data.json', JSON.stringify(newData), MimeType.PLAIN_TEXT);
      return {status: 'success', msg:"create json"};
    }
  }
  insert(databaseName = '' , tableName = '' , data = []) {
    const newData = (data || []).reduce( (pre , curr , index) => {
      if(curr.id) {
        pre[String(curr.id)] = {...curr , seqNo: new Date().getTime() + index};
      }
      return pre;
    }, {});
    const tableF = this.getTable(databaseName , tableName);
   const  dataF = tableF.getFilesByName('data.json');
     if(dataF.hasNext()) {
       const file = dataF.next();
       const content = file.getBlob().getDataAsString();
       try {
       const oldData = JSON.parse(content);

         const rs = {...oldData, ...newData};
        file.setContent(JSON.stringify(rs));
         Logger.log("Nội dung tệp JSON:");
         return {status: 'success', msg:"update json"};
       } catch (e) {
         Logger.log("Lỗi khi phân tích nội dung JSON: " + e);
       }
     } else {
       // tạo mới
      const rs = tableF.createFile('data.json', JSON.stringify(newData), MimeType.PLAIN_TEXT);
       return {status: 'success', msg:"create json"};
     }
  }
  // pagination = {page : 0, size: 10}
  getAll(databaseName = '' , tableName = '' , pagination ) {
    const tableF = this.getTable(databaseName , tableName);
    const files = tableF.getFiles();
    let rs = {};
    while (files.hasNext()) {
      const file = files.next();
      const fileName = file.getName();
      if (fileName.indexOf(".json") !== -1) {
        const content = file.getBlob().getDataAsString();
          try {
            const oldData = JSON.parse(content);
            rs = {...rs , ...oldData};
          } catch (e) {

          }
       }
    }
    const content =  Object.values(rs);
    if(pagination) {
     const calCPage = paginate(content.length, pagination.page, pagination.size);
     const pageOfItems = content.slice(calCPage.startIndex, calCPage.endIndex + 1);
     return {
       content: pageOfItems,
       totalElements: content.length
     }
    } else {
      return {
        content,
        totalElements: content.length
      }
    }
  }

  getTable( databaseName = '' ,tableName = '') {
    const dbF = this.getDatabase(databaseName);
    const tableF = dbF.getFoldersByName(tableName);
    if(tableF.hasNext()) {
      return tableF.next();
    } else {
      const newFolder  = dbF.createFolder(tableName);
      return  newFolder
    }
  }
  getDatabase(databaseName = '') {
    const storeF =  this.getRootStore();
    const dbI = storeF.getFoldersByName(databaseName);
    if(dbI.hasNext()) {
      return dbI.next();
    } else {
      const newFolder  = storeF.createFolder(databaseName);
      return  newFolder
    }
  }
  // hàm này trả về thư mục root của store Folder
   getRootStore() {
    const tenThuMuc = "STORE_APP";
    const thuMucGoc = DriveApp.getRootFolder(); // lấy thư mục root
    const folders = thuMucGoc.getFoldersByName(tenThuMuc);
    if (folders.hasNext()) {
      Logger.log("Thư mục đã tồn tại.");
      return folders.next();
    } else {
      Logger.log("Thư mục chưa tồn tại. Đang tạo mới...");
    const newFolder  = thuMucGoc.createFolder(tenThuMuc);
      Logger.log("Thư mục đã được tạo mới.");
      return newFolder;
    }
  }
}
