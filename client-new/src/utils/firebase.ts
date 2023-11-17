import * as firebase from "firebase/app";
import * as firebaseAuth from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDjdkEvyE9m0URAbvyFSIpJVNI-xEATs84",
    authDomain: "legacy-4ba7f.firebaseapp.com",
    projectId: "legacy-4ba7f",
    storageBucket: "legacy-4ba7f.appspot.com",
    messagingSenderId: "403289696368",
    appId: "1:403289696368:web:eae1fe6606facbbfdf6cb5",
    measurementId: "G-ES6PJGKJTJ"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebaseAuth.getAuth(app);;
