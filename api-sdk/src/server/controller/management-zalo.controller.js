
export default class ManagementZaloController {
  getLicense(id = '') {
      const payload = {
        "actionType": "GET",
        "table": "MANAGER_SHEET",
        "seqNo": 0
      }
      const options = {
        method: 'post',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      };
      const url  = 'https://script.google.com/macros/s/AKfycbxB-8oQowVVDen9WhD44QEja8cm_lFtQc3Sc_0dCEHkNhCFzo8hTlNVUCkagA6ms5cGKg/exec';
      const response = UrlFetchApp.fetch(url, options);
      try {
        return JSON.parse(response.getContentText()).filter( item => item.id === id);
      } catch (error) {
        return [];
      }
    }
}
