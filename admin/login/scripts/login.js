
import { signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import auth from '../../../login-and-register/assets/js/auth.js'
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import database  from "../../../js/database.js"
const loginBtn = document.querySelector('#login-btn')

const formLogin = document.querySelector('.formulario__login')
formLogin.addEventListener('submit', async (event)=> {
    event.preventDefault()
    loginBtn.disabled = true
    loginBtn.textContent = 'Verificando...'
    try {
        const values = new FormData(formLogin)
        
        const userCredentials = await signInWithEmailAndPassword(auth, values.get('email'), values.get('password'))   
        const userDoc = await getDoc(doc(database, 'users', userCredentials.user.uid))
        const user = userDoc.data()
        if(!user.isAdmin){alert("No eres admin carajo")}
        document.location.href = '/admin/users'
    } catch (error) {
        console.error(error)
    }
    loginBtn.disabled = false;
    loginBtn.textContent = 'Entrar'
})
