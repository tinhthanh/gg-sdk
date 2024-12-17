export default class SendSmsVnpayController {



    sendMessage() {
      const licence = {
        partnerCode: '950543',
        secretKey: '63a38acc-c863-4999-b0f9-c790924d0293'
      };

    const apiUrl = 'https://smsgw.vnpaytest.vn/smsgw/sendSmsList'; // Thay thế bằng URL cụ thể của API
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const headers = {
      'Content-Type': 'application/json'
    };

    const listTask = []
      // convert listtask sang list message
    const data = [
      {
        messageId: Utilities.getUuid(),
        destination: '0942298610',
        sender: 'VNPAY',
        keyword: 'PET',
        shortMessage: 'Test 1',
        requestTime: currentTime
      },
      {
        messageId: Utilities.getUuid(),
        destination: '0386566020',
        sender: 'VNPAY',
        keyword: 'PET',
        shortMessage: 'Test 2',
        requestTime: currentTime
      }
    ]

    const payload = {
      ...licence,
      data: data
    };

    const options = {
      method: 'post',
      headers: headers,
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(apiUrl, options);
    const responseData = JSON.parse(response.getContentText());

    // Xử lý dữ liệu phản hồi từ API
    Logger.log(responseData);


  }

}
