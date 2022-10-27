import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRTie0_I-0o1KR_kiLEoFAydOmrqps6SA",
  authDomain: "test-2-c7977.firebaseapp.com",
  projectId: "test-2-c7977",
  storageBucket: "test-2-c7977.appspot.com",
  messagingSenderId: "443554530925",
  appId: "1:443554530925:web:9e1c425ee7af24d6142164",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
