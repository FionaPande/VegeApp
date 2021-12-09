import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDvN_Yows9Qqv7n13SnZb6siuFGTdH3xEs",
    authDomain: "vegancosmeticsapp.firebaseapp.com",
    databaseURL: "https://vegancosmeticsapp.firebaseio.com",
    projectId: "vegancosmeticsapp",
    storageBucket: "vegancosmeticsapp.appspot.com",
    messagingSenderId: "626794217788",
    appId: "1:626794217788:web:cc8c66c4d5991f5f9dde39",
    measurementId: "G-Z7Z2JGH4DS"
  };
firebase.initializeApp(firebaseConfig);

export default firebase;