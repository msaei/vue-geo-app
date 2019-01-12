import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC2LLsG0aa7yFE9n9OUpd1wAOeAmBujevE",
    authDomain: "vue-geo-app-4d44d.firebaseapp.com",
    databaseURL: "https://vue-geo-app-4d44d.firebaseio.com",
    projectId: "vue-geo-app-4d44d",
    storageBucket: "vue-geo-app-4d44d.appspot.com",
    messagingSenderId: "79596042169"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })
export default firebaseApp.firestore()