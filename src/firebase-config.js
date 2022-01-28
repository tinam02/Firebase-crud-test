
import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC_4uK23sNHu7RTV3Ng3x5_TfO4E0GtuuU",
  authDomain: "crudtest-1f373.firebaseapp.com",
  projectId: "crudtest-1f373",
  storageBucket: "crudtest-1f373.appspot.com",
  messagingSenderId: "245484625905",
  appId: "1:245484625905:web:731e12f71c370618baee50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
