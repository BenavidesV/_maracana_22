// import { firebaseApp } from './firebase'
// // Create a reference to the cities collection
// import { collection, query, where, getDocs } from "firebase/firestore";

// const [result, setResult]=useState('')
// const getCurrentUserInfo = () => {
    
//     const usersRef = collection(db, "usersInfo");
//     console.log("auth: "+JSON.stringify(auth.currentUser));
//     // Create a query against the collection.
//     const q = query(usersRef, where("userId", "==", 'hsaisasdhuiausud'));//auth.currentUser.uid
//     const querySnapshot = getDocs(q);
    
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       setResult(doc.data);
//     });
     
// }
// export {result};