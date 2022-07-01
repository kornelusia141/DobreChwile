import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';
import "firebase/performance";


const firebaseConfig = {
    apiKey: "AIzaSyCIrYtCT-oxWKFoqx0AfqhzbeCGCoLhtnE",
    authDomain: "dobrechwileionic.firebaseapp.com",
    projectId: "dobrechwileionic",
    storageBucket: "dobrechwileionic.appspot.com",
    messagingSenderId: "399396773561",
    appId: "1:399396773561:web:396896789e7427ba0a4568"
  };
  const app = firebase.initializeApp(firebaseConfig);
  const perf = firebase.performance();
  
 firebase.firestore().enablePersistence()
  .catch((err) => {
      if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

  export const auth = app.auth();
  export const firestore = app.firestore();
  export const storage = app.storage();