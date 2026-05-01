import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWeQYQjYsWRMKwUnXz4Qpggxf0rdmp2Nc",
  authDomain: "k-click-booth.firebaseapp.com",
  projectId: "k-click-booth",
  storageBucket: "k-click-booth.firebasestorage.app",
  messagingSenderId: "633597526787",
  appId: "1:633597526787:web:f4e2a35a754c883e479f36",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();