// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTbE_asouHomU6R8yfwEUYalf_d1rHh-8",
  authDomain: "barohal-store.firebaseapp.com",
  projectId: "barohal-store",
  storageBucket: "barohal-store.appspot.com",
  messagingSenderId: "929140355182",
  appId: "1:929140355182:web:6deabb24ba96409f71b67f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;