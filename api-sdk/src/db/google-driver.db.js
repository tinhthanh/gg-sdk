// function myFunction() {
//   const db = new DbDriver("pethome");
//   const list = [ {
//     id :"ID1" ,
//     userName:"Thanh",
//     old: 10
//   },
//     {
//       id :"ID2" ,
//       userName:"Thanh2",
//       old: 10
//     }];
//   db.addAll("table_user" , list);
//   const d =  db.getAll("table_user");
//   Logger.log(d);
// }
//
// class DbDriver {
//   constructor(dataBaseName = '') {
//     this.db = openDB(dataBaseName);
//   }
//   table(tableName = '') {
//     const folders = this.db.getFoldersByName(tableName);
//     if (folders.hasNext()) {
//       // Thư mục đã tồn tại
//       Logger.log('Table ton tai: '  + tableName );
//       return folders.next();
//     } else {
//       // Tạo thư mục mới
//       const newFolder = this.db.createFolder(tableName);
//       Logger.log('Table tao moi: '  + tableName );
//       return newFolder;
//     }
//   }
//   getAll(tableName = '') {
//     try {
//       const folder = this.db.getFoldersByName(tableName).next();
//       const segmentFiles = folder.getFilesByType(MimeType.ZIP);
//       const dataObjects = [];
//
//       while (segmentFiles.hasNext()) {
//         const segmentFile = segmentFiles.next();
//         const dataCSVContent = this.getDataCSVFromSegmentZip(segmentFile);
//         if (dataCSVContent) {
//           const dataObjectsInSegment = this.parseCSVToObject(dataCSVContent);
//           dataObjects.push(...dataObjectsInSegment);
//         }
//       }
//
//       return dataObjects;
//     } catch (e) {
//       Logger.log("Đã xảy ra lỗi: " + e);
//       return [];
//     }
//   }
//
//   addAll(tableName = '', list = []) {
//     try {
//       const segmentFolder = this.table(tableName);
//
//       let currentSegment = this.getLatestSegment(segmentFolder);
//       let currentData = []; // Mảng để tích lũy dữ liệu cho segment hiện tại
//       const maxSize = 10 * 1024; // 10KB
//       Logger.log(list);
//       Logger.log('----');
//       for (const item of list) {
//         const csvContent = this.convertListToCSV([item]);
//         Logger.log(csvContent);
//         const csvBlob = Utilities.newBlob(csvContent, MimeType.CSV, "data.csv");
//         const csvSize = csvBlob.getBytes().length;
//
//         if (!currentSegment || currentData.length === 0 || this.calculateDataSize(currentData) + csvSize > maxSize) {
//           // Nếu chưa có segment hoặc kích thước tích lũy vượt quá maxSize, tạo segment mới
//           currentData = [csvBlob];
//           const newSegmentNumber = this.getExistingSegments(segmentFolder).length + 1;
//           const newSegmentName = `segment_${newSegmentNumber}.zip`;
//           Logger.log(newSegmentName);
//           Logger.log(currentData);
//           const zipBlob = Utilities.zip(currentData, newSegmentName);
//           // currentSegment = segmentFolder.createFile(newSegmentName, Utilities.zip(currentData, newSegmentName));
//           currentSegment = segmentFolder.createFile(zipBlob);
//
//         } else {
//           currentData.push(csvBlob);
//         }
//       }
//
//       Logger.log("Đã thêm dữ liệu vào segment cuối cùng thành công!");
//     } catch (e) {
//       Logger.log("Đã xảy ra lỗi: " + e);
//     }
//   }
//
//   calculateDataSize(data) {
//     return data.reduce((total, blob) => total + blob.getBytes().length, 0);
//   }
//
//   getLatestSegment(segmentFolder) {
//     const segments = this.getExistingSegments(segmentFolder);
//     return segments.length > 0 ? segments[segments.length - 1] : null;
//   }
//
//   getExistingSegments(segmentFolder) {
//     const segmentFiles = segmentFolder.getFilesByType(MimeType.ZIP);
//     const segments = [];
//     while (segmentFiles.hasNext()) {
//       segments.push(segmentFiles.next());
//     }
//     segments.sort((a, b) => a.getName().localeCompare(b.getName()));
//     return segments;
//   }
//   parseCSVToObject(csvContent) {
//     const lines = csvContent.split("\n");
//     const headers = lines[0].split(",");
//     const objects = [];
//
//     for (let i = 1; i < lines.length; i++) {
//       const values = lines[i].split(",");
//       const object = {};
//
//       for (let j = 0; j < headers.length; j++) {
//         object[headers[j]] = values[j];
//       }
//
//       objects.push(object);
//     }
//
//     return objects;
//   }
//
//   extractDataCSVFromSegmentZips(tableName = '') {
//     try {
//       const folder = this.db.getFoldersByName(tableName).next();
//       const segmentFiles = folder.getFilesByType(MimeType.ZIP);
//       const dataCSVContents = [];
//       while (segmentFiles.hasNext()) {
//         const segmentFile = segmentFiles.next();
//         const dataCSVContent = this.getDataCSVFromSegmentZip(segmentFile);
//         if (dataCSVContent) {
//           dataCSVContents.push(dataCSVContent);
//         }
//       }
//       return dataCSVContents;
//     } catch (e) {
//       Logger.log("Đã xảy ra lỗi: " + e);
//       return [];
//     }
//   }
//
//   getDataCSVFromSegmentZip(zipFile) {
//     try {
//       const zipBlob = zipFile.getBlob();
//       const filesInZip = Utilities.unzip(zipBlob);
//
//       for (const file of filesInZip) {
//         if (file.getName() === "data.csv") {
//           return file.getDataAsString();
//         }
//       }
//       return null; // Trả về null nếu không tìm thấy tệp "data.csv" trong ZIP
//     } catch (e) {
//       Logger.log("Đã xảy ra lỗi: " + e);
//       return null;
//     }
//   }
//
//   zipAndSaveObjectToDrive(tableName,zipFileName, data = []) {
//     try {
//       // Bước 1: Chuyển danh sách đối tượng thành chuỗi CSV
//       const csvContent = this.convertListToCSV(data);
//
//       // Bước 2: Nén chuỗi CSV thành tệp ZIP
//
//       const zipBlob = Utilities.zip([Utilities.newBlob(csvContent,MimeType.CSV,"data.csv" )], zipFileName);
//
//       // Bước 3: Lưu tệp ZIP vào Google Drive
//       const folder = this.db.getFoldersByName(tableName).next(); // Tìm thư mục theo tên
//
//       const files = folder.getFilesByName(zipFileName);
//       // Bước 4: Ghi đè lên tệp ZIP nếu đã tồn tại, hoặc tạo một tệp mới
//       if (files.hasNext()) {
//         const existingFile = files.next();
//         existingFile.setTrashed(true); // Xóa tệp ZIP cũ
//       }
//
//       folder.createFile(zipBlob); // Tạo một tệp ZIP mới với nội dung mới
//       Logger.log("Danh sách đối tượng đã được nén và lưu vào Google Drive thành công!");
//     } catch (e) {
//       Logger.log("Đã xảy ra lỗi: " + e);
//     }
//   }
//
//   convertListToCSV(list) {
//     if (list.length === 0) {
//       return ""; // Trả về chuỗi rỗng nếu danh sách trống
//     }
//
//     // Lấy tiêu đề cột từ thuộc tính của đối tượng đầu tiên trong danh sách
//     const headers = Object.keys(list[0]);
//
//     // Tạo nội dung CSV từ tiêu đề cột
//     let csvContent = headers.join(",") + "\n";
//
//     // Duyệt qua danh sách và thêm dữ liệu vào nội dung CSV
//     for (const item of list) {
//       const values = headers.map(header => item[header]);
//       csvContent += values.join(",") + "\n";
//     }
//
//     return csvContent;
//   }
//
//
//
// }
// function openDB(dataBaseName = '') {
//   const db = createFolderIfNotExists("DATABASE");
//   const folders = db.getFoldersByName(dataBaseName);
//   if (folders.hasNext()) {
//     // Thư mục đã tồn tại
//     Logger.log('Database ton tai: '  + dataBaseName );
//     return folders.next();
//   } else {
//     // Tạo thư mục mới
//     const newFolder = db.createFolder(dataBaseName);
//     Logger.log('Database tao moi: '  + dataBaseName );
//     return newFolder;
//   }
// }
// function createFolderIfNotExists(folderName) {
//   const rootFolder = DriveApp.getRootFolder();
//   const folders = rootFolder.getFoldersByName(folderName);
//   if (folders.hasNext()) {
//     // Thư mục đã tồn tại
//     Logger.log('Thu muc ton tai: '  + folderName );
//     return folders.next();
//   } else {
//     // Tạo thư mục mới
//     const newFolder = rootFolder.createFolder(folderName);
//     Logger.log('Thu muc tao moi: '  + folderName );
//     return newFolder;
//   }
// }
