import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBvWvqGWEXcUu9GHDmzECWKsO4FRKxpdeM",
  authDomain: "mombabymilk-inventory.firebaseapp.com",
  projectId: "mombabymilk-inventory",
  storageBucket: "mombabymilk-inventory.appspot.com",
  messagingSenderId: "355943726006",
  appId: "1:355943726006:web:2b834a23ed34989dc75f17",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
