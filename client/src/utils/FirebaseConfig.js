import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDIUbDUhwUGj1arkzMViSSoPAepjxlJj74",
    authDomain: "chatapp-ea276.firebaseapp.com",
    projectId: "chatapp-ea276",
    storageBucket: "chatapp-ea276.appspot.com",
    messagingSenderId: "124984708219",
    appId: "1:124984708219:web:01eca215ba6bfb5c4ca6de",
    measurementId: "G-Q0B1X5F540"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);