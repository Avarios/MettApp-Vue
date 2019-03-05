import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyB_spCEL8cE1WdFnhR1S0daic_bh0PJaOQ",
    authDomain: "mettapp-chaos.firebaseapp.com",
    databaseURL: "https://mettapp-chaos.firebaseio.com",
    projectId: "mettapp-chaos",
    storageBucket: "mettapp-chaos.appspot.com",
    messagingSenderId: "367004575386"
  };

firebase.initializeApp(config);

const db = firebase.firestore();
const googleProvider = firebase.auth.GoogleAuthProvider;
const githubProvider = firebase.auth.GithubAuthProvider;
const FieldValue = firebase.firestore.FieldValue;
const auth = firebase.auth;
// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);


export {
    db,
    auth,
    googleProvider,
    githubProvider,
    FieldValue
};