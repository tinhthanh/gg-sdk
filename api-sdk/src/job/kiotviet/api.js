import jwt_decode from "jwt-decode";
export default class EcommerceController {
  config(key = '', value = '') {
    const scriptProperties = PropertiesService.getScriptProperties();
    scriptProperties.setProperty(key, value);
    return scriptProperties.getProperty(key);
  }
  getToken(client_id = '' , client_secret ='') {
    Logger.log(client_id);
    Logger.log(client_secret);
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    const payload = {
      "scopes": "PublicApi.Access",
      "grant_type": "client_credentials",
      "client_id": client_id,
      "client_secret": client_secret,
    };
    const response = UrlFetchApp.fetch("https://id.kiotviet.vn/connect/token", {
      method: 'POST',
      headers,
      payload,
      muteHttpExceptions: true
    });
    const result = response.getContentText();
    return JSON.parse(result);
  }
  invoiceLastModifiedFrom(jwt = '', lastModifiedFrom = '') {
    const path = `https://public.kiotapi.com/invoices?lastModifiedFrom=${lastModifiedFrom}`;
    const data = {method : 'get' , jwt , payload : null, path};
    return this.forWordCall(data);
  }
  forWordCall(data = {method : 'get' , jwt : '' , payload : {}, path: ''}) {
    const { client_RetailerCode } = jwt_decode(data.jwt);
    const headers = {
      'Retailer': client_RetailerCode,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.jwt}`
    };
    let payload = {} ;
    if(data.method === 'post') {
      payload = {payload : JSON.stringify(data.payload) };
    }
    const options = {
      method: data.method,
      headers: headers,
      ...payload,
      muteHttpExceptions: true
    };
    const response = UrlFetchApp.fetch(data.path, options);
    return JSON.parse(response.getContentText());
  }
    getAll(data = {jwt : '' , path: '',query: {} }) {
    const { client_RetailerCode } = jwt_decode(data.jwt);
    const baseUrl = data.path ;
    const pageSize = 100; // Số lượng sản phẩm lấy trong mỗi lần gọi
    try {
      // Gọi lần đầu để kiểm tra totalProducts
      const queryParams = {
        "pageSize": pageSize,
        ...data.query
      };
      const url = baseUrl + "?" + Object.keys(queryParams).map(function(key) {
        return key + "=" + encodeURIComponent(queryParams[key]);
      }).join("&");
      const params = {
        method: "get",
        headers : {
          "Retailer": client_RetailerCode,
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.jwt}`
        }
      }
      const response = UrlFetchApp.fetch(url, params);
      if (response.getResponseCode() == 200) {
        const rs = JSON.parse(response.getContentText());
        const totalProducts = rs.total;
        const promises = [];
        for (let currentItem = 0; currentItem < totalProducts; currentItem += pageSize) {
          promises.push(this.fetchPageOfAll(baseUrl, pageSize, currentItem, params, data.query));
        }
        return  [].concat(...promises);
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }
  // private
   fetchPageOfAll(baseUrl, pageSize, currentItem , params, query) {
    const queryParams = {
      "pageSize": pageSize,
      "currentItem": currentItem,
      ...query
    };
    const url = baseUrl + "?" + Object.keys(queryParams).map( (key) => {
      return key + "=" + encodeURIComponent(queryParams[key]);
    }).join("&");
    const response =  UrlFetchApp.fetch(url, params);
    if (response.getResponseCode() == 200) {
      const data = JSON.parse(response.getContentText());
      const products = data.data;
      return products;
    } else {
      return [];
    }
  }
  // TODO tạo hoá đơn sang kiot việt , và có thể tạo đơn sang portal
  createInvoice(payload, jwt = '') {
    const { client_RetailerCode } = jwt_decode(jwt);
    const url = 'https://public.kiotapi.com/invoices';
    const headers = {
      'Retailer': client_RetailerCode,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    };
    const options = {
      method: 'post',
      headers: headers,
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    return result;
  }
}

// const payload = {
//   "branchId": 1261460,
//   "purchaseDate": null,
//   "customerId": 1004256014,
//   "discount": 0,
//   "totalPayment": 10000,
//   "saleChannelId": null,
//   "method": null,
//   "accountId": 1426219,
//   "usingCod": false,
//   "soldById": 1425838,
//   "orderId": null,
//   "invoiceDetails": [{
//     "productCode": "SP102051954",
//     "quantity": 1,
//     "price": 120000,
//     "discount": null,
//     "discountRatio": null,
//     "note": ""
//   }]
// };
// set config
