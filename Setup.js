import * as React from 'react';
import App from './App';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase, Auth, database}

function Setup(){
    return(
        <App/>
    );
}

export default Setup;
