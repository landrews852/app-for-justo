// import firebase from 'firebase/app';
// import 'firebase/auth';

// firebase.initializeApp({
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   databaseURL: 'mongodb://localhost:3005/justo-mongodb',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// });

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// para instalar firebase cli:
// npm install -g firebase-tools

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDD1_1Mchaox7qgLKHFYx7JQVl6BjcB0tk',
  authDomain: 'app-justo-17725.firebaseapp.com',
  projectId: 'app-justo-17725',
  storageBucket: 'app-justo-17725.appspot.com',
  messagingSenderId: '857959821743',
  appId: '1:857959821743:web:c86cdf6dd76eef50baff5a',
  measurementId: 'G-DV6VXVV2XG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
