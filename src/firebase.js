// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA8tKD5CQauUxd54yfSv8viCgLEYMBxkmM',
  authDomain: 'react-disney-plus-app-dc8ed.firebaseapp.com',
  projectId: 'react-disney-plus-app-dc8ed',
  storageBucket: 'react-disney-plus-app-dc8ed.appspot.com',
  messagingSenderId: '371486993101',
  appId: '1:371486993101:web:c48ba0225abc7ba5301784'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app