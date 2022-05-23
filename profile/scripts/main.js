import { signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import auth from "../../Login-y-registro/assets/js/auth.js"
import { ref,uploadBytes,getDownloadURL   } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";
import {doc, getDoc,collection, setDoc   } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import database from "../../js/database.js"
import storage from "../../js/storage.js"

const container = document.querySelector('#container')
container.style.display = "none"
window.addEventListener('DOMContentLoaded', async (event) => {
    const fileInput = document.querySelector('#file-input')
    const signOutBtn = document.querySelector('#sign-out-btn')
    const updateBtn = document.querySelector('#update-btn')
    const backBtn = document.querySelector('#back-btn')
    const photoView = document.querySelector('#photo')
    const loader = document.querySelector('#loader')
    let user = null;
    let image = null;

    onAuthStateChanged(auth, async (userFromFirebase)=> {
        const document = await getDoc(doc(database, 'users', userFromFirebase.uid))
        user = document.data()
        image = user.photo
        photoView.srcset = image
        container.style.display = "block"
        loader.style.display = "none"
    })
    backBtn.addEventListener('click', async ()=> {
        document.location.href = '/'
    })
    signOutBtn.addEventListener('click', async ()=> {
        await signOut(auth)
        document.location.href = '/'
    })
    
    updateBtn.addEventListener('click', async ()=> {
        updateBtn.disabled = true;
        updateBtn.textContent = 'Actualizando...';
        if(image) {
            const storageRef = ref(storage,`profile-photos/user-${user.uid}/${image.name}`)
    
            uploadBytes(storageRef, image).then(async () => {               
                const url = await getDownloadURL(storageRef)
                const collectionRef = collection(database, 'users')
                await setDoc(doc(collectionRef,user.id ), {
                    photo:url
                }, {merge:true})
                Swal.fire({
                    title: 'Perfil actualizado!',
             
                    icon: 'success',
                    confirmButtonText: 'Listo'
                  })
                updateBtn.disabled = false;
                updateBtn.textContent = 'Actualizar';

            });
        }
    
    })
    
    
    fileInput.addEventListener('change', async (event)=> {
        image = event.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            photoView.srcset= reader.result
        }
        reader.readAsDataURL(image)
    })
});
