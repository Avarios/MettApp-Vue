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
const currentUser = auth.currentUser;
const googleProvider = auth.GoogleAuthProvider;
const githubProvider = auth.GithubAuthProvider;

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const adminCollection = db.collection('admin');
const eventsCollection = db.collection('events');
const tenantsCollection = db.collection('tenants');
const userCollection = db.collection('user');

export {
    db,
    auth,
    googleProvider,
    githubProvider,
    currentUser,
    adminCollection,
    eventsCollection,
    tenantsCollection,
    userCollection
};