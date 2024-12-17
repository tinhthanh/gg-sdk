
export default class TelegramController {
   sendTelegramMessage(message = '') {
    const botToken = '6673410567:AAFlIFwjzMPgMyzAssjHnYlZfNSR-zt3Od8';
    const chatId = '-965779970';

    const apiUrl = 'https://api.telegram.org/bot' + botToken + '/sendMessage?chat_id=' + chatId + '&text=' + encodeURIComponent(message);

    const response = UrlFetchApp.fetch(apiUrl);

    return JSON.parse(response.getContentText());
  }
  log(message = '') {
    const botToken = '6146864003:AAGMpVAPNwNzAXyj9je6r79M6ivx23VUYPo';
    const chatId = '-4054738298';

    const apiUrl = 'https://api.telegram.org/bot' + botToken + '/sendMessage?chat_id=' + chatId + '&text=' + encodeURIComponent(message);

    const response = UrlFetchApp.fetch(apiUrl);

    return JSON.parse(response.getContentText());
  }
}
