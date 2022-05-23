import { getFirestore  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import app from "./firebase.js"
const database = getFirestore(app)
export default database