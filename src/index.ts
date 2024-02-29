import { App } from "./app";
const PORT = 3000;
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDOU29-JS4rGVeL6sOmDnx7X7Cm0tZnIyE",
  authDomain: "webscraping-ff160.firebaseapp.com",
  projectId: "webscraping-ff160",
  storageBucket: "webscraping-ff160.appspot.com",
  messagingSenderId: "305971074670",
  appId: "1:305971074670:web:6901b9061f065195d3787f",
  databaseURL: process.env.DATABASE_NAME,
};


const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

new App().server.listen(PORT, () => {
  firebaseApp
  console.log(`Server is listening at http://localhost:${PORT}`);
});
