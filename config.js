import * as firebase from 'firebase';
require ('@firebase/firestore');
const firebaseConfig = {
    apiKey: "AIzaSyAa28_ogY73lp0mXaPcLGPaFQcU1NQyOqU",
    authDomain: "willy-library-organiser.firebaseapp.com",
    databaseURL: "https://willy-library-organiser.firebaseio.com",
    projectId: "willy-library-organiser",
    storageBucket: "willy-library-organiser.appspot.com",
    messagingSenderId: "675038018086",
    appId: "1:675038018086:web:7bc73712475431dc8fc4e7",
    measurementId: "G-VZ7VYMRSWM"
  };
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()