import { doc,getDocs, collection, query, where, setDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

import database from "../../../js/database.js"

export const getRents =async  (userId,isAdmin) =>  {
	const rentsRef = collection(database, "rents");
	let q;
	if(isAdmin) {
		q = query(rentsRef, where("isActive", "==", true));
	}else {
		q = query(rentsRef, where("isActive", "==", true),where("userId", "==", userId));

	}
	return getDocs(q);
}

export const deleteRent = async (id) => {
	const collectionRef = collection(database, 'rents')
	return  setDoc(doc(collectionRef, id), {
		isActive:false
	}, {merge:true});
}