import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDnd-QQfGOmNt4H_MwM2LRAO_mWb1c9sx4",
    authDomain: "site-database-62284.firebaseapp.com",
    projectId: "site-database-62284",
    databaseURL: "https://site-database-62284-default-rtdb.firebaseio.com/",
    storageBucket: "site-database-62284.firebasestorage.app",
    messagingSenderId: "870599304528",
    appId: "1:870599304528:web:6681298be8151363cf7855",
    measurementId: "G-H8JJFYXTC2"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };