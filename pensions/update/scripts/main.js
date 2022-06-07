import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import auth from "../../../login-and-register/assets/js/auth.js";
import {
  collection,
  setDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";

import database from "../../../js/database.js";
import storage from "../../../js/storage.js";
const fileInput = document.querySelector("#file-input");
const photoView = document.querySelector("#photo");
const container = document.querySelector("#container");
const loader = document.querySelector("#loader-container");
const pensionForm = document.querySelector("#pension-form");
const postBtn = document.querySelector("#post-btn");
const backBtn = document.querySelector("#back-btn");

const nameInput = document.querySelector("#name-input");
const descriptionInput = document.querySelector("#description-input");
const addressInput = document.querySelector("#address-input");
const valueInput = document.querySelector("#value-input");

container.style.display = "none";

let id = localStorage.getItem("rent-id");

let user = null;
let image = null;
onAuthStateChanged(auth, async (userFromFirebase) => {
  user = userFromFirebase;
});

const docRef = doc(database, "rents", id);
const docSnap = await getDoc(docRef);
if (!docSnap.exists()) {
  console.log("Document not found:");
}
const rent = docSnap.data();

nameInput.value = rent.name;
descriptionInput.value = rent.description;
addressInput.value = rent.address;
valueInput.value = rent.value;
photoView.srcset = rent.photo;

container.style.display = "block";
loader.style.display = "none";

fileInput.addEventListener("change", async (event) => {
  image = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    photoView.srcset = reader.result;
  };
  reader.readAsDataURL(image);
});
backBtn.addEventListener("click", async () => {
  document.location.href = "/pensions";
});
pensionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  postBtn.disabled = true;
  postBtn.textContent = "Actualizando..";

  const formData = new FormData(pensionForm);
  const collectionRef = collection(database, "rents");

  const name = formData.get("name"),
    value = formData.get("value"),
    address = formData.get("address"),
    description = formData.get("description");

  if (!(name && value && address && description && image)) {
    Swal.fire({
      title: "Llena todos los datos",

      icon: "error",
      confirmButtonText: "Entiendo",
    });
  } else {
  
    const data = {
      name,
      description,
      address,
      value,
      userId: user.uid,
      isActive: true,
    };
    const storageRef = ref(
      storage,
      `rents-photos/rent-${id}/${image.name}`
    );

    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    data.photo = url;
    await setDoc(doc(collectionRef, id), data,{merge:true});
    Swal.fire({
      title: "Pensión actualizada!",

      icon: "success",
      confirmButtonText: "Listo",
    });
  }

  postBtn.disabled = false;
  postBtn.textContent = "Actualizar";
});
