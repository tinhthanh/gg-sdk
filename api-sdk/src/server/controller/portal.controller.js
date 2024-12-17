import FirebaseController from "./firebase.controller";
import { appConfig, domainMap } from "../app-config";
import TelegramController from "./telegram.controller";
const defaultUser = {
  userName : 'admin@gmail.com',
  pwd: 'Vetgo@123'
}
// const rootUrl = 'https://dev-api.phanmemvet.vn/public/api';
export default class PortalController {
  constructor() {}
  getConfigFromPortal(retailer = '' ,rootUrl = '') {
    const options = {
      method: 'get',
      muteHttpExceptions: true
    };
    const response = UrlFetchApp.fetch(`${rootUrl}/config-apps/app/${retailer}`, options);
    const rsText = response.getContentText();
    const bot = new TelegramController();
    bot.log(rsText);
    try {
      return JSON.parse(rsText);
    } catch (e) {
      return {error: "Data cannot found"};
    }
  }
  // domain like xxx.web.app
  getConfigByDomain(domain = '') {
    if(domainMap[domain]) {
      return this.getConfigByRetailer(domainMap[domain]);
    } else {
      return {error: "Data cannot found"}
      }
  }
  getConfigByRetailer(retailer = '', rootUrl = '') {
    let rs = null;
    const keyName = (retailer || '').toLowerCase() ;
    if(appConfig[keyName]) {
      rs = appConfig[keyName];
       } else {
       const { firebase ,sheetId } =  this.getConfigFromPortal(retailer, rootUrl) ;
       if( firebase && sheetId ) {
         try {
           rs =  {
             firebase : JSON.parse(firebase),
             sheetId: sheetId
           };
         } catch (e) {  }
        }
     }
    if( rs === null ) {
      return {error: "Data cannot found"}
    } else {
      const firebase = new FirebaseController(rs.firebase.databaseURL);
      const  { idToken } = this.loginUser( defaultUser.userName , defaultUser.pwd,rs.firebase.apiKey);
      if(idToken) { // da setup admin
        return  rs;
      } else {
        const {localId , idToken} =  this.createUser( defaultUser.userName ,defaultUser.pwd,rs.firebase.apiKey);
        // tao user admin
        const userAdmin = {
          active: true,
          address: "Support",
          date: "1995-12-11T17:00:00.000Z",
          deleted: false,
          displayName: "Support",
          email: defaultUser.userName,
          emailVerified:  false,
          id: "ADMIN",
          passport: "0981773084",
          phone: "0981773084",
          photoURL: "assets/pets/default-avatar.jpg",
          role: "SUPPER_ADMIN",
          seqNo: new Date().getTime(),
          sync: true,
          uid: localId
        }
          firebase.updateById('USERS' , "ADMIN",userAdmin, idToken );
        return rs;
      }
    }
  }
   loginUser(email = '', password = '',apiKey = '') {
    const signInUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    const response = UrlFetchApp.fetch(signInUrl, options);
    const responseData = JSON.parse(response.getContentText());
    if (responseData.idToken) {
      return responseData;
    } else {
      Logger.log("Authentication failed. Error: " + responseData.error.message);
      return responseData;
    }
  }
   createUser(userName = '', pwd = '', apiKey = '') {
    const createUserUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
    const payload = JSON.stringify({"email": userName, "password": pwd, "returnSecureToken": true});
    const response = UrlFetchApp.fetch(createUserUrl, {
      method: 'post',
      contentType: 'application/json',
      muteHttpExceptions: true,
      payload : payload
    });
    // localId , idToken
    return JSON.parse(response.getContentText());
  }
}
