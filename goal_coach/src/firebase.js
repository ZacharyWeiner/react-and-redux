import * as firebase from 'firebase';

 var config = {
    apiKey: "AIzaSyC_hTDnXINavu2gd0eTMbEaCLKLoSnum_E",
    authDomain: "goal-coach-33b98.firebaseapp.com",
    databaseURL: "https://goal-coach-33b98.firebaseio.com",
    projectId: "goal-coach-33b98",
    storageBucket: "goal-coach-33b98.appspot.com",
    messagingSenderId: "868822722356"
  };

export const firebaseApp = firebase.initializeApp(config);
