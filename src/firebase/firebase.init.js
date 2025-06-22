import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIFYMQi8YiKtnNml9K6BZkuRM5wQZ14gw",
  authDomain: "pro-supplier.firebaseapp.com",
  projectId: "pro-supplier",
  storageBucket: "pro-supplier.firebasestorage.app",
  messagingSenderId: "905651705886",
  appId: "1:905651705886:web:80bc601acde31d0834360f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
