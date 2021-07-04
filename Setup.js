import * as React from 'react';
import App from './App';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCaj6ViUiGQuIrU_kXmPGa8mlC1myiRQ-U",
    authDomain: "uedapp-41d7b.firebaseapp.com",
    databaseURL: "https://uedapp-41d7b.firebaseio.com",
    projectId: "uedapp-41d7b",
    storageBucket: "uedapp-41d7b.appspot.com",
    messagingSenderId: "413395699428",
    appId: "1:413395699428:web:3f2a6afec31fa1b8860ef1",
    measurementId: "G-KHY5FKWPVH"
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