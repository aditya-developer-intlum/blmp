importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyAskcUibkYKjhhRqG_EVno91HHczM7HsSs",
    authDomain: "fir-cloud-messaging-db575.firebaseapp.com",
    databaseURL: "https://fir-cloud-messaging-db575.firebaseio.com",
    projectId: "fir-cloud-messaging-db575",
    storageBucket: "fir-cloud-messaging-db575.appspot.com",
    messagingSenderId: "221674420855",
    appId: "1:221674420855:web:366a235386c8f07c522472"
}
firebase.initializeApp(config)

const initMessaging = firebase.messaging()