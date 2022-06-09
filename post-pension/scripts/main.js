import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import auth from "../../login-and-register/assets/js/auth.js";
import {
  collection,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";

import database from "../../js/database.js";
import storage from "../../js/storage.js";
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

let user = null;
let image = null;
onAuthStateChanged(auth, async (userFromFirebase) => {
  user = userFromFirebase;

  container.style.display = "block";
  loader.style.display = "none";
});

fileInput.addEventListener("change", async (event) => {
  image = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    photoView.srcset = reader.result;
  };
  reader.readAsDataURL(image);
});
backBtn.addEventListener("click", async () => {
  document.location.href = "/profile";
});
pensionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  postBtn.disabled = true;
  postBtn.textContent = "Publicando...";

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
    const rentId = uuid.v4();
    const data = {
      id: rentId,
      name,
      description,
      address,
      value,
      userId: user.uid,
      isActive: true,
    };
    const storageRef = ref(
      storage,
      `rents-photos/rent-${rentId}/${image.name}`
    );

    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    data.photo = url;
    await setDoc(doc(collectionRef, rentId), data);
    Swal.fire({
      title: "Pensión publicada!",

      icon: "success",
      confirmButtonText: "Listo",
    });
    nameInput.value = "";
    descriptionInput.value = "";
    addressInput.value = "";
    valueInput.value = "";
    photoView.srcset = null;
    fileInput.value = null;
  }

  postBtn.disabled = false;
  postBtn.textContent = "Publicar";
});
