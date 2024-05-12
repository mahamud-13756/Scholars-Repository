// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ_UXTtkTiM4fqGy7Q_R4wSXIhnr7VJe4",
  authDomain: "scholars-repository.firebaseapp.com",
  projectId: "scholars-repository",
  storageBucket: "scholars-repository.appspot.com",
  messagingSenderId: "27242521845",
  appId: "1:27242521845:web:78933de79b37aa3ba051bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;