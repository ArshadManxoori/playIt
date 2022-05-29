import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkWWUgWuwqS5-MoJ9VXKD8cH2iNZo3X5M",
    authDomain: "reels-c34fc.firebaseapp.com",
    projectId: "reels-c34fc",
    storageBucket: "reels-c34fc.appspot.com",
    messagingSenderId: "55270595310",
    appId: "1:55270595310:web:1e3154ed464833a7dc31ff"
  };

// Initialize Firebase (initialize khud likha hai)
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {   
    users : firestore.collection('users'),
    posts : firestore.collection('posts'),
    comments  : firestore.collection('comments'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp,   //jab hum post save kraege to latest saved post sbase upr aye iss order me sort kraenge time ke bases pe
}

export const storage = firebase.storage();