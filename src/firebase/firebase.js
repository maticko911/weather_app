import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIMRAXh1R5KPkyQTdFlU4V55c1ZiIoHuw",
  authDomain: "weather-app-7fdf4.firebaseapp.com",
  projectId: "weather-app-7fdf4",
  storageBucket: "weather-app-7fdf4.appspot.com",
  messagingSenderId: "971594018485",
  appId: "1:971594018485:web:aee198432c02e0be9858fc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
