import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5x2ZQk4Rgd-l0AsRbheQ81b_nmzpzlnU",
  authDomain: "blocking-a0dfb.firebaseapp.com",
  projectId: "blocking-a0dfb",
  storageBucket: "blocking-a0dfb.appspot.com",
  messagingSenderId: "52199701761",
  appId: "1:52199701761:web:aef1de16df560338196f00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
