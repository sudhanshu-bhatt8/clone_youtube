
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCH0F96-TahqoK4ejiELGthJ5NsDDReOEk",
  authDomain: "video-c91fe.firebaseapp.com",
  projectId: "video-c91fe",
  storageBucket: "video-c91fe.appspot.com",
  messagingSenderId: "153355927475",
  appId: "1:153355927475:web:891a79b7cca127511c55c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app