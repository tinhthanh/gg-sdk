export default class ExportExcelController {
  constructor() {}
  exportExcel(obj = {data : []}, header = [{key : '' , value: ''}],  fileName = 'file name') {
    const nameTemp = fileName;
    const app = SpreadsheetApp.create(nameTemp) ;
    let listData = [];
    let tableFields = header.map( ( item ) => item.key);
    let tableLabel = header.map( ( item ) => item.value);
    listData = obj.data;
    let sheet = app.getActiveSheet();
    // inset col]
    sheet.getRange(1, 1, 1, tableFields.length).setValues([tableLabel]);
    // get all col header
    const dataMap = tableFields.reduce((cur, pre, index) => {
      cur[index] = pre;
      return cur;
    }, {});
    const dataNeedInsert = [];
    for (let i = 0; i < listData.length; i++) {
      const dataInsert = Object.keys(dataMap)
        .map( it => Number(it))
        .sort((a,b)=> a - b)
        .map((key) => listData[i][dataMap[key]]);
        // case insert
        dataNeedInsert.push(dataInsert);
    }
      const lr = sheet
        .getRange(sheet.getMaxRows(), 1)
        .getNextDataCell(SpreadsheetApp.Direction.UP)
        .getRow();
      sheet.insertRows(sheet.getLastRow() + 1 , dataNeedInsert.length);
      const range = sheet
        .getRange(lr + 1, 1, dataNeedInsert.length, tableFields.length);
      range.setNumberFormat('@');
      range.setValues(dataNeedInsert);
    const folder = this.getStoreReport();
    const fileId = app.getId();
    const newFileExcel = DriveApp.getFileById(fileId);
   const movedFile = newFileExcel.moveTo(folder);
    // const copiedFile = DriveApp.getFileById(fileId).makeCopy(nameTemp, folder);
      const shareId = movedFile
        .setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
        .getId();
      const link = `https://docs.google.com/spreadsheets/d/${shareId}/edit?usp=sharing`;
      const linkDownload = `https://docs.google.com/spreadsheets/d/${shareId}/export?format=xlsx&gid=0`
    return { view: link ,download: linkDownload };
  }

  getStoreReport() {
    const tenThuMuc = "REPORT_EXCEL_TEMP";
    const folder = DriveApp.getRootFolder(); // lấy thư mục root
    const folders = folder.getFoldersByName(tenThuMuc);
    if (folders.hasNext()) {
      Logger.log("Thư mục đã tồn tại.");
      return folders.next();
    } else {
      Logger.log("Thư mục chưa tồn tại. Đang tạo mới...");
      const newFolder  = folder.createFolder(tenThuMuc);
      Logger.log("Thư mục đã được tạo mới.");
      return newFolder;
    }
  }
}
