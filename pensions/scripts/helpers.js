import { doc,getDocs, collection, query, where, setDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

import database from "../../../js/database.js"

export const getRents =async  () =>  {
    const rentsRef = collection(database, "rents");

    const q = query(rentsRef, where("isActive", "==", true));

    return getDocs(q);
}

export const deleteRent = async (id) => {
    console.log(id);
    const collectionRef = collection(database, 'rents')
    return  setDoc(doc(collectionRef, id), {
        isActive:false
    }, {merge:true});
}