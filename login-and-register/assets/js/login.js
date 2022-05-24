
import { signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import auth from './auth.js'

const loginBtn = document.querySelector('#login-btn')

const formLogin = document.querySelector('.formulario__login')
formLogin.addEventListener('submit', async (event)=> {
    loginBtn.disabled = true
    loginBtn.textContent = 'Verificando...'
    event.preventDefault()
    try {
        const values =new FormData(formLogin)
        await signInWithEmailAndPassword(auth, values.get('email'), values.get('password'))   
        
        document.location.href = '/'
    } catch (error) {
        console.error(error)
    }
    loginBtn.disabled = false;
    loginBtn.textContent = 'Entrar'
})
