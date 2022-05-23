
import { signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import auth from './auth.js'


const formLogin = document.querySelector('.formulario__login')
formLogin.addEventListener('submit', async (event)=> {
    event.preventDefault()
    const values =new FormData(formLogin)
    await signInWithEmailAndPassword(auth, values.get('email'), values.get('password'))   
    
    document.location.href = '/'

})
