import { onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

import auth from "../login-and-register/assets/js/auth.js"
onAuthStateChanged(auth, (user)=> {
    if(!user) document.location.href = '/'
})
