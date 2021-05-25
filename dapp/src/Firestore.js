import 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export const initializeFirestore = initializeApp(
    {
        apiKey: "AIzaSyA0e4rZMFg-v_u9doyhLgtPtuGu4CtXlqE",
            authDomain: "blockchain-3e831.firebaseapp.com",
            projectId: "blockchain-3e831",
            storageBucket: "blockchain-3e831.appspot.com",
            messagingSenderId: "146430302859",
            appId: "1:146430302859:web:97b099d0560298ef69d28e"
    }
);

export const dbReference = getFirestore();


