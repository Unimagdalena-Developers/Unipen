
import { signInWithEmailAndPassword, signOut  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import auth from './auth.js'
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import database from "../../../js/database.js"
const loginBtn = document.querySelector('#login-btn')

const formLogin = document.querySelector('.formulario__login')
formLogin.addEventListener('submit', async (event)=> {
    loginBtn.disabled = true
    loginBtn.textContent = 'Verificando...'
    event.preventDefault()
    try {
        const values =new FormData(formLogin)
        const userCredentials = await signInWithEmailAndPassword(auth, values.get('email'), values.get('password'))   
        const userDoc = await getDoc(doc(database, 'users', userCredentials.user.uid))
        const user = userDoc.data()
        if(user.isActive)  {
            document.location.href = '/'

        }
        else {
            await signOut(auth)
            Swal.fire({
                title: 'Usuario inhabilitado',
        
                icon: 'error',
                confirmButtonText: 'Entendido'
            })
        }
    } catch (error) {
        console.error(error)
        Swal.fire({
            title: error.message,
    
            icon: 'error',
            confirmButtonText: 'Entendido'
        })
    }
    loginBtn.disabled = false;
    loginBtn.textContent = 'Entrar'
})
