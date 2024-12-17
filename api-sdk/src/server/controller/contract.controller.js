export default class ContractController {
   addContact(contacts = []) {
     let rs = [];
     for (let i = 0; i < contacts.length; i++) {
       const item = contacts[i];
       const contact = {
         "names": [
           {
             "givenName": item.fullName,
             "familyName": "",
           }
         ],
         "phoneNumbers": [
           {
             "value": item.phone,
             "type": "mobile"
           }
         ],
         "biographies": [
           {
             "value": JSON.stringify(item)
           }
         ],
         "organizations": [
           {
             "name": item.group,
             "title": "API",
             "type": "work"
           }
         ]
       };
       const response = People.People.createContact(contact);
       rs.push(response);
     }

    return rs;
  }
}
