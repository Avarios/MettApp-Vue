import firebase, {auth} from 'firebase';
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
const googleProvider = auth.GoogleAuthProvider;
const githubProvider = auth.GithubAuthProvider;
const FieldValue = firebase.firestore.FieldValue;
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