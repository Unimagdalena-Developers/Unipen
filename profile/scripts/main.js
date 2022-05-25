import { signOut, onAuthStateChanged,updateEmail  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import auth from "../../login-and-register/assets/js/auth.js"
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";
import { doc, getDoc, collection, setDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import database from "../../js/database.js"
import storage from "../../js/storage.js"

const container = document.querySelector('#container')
container.style.display = "none"
window.addEventListener('DOMContentLoaded', async (event) => {
    document.querySelector('#link-post-rent-btn').addEventListener('click', async (event) => {
        document.location.href = '/post-pension'
    })

    const fileInput = document.querySelector('#file-input')
    const signOutBtn = document.querySelector('#sign-out-btn')
    const updateBtn = document.querySelector('#update-btn')

    const backBtn = document.querySelector('#back-btn')
    const photoView = document.querySelector('#photo')
    const loader = document.querySelector('#loader-container')
    const profileForm = document.querySelector('#profile-form')
    const emailInput = document.querySelector('#email-input')
    const nameInput = document.querySelector('#name-input')

    let user = null;
    let image = null;
    onAuthStateChanged(auth, async (userFromFirebase) => {
        const document = await getDoc(doc(database, 'users', userFromFirebase.uid))
        user = document.data()
        
        photoView.srcset = user.photo
        emailInput.value = userFromFirebase.email
        nameInput.value = user.name
        container.style.display = "block"
        loader.style.display = "none"
    })
    backBtn.addEventListener('click', async () => {
        document.location.href = '/'
    })
    signOutBtn.addEventListener('click', async () => {
        await signOut(auth)
        document.location.href = '/'
    })



    fileInput.addEventListener('change', async (event) => {
        image = event.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            photoView.srcset = reader.result
        }
        reader.readAsDataURL(image)
    })

    profileForm.addEventListener('submit', async (event) => {
        event.preventDefault();
       
        updateBtn.disabled = true;
        updateBtn.textContent = 'Actualizando...';
        const collectionRef = collection(database, 'users')
        const newData = {}
        if (image) {
            const storageRef = ref(storage, `profile-photos/user-${user.uid}/${image.name}`)
    
            await uploadBytes(storageRef, image)
            const url = await getDownloadURL(storageRef)
            newData.photo = url
          
        }
        
        if(emailInput.value != user.email) {
            await updateEmail(auth.currentUser, emailInput.value)
        }
        if(nameInput.value != user.name) {
            newData.name = nameInput.value
        }

        if( Object.keys(newData).length !== 0){
            await setDoc(doc(collectionRef, user.id), newData, { merge: true })
        }
    
        Swal.fire({
            title: 'Perfil actualizado!',
    
            icon: 'success',
            confirmButtonText: 'Listo'
        })
        updateBtn.disabled = false;
        updateBtn.textContent = 'Actualizar';
    })
});
