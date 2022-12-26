import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeQsRrJ1Noj5Wpe6K5yJGI06-60af9Nog",
  authDomain: "playit-c67a1.firebaseapp.com",
  projectId: "playit-c67a1",
  storageBucket: "playit-c67a1.appspot.com",
  messagingSenderId: "685419660099",
  appId: "1:685419660099:web:d23d872cb52d748d1e65f6",
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