import React, { useState, useEffect } from "react";
import { 
  Button, 
  StyleSheet, 
  SectionList, 
  StatusBar, 
  View, 
  Text,
  TouchableOpacity,
  Platform
} from "react-native";

import { FlatList, ScrollView } from "react-native-gesture-handler";
// import DateTimePicker from 'react-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebaseApp from "../../firebase";
import { getAuth} from "firebase/auth";
import { getFirestore,collection, query, getDocs, where } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const ListLessonsScreen = (props) => {
  const [lessons, setLessons] = useState([]);
  const [date, setDate] = useState(new Date());

  const getLessons = (value) => {
    setDate(value, "date");
    const beginnig=new Date(value);
    beginnig.setHours(0,0,1)
    const end=new Date(value);
    end.setHours(23,59,59)
    const q = query(collection(firestore, "lessons"), where("date",">=", beginnig),where("date","<=", end));

    const querySnapshot = getDocs(q);
    const lessonsT = [];
    querySnapshot.then((result)=>{
      result.docs.forEach((doc) => {
      //console.log("Desde aqui: "+JSON.stringify(doc.data()));
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
      //return lessonsT
    })
  };
  
  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateLesson")}
        title="Crear lección"
      />
      {/* Date */}
      <View>
        {(Platform.OS=='android' || Platform.OS=='ios') && (
          <DateTimePicker
            value={date}
            onChange={(value) => getLessons(value)}
            disableClock={true}
            format="dd-MM-y" />
        )}
        {/* {Platform.OS=='web' && (
        <View>
          <DateTimePicker  
            onChange={(value) => getLessons(value)}
            value={date}
            disableClock={true}
            format="dd-MM-y" />
        </View>
        )} */}
        </View>
      {lessons.map(lesson=>{
        return(
          <View key={lesson.data.id}>
            <TouchableOpacity 
              onPress={() => 
                {auth.currentUser.email=="test5@email.com" ? 
                props.navigation.navigate("LessonDetails", {lessonId: lesson.data.id}) : 
                props.navigation.navigate("UserLessonDetails", {lessonId: lesson.data.id})
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
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  row: {
    marginHorizontal: 15,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  rowText: {
    fontSize: 18,
  },
  create_todo_button: {
    marginTop: 6,
    marginLeft: 15,
    height: 40,
  },
});
export default ListLessonsScreen;