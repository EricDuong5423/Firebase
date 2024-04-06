import { initializeApp } from 'firebase/app'
import {
    collection,
    getDocs,
    getFirestore,
    addDoc,
    deleteDoc,
    doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDL1dUjFBeB2YRYwAVi-Sh7rhduCUbVE5A",
    authDomain: "learn-firebase-11974.firebaseapp.com",
    projectId: "learn-firebase-11974",
    storageBucket: "learn-firebase-11974.appspot.com",
    messagingSenderId: "1016068703764",
    appId: "1:1016068703764:web:6169c7ea58b14da3f90901"
};

//init firebase app
initializeApp(firebaseConfig)

//init services
const db = getFirestore()

//collection ref
const colRef = collection(db, 'books')

var books = []

//adding documents
const addBookform = document.querySelector('.add')
addBookform.addEventListener('submit', (e)=>{
    //Preventing refesh page after a submit
    e.preventDefault()

    addDoc(colRef, {
        title: addBookform.title.value,
        author: addBookform.author.value
    })
    .then(() => {
        addBookform.reset()
        getDocs(colRef)
            .then((snapshot) => {
                snapshot.docs.forEach((doc) =>{
                    books.push({id: doc.id})
                })
                console.log(books)
            })
            .catch(err => {
                console.log(err.message)
            })
    })
})

//deleting documents
const deleteBookform = document.querySelector('.delete')
deleteBookform.addEventListener('submit', (e)=>{
    //Preventing refesh page after a submit
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookform.id.value)

    deleteDoc(docRef)
    .then(() => {
        deleteBookform.reset()
    })
})