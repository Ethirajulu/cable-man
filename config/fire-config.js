import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBQFHwJ6rWNKNAF5DBV48pgl_2e9xo02AI",
  authDomain: "cable-63f56.firebaseapp.com",
  databaseURL: "https://cable-63f56.firebaseio.com",
  projectId: "cable-63f56",
  storageBucket: "cable-63f56.appspot.com",
  messagingSenderId: "480409684546",
  appId: "1:480409684546:web:68f892121557b8060f7bdb",
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
const fire = firebase;

export const db = firebase.firestore();

export default fire;
