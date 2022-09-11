import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, ScrollView,
    ActivityIndicator, TouchableOpacity, Button } from 'react-native'

import { getAuth} from "firebase/auth";
import firebaseApp from "../../firebase";
import { deleteDoc, getFirestore, updateDoc, doc, getDoc, where, getDocs,
    collection, query} from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const CreateLessonScreen= (props) => {
    const [lessons, setLessons] = useState([]);
    //const date = useState(new Date());
    const [loading, setLoading] = useState(true);

    const getLessons = () => {
    
    const beginnig=new Date(2022,7,24);//Debe ser la fecha de hoy
    beginnig.setHours(0,0,1)
    const end=new Date(2022,7,24);
    end.setHours(23,59,59)
    const q = query(collection(firestore, "lessons"), where("date",">=", beginnig),where("date","<=", end));

    const querySnapshot = getDocs(q);
    const lessonsT = [];
    querySnapshot.then((result)=>{
      result.docs.forEach((doc) => {
        console.log("Desde aqui: "+JSON.stringify(doc.data()));
        const { title, description, capacity, date } = doc.data();//, availability
        lessonsT.push({
          title: "Leccion",
          data:{
            id:doc.id,
            title,
            description,
            capacity,
            date
          }
        });
      });
      setLessons(lessonsT);
      setLoading(false);
    })
  };
  useEffect(() => {
    getLessons();
  }, []);
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
    return (
        <ScrollView style={styles.container}>
            {lessons.map(lesson=>{
            return(
            <View key={lesson.data.id}>
                <TouchableOpacity 
                onPress={() => 
                    {auth.currentUser.email=="test5@email.com" ? 
                    props.navigation.navigate("SpecificAttendanceControl", {lessonId: lesson.data.id}) : 
                    props.navigation.navigate("LessonDetails", {lessonId: lesson.data.id})
                }
                    } 
                style={{ flex: 1 }}>
                <Text>{lesson.data.title}</Text>
                <Text>{auth.currentUser.email}</Text>
                </TouchableOpacity>
                <Button title="Delete" 
                    buttonStyle={
                    { maxHeight: '100%', backgroundColor: 'red' }
                    }
                    //onPress={deleteRecord(l.personId)} 
            />
            </View>
            )
        })}
        </ScrollView>
      );
}
const styles = StyleSheet.create({})
export default CreateLessonScreen;