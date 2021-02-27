import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4PRuv7xUxtvPUmX-RxCUZC7u0eB9vUwI",
  authDomain: "whatsapp-clone-87b5e.firebaseapp.com",
  projectId: "whatsapp-clone-87b5e",
  storageBucket: "whatsapp-clone-87b5e.appspot.com",
  messagingSenderId: "72648042349",
  appId: "1:72648042349:web:1e986e7c77bf7667de9c64",
  measurementId: "G-61R8WGBL17"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db          = firebaseApp.firestore();
const auth        = firebase.auth();
const provider    = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db
