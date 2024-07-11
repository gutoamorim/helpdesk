import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLWLKBbsUDUeAYeLZhjGgOCj9k1ggPrqg",
  authDomain: "ticket-517e5.firebaseapp.com",
  projectId: "ticket-517e5",
  storageBucket: "ticket-517e5.appspot.com",
  messagingSenderId: "251043317819",
  appId: "1:251043317819:web:0d358d46de80b33799b41e",
  measurementId: "G-LZWN8MG4X8",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
