import jwt_decode from "jwt-decode";
import EcommerceController from "./kiotviet/api";
import StoreController from "../server/controller/store.controller";
import TelegramController from "../server/controller/telegram.controller";
import { addMinutes } from "date-fns";
import FirebaseController from "../server/controller/firebase.controller";
const api = new EcommerceController();
const cloud = new StoreController();
const bot = new TelegramController();
const nameFc = 'jobSyncProductKiotViet';
export const jobSyncProductKiotViet = () => {
  //xoa va tao moi trigger
  makeJobSyncProduct(30);
 // end xoa va tao moi trigger
  const rs = {};
  const scriptProperties = PropertiesService.getScriptProperties();
  const keys = scriptProperties.getKeys().filter( it => it.startsWith('RetailerId_'));
  for ( let key of  keys) {
    const configStr = scriptProperties.getProperty(key);
    const  config = JSON.parse(configStr);
    const { client_secret, client_id, access_token } = config;
    if(!access_token || checkTokenExpiry(access_token)) {
      const rs = api.getToken(client_id, client_secret);
      if( rs.access_token) {
        scriptProperties.setProperty(key, JSON.stringify({...config, access_token: rs.access_token}));
        Logger.log('Renew and Save token');
        rs[key] =  jobDetails(rs.access_token);
      } else {
        Logger.log('Cấu hình không đúng ');
        return { error: 'Cấu hình không đúng' };
      }
    } else {
        rs[key] = jobDetails(access_token);
    }
  }
  return rs;
}
export const makeJobSyncProduct = (minutes = 5 ) => {
  bot.log('make job sync product: ' + minutes )
  ScriptApp.getProjectTriggers().forEach( it => {
    if( it.getHandlerFunction() === nameFc) {
      ScriptApp.deleteTrigger(it);
    }
  })
  ScriptApp.newTrigger(nameFc)
    .timeBased()
    .at(addMinutes(new Date(),minutes))
    .create();
}
export const updateStock = (client_RetailerId = '', data = [{ ProductId: 0, BranchId: 0, OnHand: 0 }]) => {
  if (!data || data.length === 0) {
    return ;
  }
  const mapIds = data.reduce((pre, cur) => {
    pre[`${cur.BranchId}_${cur.ProductId}`] = cur.OnHand;
    return pre;
  }, {});

  const oldData = cloud.getAll(String(client_RetailerId), 'products');
  const newData = oldData.content;

  newData.forEach((item) => {
    const productInventories = item.inventories;

    productInventories.forEach((child) => {
      const key = `${child.branchId}_${child.productId}`;
      if (mapIds[key]) {
        bot.log('update stock ' + child.productId + ' ' + mapIds[key]);
        child.onHand = mapIds[key];
        item.seqNo = new Date().getTime();
      }
    });
  });
  cloud.patch(client_RetailerId, 'products',newData );
  // triger call stock update
  const scriptProperties = PropertiesService.getScriptProperties();
  const configStr = scriptProperties.getProperty(`RetailerId_${client_RetailerId}`);
  if(configStr) {
    const config = JSON.parse(configStr);
    const { databaseURL } = config;
    const dbConnect = new FirebaseController(databaseURL);
    const id  = `stock-update-${client_RetailerId}`;
    bot.log('send ' +id);
    dbConnect.updateById('WEB_HOOK', id,
      {id : id, data: data, seqNo: new Date().getTime()});
  }
};

export const deleteProduct = (client_RetailerId = '' ,  ids = []) => {
  if(ids && ids.length > 0) {
     cloud.delete(String(client_RetailerId), 'products', ids);
     // triger hook to firebase
    const scriptProperties = PropertiesService.getScriptProperties();
    const configStr = scriptProperties.getProperty(`RetailerId_${client_RetailerId}`);
    if(configStr) {
      const config = JSON.parse(configStr);
      const { databaseURL } = config;
      const dbConnect = new FirebaseController(databaseURL);
      const id  = `product-delete-${client_RetailerId}`;
      bot.log('send ' +id);
      dbConnect.updateById('WEB_HOOK', id,
        {id : id, data: ids, seqNo: new Date().getTime()});
    }
  }
}
const jobDetails = (jwt = '') => {
  const remoteData = api.getAll({
     jwt ,
     path: "https://public.kiotapi.com/products",
     query: {
       includeInventory: true,
       includePricebook: true,
       IncludeSerials: true,
       IncludeBatchExpires: true,
       includeWarranties: true,
       includeQuantity : true,
       isActive: true,
       // lastModifiedFrom: "2023-08-11T23:47:26.6400000"
     } });
  const { client_RetailerId } = jwt_decode(jwt);
  // lấy data cũ ra
  const localData = cloud.getAll(String(client_RetailerId), 'products');
  // compare với data mới để chek đâu là thay đổi
   const data =  mergeData(remoteData,localData.content, String(client_RetailerId))
  const rs = cloud.patch( String(client_RetailerId), 'products', data);
   return rs;
}

// return true is expired
const checkTokenExpiry = (token = '') => {
  try {
    const decodedToken = jwt_decode(token);
    const expirationTime = decodedToken.exp;
    if (expirationTime === undefined) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime < expirationTime) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return true;
  }
}

const mergeData = (remoteData = [], localData = [], client_RetailerId = '') => {
  // Tạo đối tượng map remoteData theo id
  const remoteDataMap = remoteData.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
  // Tạo đối tượng map localData theo id
  const localDataMap = localData.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  // Tạo danh sách mergedData để lưu trữ dữ liệu sau khi kiểm tra
  const mergedData = [];
  // Bước 1: Kiểm tra và cập nhật các đối tượng từ remoteData
  const listChange = [] ;
  remoteData.forEach((remoteItem) => {
    const localItem = localDataMap[remoteItem.id];
    if (localItem) {
      // Nếu cùng id và cấu trúc không thay đổi, giữ nguyên
      if (JSON.stringify(toData(localItem)) === JSON.stringify(toData(remoteItem))) {
        mergedData.push(localItem);
      } else {
        // Nếu cùng id nhưng khác cấu trúc, cập nhật seqNo và sử dụng remoteItem
        remoteItem.seqNo = new Date().getTime();
        mergedData.push(remoteItem);
        listChange.push(remoteItem);
      }
    } else {
      // Nếu không có trong localData, thêm vào danh sách mới
      remoteItem.seqNo = new Date().getTime();
      mergedData.push(remoteItem);
      // case kiot viet them moi san pham
      listChange.push(remoteItem);
    }
  });


  // Bước 2: Kiểm tra và cập nhật các đối tượng từ localData không có trong remoteData
  localData.forEach((localItem) => {
    if (!remoteDataMap[localItem.id]) {
      // Nếu không có trong remoteData, cập nhật localItem
      if(!localItem.deleted) {
        localItem.seqNo = new Date().getTime();
        localItem.deleted = true;
        mergedData.push(localItem);
        // case delete
        listChange.push(localItem);
      }
    }
  });
  if(listChange.length > 0) {
    bot.log(`Total change ${client_RetailerId}: ${listChange.length}`);
    // triger call update
    const scriptProperties = PropertiesService.getScriptProperties();
    const configStr = scriptProperties.getProperty(`RetailerId_${client_RetailerId}`);
    if(configStr) {
      const config = JSON.parse(configStr);
      const { databaseURL } = config;
      const dbConnect = new FirebaseController(databaseURL);
      const id  = `product-update-${client_RetailerId}`;
      dbConnect.updateById('WEB_HOOK', id,
        {id : id, data: listChange, seqNo: new Date().getTime()});
    }
  }
  return mergedData;
}

const toData = (it) => {
  return {
    "id": it.id,
    "createdDate": it.createdDate  || '',
    "tradeMarkName": it.tradeMarkName || null,
    "retailerId": it.retailerId,
    "code": it.code || '',
    "barCode" : it.barCode || '',
    "name": it.name || '',
    "fullName": it.fullName || '',
    "categoryId": it.categoryId || '',
    "categoryName": it.categoryName || '',
    "allowsSale": it.allowsSale || false,
    "type": it.type || '',
    "hasVariants": it.hasVariants || '',
    "basePrice": it.basePrice || '',
    "weight": it.weight || '',
    "unit":  it.unit || '',
    "conversionValue": it.conversionValue || '',
    "description": it.description || '',
    "modifiedDate": it.modifiedDate || '',
    "isActive": it.isActive || false,
    "isLotSerialControl": it.isLotSerialControl || false,
    "isBatchExpireControl": it.isBatchExpireControl || false,
    "inventories" : (it.inventories || []) ,
    "priceBooks" : (it.priceBooks || []) ,
    "attributes" : (it.attributes || [])
  }
}
