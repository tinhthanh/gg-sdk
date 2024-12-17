export const enumRetailer = {
  woo: 'woo',
  pkvetgo: 'pkvetgo', // for only demo,,
  phathuy: 'phathuy',
  diamond : 'diamond-vet',
  moonPet: 'moon-pet',
  thapcham: 'thapcham-vetgo',
  petshop : 'petshop-vet',
  petplus : 'petplus'
}
export const appConfig = {
  [enumRetailer.petplus]: {
   sheetId: "AKfycbxksjNgYZWqAeHWERQiXbyGh5Q8wsTfMVpJ49sZKe7dCELlxe7LIq_OFyXk0HSJmQKb",
   firebase: {
     apiKey: "AIzaSyDdKB4XXkT7sAcTTZh1Ep9_baxiabZ7jJs",
     authDomain: "petplus-vet.firebaseapp.com",
     databaseURL: "https://petplus-vet-default-rtdb.asia-southeast1.firebasedatabase.app",
     projectId: "petplus-vet",
     storageBucket: "petplus-vet.appspot.com",
     messagingSenderId: "1033394551475",
     appId: "1:1033394551475:web:5b7493a4d4075f391e0ec6",
     measurementId: "G-96FTV4MEDV"
   },
   retailer: enumRetailer.petplus
  },
  [enumRetailer.petshop]: {
    sheetId: "AKfycbzOO67gHrQFUig27Nb8jKl2TppU9JH30rL7mdjDptwiDDpjyyOJ08dffXmKckEMdh4RVg",
    firebase: {
      apiKey: "AIzaSyD1FBwmoxJnUUOMNyer5uKK3sTW-DrP-cI",
      authDomain: "petshop-vet.firebaseapp.com",
      databaseURL: "https://petshop-vet-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "petshop-vet",
      storageBucket: "petshop-vet.appspot.com",
      messagingSenderId: "267283370817",
      appId: "1:267283370817:web:c0a52c8f3e68f2aafa47c0",
      measurementId: "G-12PSW860VC"
    },
    retailer: enumRetailer.petshop
  },
  [enumRetailer.thapcham] : {
    sheetId: "AKfycby1DJyPI7dfbfZMnPQRIqnwoqX5iDt_TDkE2Kb8PTNTlIgB1aheC1zJOh-Csu2pn997",
    firebase: {
      apiKey: "AIzaSyCwydnCPnq-UUikC55tofywO68pyfihbp0",
      authDomain: "thapcham-vetgo.firebaseapp.com",
      databaseURL: "https://thapcham-vetgo-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "thapcham-vetgo",
      storageBucket: "thapcham-vetgo.appspot.com",
      messagingSenderId: "76448835845",
      appId: "1:76448835845:web:3b5910a8ff26011c3f6f6c",
      measurementId: "G-50DQJD5JSV"
    },
    retailer: enumRetailer.thapcham
  },
  [enumRetailer.moonPet]: {
    sheetId: "AKfycbxc3vqfXLpya1JPD7XpNEuekoIBNgRcyv4vrdRSCBVrMiz7gQxy6AXoGmpQR94TN2LgxA",
    firebase: {
      apiKey: "AIzaSyDY4x9WmbkXvaB9NIqjZWn53aY-0Y9Lsk0",
      authDomain: "moon-pet.firebaseapp.com",
      projectId: "moon-pet",
      storageBucket: "moon-pet.appspot.com",
      messagingSenderId: "482165610078",
      appId: "1:482165610078:web:403ad1ce8f94a8c120c6cf",
      measurementId: "G-1GE6NNL796",
      databaseURL: "https://moon-pet-default-rtdb.asia-southeast1.firebasedatabase.app"
    },
    retailer: enumRetailer.moonPet
  },
  [enumRetailer.diamond]: {
    sheetId: "AKfycbxICXgSUCWsl2_tJrqzLCz-2L6sfQJoEnYFxiTCQtGQuMEM4kJa6UyWo9Gjg3iRmnB1",
    firebase:  {
      apiKey: "AIzaSyCfqJnPL746v93B1k-HbiMvOktrp6dsNH8",
      authDomain: "diamond-vet.firebaseapp.com",
      databaseURL: "https://diamond-vet-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "diamond-vet",
      storageBucket: "diamond-vet.appspot.com",
      messagingSenderId: "1061720574160",
      appId: "1:1061720574160:web:7e60d8ae9990e10fc8b6d5",
      measurementId: "G-YNYZN2VY70"
    },
    retailer: enumRetailer.diamond
  },
  [enumRetailer.phathuy] : {
    firebase: {
      apiKey: "AIzaSyDd_omzIAPj-o0JjS9mDSgaAUtZWYIxaUk",
      authDomain: "phathuy-vetgo.firebaseapp.com",
      projectId: "phathuy-vetgo",
      storageBucket: "phathuy-vetgo.appspot.com",
      messagingSenderId: "386616370919",
      appId: "1:386616370919:web:3cf4377bb90f373e14a442",
      databaseURL: "https://phathuy-vetgo-default-rtdb.asia-southeast1.firebasedatabase.app",
      measurementId: "G-NPXFEBN0PE"
    },
    sheetId: "AKfycbxKPwjXUowbJqjDJTWrwXC7IAOLHgTzxG3vQ7q9cFKZgU4m_EdGeHbTzMTalToODG9y7Q",
    retailer: [enumRetailer.phathuy]
  },
  [enumRetailer.pkvetgo]: { // for demo
    firebase : {
      apiKey: "AIzaSyAHufb49s_cTc38UrmlWv7lezx7yGaEin8",
      authDomain: "pkvetgo.firebaseapp.com",
      databaseURL: "https://pkvetgo-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "pkvetgo",
      storageBucket: "pkvetgo.appspot.com",
      messagingSenderId: "232692028709",
      appId: "1:232692028709:web:6f52683be23a127dec36cc",
      measurementId: "G-ZZT07CSZ71"
    },
    sheetId: "AKfycbxU7dksolcWldZ3GnVj9iDnH2CWszlOvFTcifLSKg-Y0v0fTxscOmmn9RKJ5m-3QJUl",
    retailer: [enumRetailer.pkvetgo]
  },
  [enumRetailer.woo]: { // Phòng Khám Thú Y Woo
    firebase : {
      apiKey: "AIzaSyAkvfVlnsED0THvkB8Rkd1NEWkGpV6Rd-4",
      authDomain: "woo-vet.firebaseapp.com",
      databaseURL: "https://woo-vet-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "woo-vet",
      storageBucket: "woo-vet.appspot.com",
      messagingSenderId: "288726193438",
      appId: "1:288726193438:web:8003ccdf8dad653b98250f",
      measurementId: "G-86VWRZZ5LM"
    },
    sheetId: "AKfycbwoZcro1uBFUL1QqBtBDgWzPW_dC4l3IKCndxW-nA20uFRyGZ_08eDa_oIC998FP69gjA",
    retailer: enumRetailer.woo
  },
  petland: { // PETLAND
    firebase : {
      apiKey: "AIzaSyAWaHPjOoFUCj_RPqLpblrzZpLtQvQSzsQ",
      authDomain: "petland-2023.firebaseapp.com",
      databaseURL: "https://petland-2023-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "petland-2023",
      storageBucket: "petland-2023.appspot.com",
      messagingSenderId: "950334497178",
      appId: "1:950334497178:web:fd72791ab2c60d0edada23",
      measurementId: "G-CDCK7C4JQB"
    },
    sheetId: "AKfycbyFfAdcB7nl05LtU7ofTw04hn7vYwl0-0V__bDaFCPvj9YN_t0hlLmE1UsUccx1mtyZ",
    retailer: "petland"
  },
  "vetgo-01": {
    sheetId: "AKfycbwVPtWi1Sfx13sNtpSGqFBi4HBRQ1CyWCEcAtoHSPufR76xL4VJBkkIBpZ3DidWCzzT",
    firebase: {
      apiKey: "AIzaSyAOi_TN4at6W__9Jjzz31EEzMxQS5nf1s0",
      authDomain: "vetgo-01.firebaseapp.com",
      databaseURL: "https://vetgo-01-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "vetgo-01",
      storageBucket: "vetgo-01.appspot.com",
      messagingSenderId: "883303533949",
      appId: "1:883303533949:web:fcd2839a459ed1ae6e1014",
      measurementId: "G-TFR9L0R342"
    },
    retailer: "vetgo-01"
  }
}

export const domainMap = {
  ['woo-vet.web.app']: enumRetailer.woo, // Phòng Khám Thú Y Woo
  ['pkvetgo.web.app'] : enumRetailer.pkvetgo, // for only demo,
  ['phathuy-vetgo.web.app'] : enumRetailer.phathuy,
  ['diamond-vet.web.app'] : enumRetailer.diamond,
  ['moon-pet.web.app']: enumRetailer.moonPet,
  ['thapcham-vetgo.web.app'] : enumRetailer.thapcham,
  ['petshop-vet.web.app'] : enumRetailer.petshop,
  ['petplus-vet.web.app'] : enumRetailer.petplus
};
