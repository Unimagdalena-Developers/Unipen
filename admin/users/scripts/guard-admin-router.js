import { onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import database  from "../../../js/database.js"

import auth from "../../../login-and-register/assets/js/auth.js"
const container = document.querySelector('#container')
const loader = document.querySelector('#loader-container')

container.style.display = 'none'
onAuthStateChanged(auth, async (userAuth)=> {
    if(!userAuth) document.location.href = '/'
    const userDoc = await getDoc(doc(database, 'users', userAuth.uid))
    const user = userDoc.data()
    if(!user.isAdmin)  document.location.href = '/'
    else {
        container.style.display = 'block'
        loader.style.display = 'none'
    }
})
