import {uuid} from "../../utils/utils";
const urlDefault = "https://zalo-chat-management-default-rtdb.asia-southeast1.firebasedatabase.app";
export default class FirebaseController {
  constructor( firebaseUrl = urlDefault) {
    this.firebaseUrl = firebaseUrl;
  }
  addAll(table = '',list = []) {
    const path = `/${table}.json`;
    const rs = UrlFetchApp.fetch(this.firebaseUrl + path + '?orderBy=%22seqNo%22&startAt=0', {
      method: "get",
      contentType: "application/json"
    });
    const listContentText = rs.getContentText();
    if(!listContentText) {
      return [];
    }
    const currentData = JSON.parse(listContentText);
    const data = list.map( (it , index) =>  ({ ...it , seqNo: new Date().getTime() + index })).reduce( (pre, curr) =>  {
       pre[curr.id || uuid()] = curr;
       if( currentData && currentData[curr.id]) {
         delete currentData[curr.id];
       }
      return pre;
    } ,  {});

    const options = {
      method: "put",
      contentType: "application/json",
      payload: JSON.stringify({...currentData , ...data})
    };
    const response = UrlFetchApp.fetch(this.firebaseUrl + path, options);
    const result = response.getContentText();
    return JSON.parse(result);
  }
   getAll(table = '') {
    const path = `/${table}.json`;
    const options = {
      method: "get",
      contentType: "application/json"
    };
    const response = UrlFetchApp.fetch(this.firebaseUrl + path, options);
    const result = response.getContentText();
    const data = JSON.parse(result);
    if(!data) {
      return [];
    }
    return  Object.values(data);
  }
  // chu y nho danh index o firebase
  getBySeqNo(table = '', maxSeqNo = 0, accessToken) {
    let auth = '';
    if(accessToken) {
      auth = `&auth=${accessToken}`
    }
    const path = `/${table}.json?orderBy=%22seqNo%22&startAt=${maxSeqNo}${auth}`;
    const options = {
      method: "get",
      contentType: "application/json",
      muteHttpExceptions: true
    };
    const response = UrlFetchApp.fetch(this.firebaseUrl + path, options);
    const result = response.getContentText();
    const data = JSON.parse(result);
    if(!data) {
      return [];
    }
    return  Object.values(data);
  }
  deleteById(table = '', id = '') {
    const path = `/${table}/${id}.json`;
    const options = {
      method: "delete",
      contentType: "application/json"
    };
    const response = UrlFetchApp.fetch(this.firebaseUrl + path, options);
    const result = response.getContentText();
    Logger.log(result); // Log kết quả xoá dữ liệu
    return {status: 'success'};
  }
   updateById(table, id, newData, accessToken) {
     let auth = '';
     if(accessToken) {
       auth = `?auth=${accessToken}`
     }
    if(!id) {
      return {status: 'error', data: null};
    }
    const path = `/${table}/${id}.json${auth}`;
    const options = {
      method: "patch",
      contentType: "application/json",
      payload: JSON.stringify({...newData, seqNo: new Date().getTime() })
    };
    const response = UrlFetchApp.fetch(this.firebaseUrl + path, options);
    const result = response.getContentText();

    Logger.log(result);
    return {status:  'success' , data: JSON.parse(result)};
  }
   getById(table = '', id = '') {
    const path = `/${table}/${id}.json`;
    const options = {
      method: "get",
      contentType: "application/json"
    };
    const response = UrlFetchApp.fetch(this.firebaseUrl + path, options);
    const result = response.getContentText();
     if(!result) {
       return {data: null, msg: 'Not found'};
     }
    const data = JSON.parse(result);
    return {data};
  }
  makeQueryString(url, params = {}) {
    const paramString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    return url + (url.indexOf('?') >= 0 ? '&' : '?') + paramString;
  };
}
