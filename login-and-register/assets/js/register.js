import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import auth from './auth.js'
import { collection , setDoc,doc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import database from '../../../js/database.js'
const formRegister = document.querySelector('.formulario__register')
const registerBtn = document.querySelector('#register-btn')

formRegister.addEventListener('submit', async (event) => {
    registerBtn.disabled = true
    registerBtn.textContent = 'Verificando...'
    event.preventDefault()
    const values = new FormData(formRegister)

    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, values.get('email'), values.get('password'))
        const collectionRef = collection(database, 'users')
        await setDoc(doc(collectionRef,userCredentials.user.uid ), {
            id:userCredentials.user.uid,
            name:values.get('name'),
            email:values.get('email'),
            photo:'https://firebasestorage.googleapis.com/v0/b/unipen-fe78e.appspot.com/o/profile-photos%2Fprofile-user.svg?alt=media&token=6503cf99-baac-44fe-89c3-f270e717d1a3',
            isAdmin:false,
            isActive:true
        })
        document.location.href = '/'

    } catch (error) {
        console.error(error);
    }
    registerBtn.disabled = false;
    registerBtn.textContent = 'Registrarse'
})
