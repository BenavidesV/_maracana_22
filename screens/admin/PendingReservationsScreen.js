import React, { useState, useEffect } from "react";

import firebaseApp from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, 
    collection, query, where, getDocs } from "firebase/firestore";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const PendingReservations = () => {
  const [arrayReservations, setArrayReservations] = useState(null);
  const arrayFetch=[
    {"approved":false,"lessonId":"NFJBgU5x8VGQbZwcBavI","swimmerId":"0OKiQfz7jWQI0ttKPEKaNMLbCmg1","id":"yn5MZ6XdcqhsdqgRLcfl","fullname":"Jose prueba"}
  ]

  async function getReservations() {
    const tempArray=[];
    const q = query(collection(firestore, "reservations"), where("approved", "==", false));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async(doc) => {
    // doc.data() is never undefined for query doc snapshots
    const tempReservation=doc.data();
    tempReservation.id=doc.id;
    
    const tempFullname=query(collection(firestore, "usersInfo"), where("userId", "==", doc.data().swimmerId));
    const querySnapshotSwimmer = await getDocs(tempFullname);
    querySnapshotSwimmer.forEach((dos)=>{
        tempReservation.fullname=dos.data().fullname;
    })
    console.log("tempReservation: "+JSON.stringify(tempReservation));
    tempArray.push(tempReservation);
    });

    
    return(tempArray);
  }

  useEffect(() => {
    async function fetchReservations() {
      const fetchedReservations = await getReservations();
      setArrayReservations(fetchedReservations);
    }

    fetchReservations();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={arrayFetch} renderItem={({item})=><Text style={styles.item}>{item.fullname}</Text>} keyExtractor={item => item.id} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
export default PendingReservations;