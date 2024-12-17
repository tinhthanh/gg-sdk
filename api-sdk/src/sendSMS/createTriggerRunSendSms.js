import TableCrudController from "../server/controller/table.crud.controller";
import { MANAGER_CONFIG_SHEET } from "../utils/constan.enum";

const urlLicense ="AKfycbxB-8oQowVVDen9WhD44QEja8cm_lFtQc3Sc_0dCEHkNhCFzo8hTlNVUCkagA6ms5cGKg";
const url = "https://script.google.com/macros/s/"+urlLicense+"/exec";
const deployScriptId = ScriptApp.getScriptId();
export const createTriggerRunSendSms = () => {
  // Lấy dự án hiện tại
  const scriptProperties = PropertiesService.getScriptProperties();

  const triggerId = scriptProperties.getProperty('RunSendSms');

  if (!triggerId) {
    // Tạo một trigger chạy mỗi 2 phút
    const trigger = ScriptApp.newTrigger("jobSendSms")
      .timeBased()
      .everyMinutes(1)
      .create();

    scriptProperties.setProperty('RunSendSms', trigger.getUniqueId());
    Logger.log('RunSendSms schedule created successfully.');
  }
}
const phoneProviders = {
  "109000": "MOBIFONE",
  "109100": "VINAPHONE",
  "109200": "VIETNAMMB",
  "109300": "ITEL",
  "109800": "VIETTEL",
  "109900": "GTEL",
  "109400": "REDDI"
};

function getProviderById(id) {
  if (id in phoneProviders) {
    return phoneProviders[id];
  }
  return "Unknown provider";
}

function removeAccents(str) {
  const AccentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ',
    'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ];
  for (let i = 0; i < AccentsMap.length; i++) {
    const re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    const char = AccentsMap[i][0];
    str = String(str || '').replace(re, char);
  }
  return str;
}

export const jobSendSms = () => {
  // Đây là công việc mà bạn muốn thực hiện mỗi lần
  // Đặt mã của công việc tại đây
  Logger.log("dang lấy task send sms");
  const tableCrudController = new TableCrudController();
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  let fromExecute = 8;
  let toExecute= 20;

  const resConfigExtend = tableCrudController.getById(MANAGER_CONFIG_SHEET,"CONFIG_EXTEND");
  let sender ='VNPAY';
  let keyword = 'PET';

  let ipFake ='104.21.19.101';
  if(resConfigExtend?.data?.data){
    const resConfigExtendData = JSON.parse(resConfigExtend?.data?.data);
    ipFake = resConfigExtendData?.ip ?? '104.21.19.101';
    sender = resConfigExtendData?.sender ?? 'VNPAY';
    keyword = resConfigExtendData?.keyword ?? 'PET';
    fromExecute = resConfigExtendData?.fromExecute ?? 8;
    toExecute = resConfigExtendData?.toExecute ?? 20;
  }

  if (currentHour < fromExecute || currentHour > toExecute) {
    console.log("Quá giờ hành chính config ko làm nữa nhé currentHour "+currentHour);
    return;
  }
  Logger.log("ipFake " +ipFake+" sender " +sender + " keyword "+ keyword);
  const formattedCurrentDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  console.log(formattedCurrentDate);
  currentDate.setDate(currentDate.getDate() + 1);
  const formattedNextDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  console.log(formattedNextDate);

  const items = tableCrudController.getAll('SEND_SMS_TASK').filter(it => (it.status === 'AWAIT' && it?.actionType === 'SEND_MESSAGE' && (it?.exeDate === formattedCurrentDate || it?.exeDate === formattedNextDate)));
  Logger.log(items);
  function getDataLicense() {
    const payload = {
      actionType: "getById",
      table: MANAGER_CONFIG_SHEET,
      id: deployScriptId
    };
    const options = {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(url, options);
    const responseData = JSON.parse(response.getContentText());
    if(!responseData?.data?.data){
      //update pre data config
      updateDataLicense();
    }
    return responseData;
  }

  function updateDataLicense() {
    const payload = {
      actionType: "POST",
      table: MANAGER_CONFIG_SHEET,
      data: {
        id: deployScriptId,
        data: ""
      }
    };
    const options = {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(url, options);
    const responseData = JSON.parse(response.getContentText());
    return responseData;
  }

  function findResponseById(id,responseData) {
    if(responseData && responseData.length >0){
      return responseData.find(x => x.messageId === id) ?? ""
    }else{
      return "";
    }
  }


  if (items && items.length >0) {
    const resLicense = tableCrudController.getById(MANAGER_CONFIG_SHEET,"CONFIG_VNPAY");
    Logger.log("resLicense");
    Logger.log(resLicense);
    let licence;
    if(resLicense?.data?.data){
      licence = JSON.parse(resLicense?.data?.data );

    }else{
      Logger.log("ko thấy config sms");
      return;
    }

    const apiUrl = licence.apiUrl+"/smsgw/sendSmsList"; // Thay thế bằng URL cụ thể của API
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const headers = {
      'Content-Type': 'application/json'
    };

    const data = items.map((item) => {
      const dataObject = JSON.parse(item.data);
      return {
        messageId: item.id,
        destination: dataObject?.phone,
        sender: sender,
        keyword: keyword,
        shortMessage: removeAccents(dataObject?.message),
        requestTime: currentTime
      };
    });

    // convert listtask sang list message
    const payload = {
      partnerCode: licence.partnerCode,
      secretKey: licence.secretKey,
      data: data
    };
    Logger.log('yêu cầu gửi sms');
    Logger.log(payload);
    const options = {
      method: 'post', headers: headers, contentType: 'application/json', payload: JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(apiUrl, options);
    const responseData = JSON.parse(response.getContentText());

    // Xử lý dữ liệu phản hồi từ API
    Logger.log('Xử lý dữ liệu phản hồi từ API');
    Logger.log(responseData);

    const updateData = items.map((item) => {
     // const { deleted , ...rest } = item;
      const logItem = findResponseById(item.id,responseData);
      const logItemClone = {...logItem, providerName: getProviderById(logItem?.providerId)??""};
      return {
        ...item,
        log: JSON.stringify(logItemClone),
        status: (logItem?.status === '00'? 'FINISH':'FAILED')
      };
    });
   if(updateData && updateData.length >0 ){
     Logger.log('Đã làm xong update lại task nè');
     Logger.log(updateData);
     tableCrudController.addAll('SEND_SMS_TASK',{data: updateData})

   }

  } else {
    Logger.log('Đã làm hêt task r nè');
  }

}
