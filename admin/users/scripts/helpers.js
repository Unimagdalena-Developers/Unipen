import { doc,getDocs, collection, query, where, setDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

import database from "../../../js/database.js"

export const getUsers =async  () =>  {
    const usersRef = collection(database, "users");

    const q = query(usersRef, where("isAdmin", "==", false), where("isActive", "==", true));

    return getDocs(q);
}

export const deleteUserFromFirestore = async (id) => {
    const collectionRef = collection(database, 'users')
    return  setDoc(doc(collectionRef, id), {
        isActive:false
    }, {merge:true});
}