import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
//import DateTimePicker from 'react-datetime-picker';
import {DateTimePicker as DateTimePicker2} from '@react-native-community/datetimepicker';
import { Button as ButtonP, Card, Title, Paragraph } from 'react-native-paper';

import { getAuth} from "firebase/auth";
import firebaseApp from "../../firebase";
import { deleteDoc, getFirestore, updateDoc, doc, getDoc, where, getDocs,
collection, query, addDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const UserLessonDetailScreen = (props) => {
  const db = getFirestore(firebaseApp);
  const initialState = {
    id: "",
    title: "",
    description: "",
    capacity: "",
    availability:"",
    date:new Date()
  };

  const [lesson, setLesson] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isReiterative, setIsReiterative] = useState(false);
  const [reservation, setReservation]=useState('');

  const handleTextChange = (value, prop) => {
    setLesson({ ...lesson, [prop]: value });
  };

  const getLessonById = async (id) => {
    const docRef = doc(db, "lessons", id);
    const docSnap = await getDoc(docRef);
    const lesson = docSnap.data();
    setLesson({ ...lesson, id: id , date: new Date(lesson.date.seconds*1000)});

    const resRef = query(collection(db, "reservations"), where("lessonId", "==", id), where("swimmerId", '==',auth.currentUser.uid));
    const resSnap = await getDocs(resRef);
    if (resSnap.size>0){
      console.log("si hay")
      setIsRegistered(true)
    }
    resSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setReservation(doc.data());
    });
    
    
    console.log("Reservation: "+JSON.stringify(reservation)); 
    setLoading(false);
  };

  const deleteLesson = async () => {
    setLoading(true)
    await deleteDoc(doc(db, "lessons", lesson.id));

    setLoading(false)
    props.navigation.navigate("LessonsList");
  };

  const openConfirmationAlert = () => {
    deleteLesson()
    Alert.alert(
      "Eliminando lección",
      "¿Está seguro?",
      [
        { text: "Sí", onPress: () => deleteLesson() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateLesson = async () => {
    try {
      const docRef = await addDoc(collection(db, "reservations"), {
        swimmerId: auth.currentUser.uid,
        lessonId: lesson.id,
        approved: false
      });
      const lessonRef = doc(db, "lessons", lesson.id);
      await updateDoc(lessonRef, {
        availability:(lesson.availability-1),
    });
    setLesson(initialState);
    props.navigation.navigate("LessonsList"); 
    } catch (error) {
      console.log(error)
    }
  };
  const updateMonthLessons = async () => {
    const lessonRef = doc(db, "lessons", lesson.id);
    const month=lesson.date.getMonth();
    const year=lesson.date.getFullYear();
    const hour = lesson.date.getHours();
    const minutes = lesson.date.getMinutes();
    var days= new Date(year, month, 0).getDate();
    const weekday = lesson.date.getDay();

    while (days>0) {
      const t_day=new Date(year, month, days,hour, minutes);
      const w_day=t_day.getDay();
      if (weekday==w_day) {
        const q = query(collection(db, "lessons"), where("date","==", t_day));
        const querySnapshot = getDocs(q);

        querySnapshot.then((result)=>{
          result.docs.forEach(async(doc) => {
            const rRef = query(collection(db, "reservations"), 
            where("lessonId", "==", lesson.id), 
            where("swimmerId", '==',auth.currentUser.uid));
            const rSnap = await getDocs(rRef);
            
          //console.log("Desde aqui: "+JSON.stringify(doc.data()));
            const { title, description, capacity, date, availability } = doc.data();
            if (availability>0 && rSnap.size==0) {
              console.log("Disponible: "+t_day)
              try {
                const docRef = await addDoc(collection(db, "reservations"), {
                  swimmerId: auth.currentUser.uid,
                  lessonId: doc.id,
                  approved: false
                });
                await updateDoc(lessonRef, {
                  availability:(availability-1),
              });
              navigation.navigate("LessonsList");
              } catch (error) {
                
              }
            }
          });    
        })
    }
    days=days-1;
    console.log("Lesson: "+JSON.stringify(lesson)+" t_day "+t_day);
    
  }}

  useEffect(() => {
    getLessonById(props.route.params.lessonId);
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
      <View>
      <Card>
        <Card.Title title={lesson.availability} subtitle="Cupos disponibles" />
        <Card.Content>
          <Title>{lesson.title}</Title>
          <Paragraph>{lesson.description}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          {!isRegistered && <ButtonP onPress={() => updateLesson()}>Reservar</ButtonP>}
          {!isRegistered && <ButtonP onPress={() => updateMonthLessons()}>Reservar para todo el mes</ButtonP>}
          {isRegistered && <ButtonP onPress={() => updateLesson()}>Cancelar reservación</ButtonP>}
          {isRegistered && <ButtonP onPress={() => updateLesson()}>Cancelar todo el mes</ButtonP>}
        </Card.Actions>
      </Card>
        
        <TextInput
          placeholder="Título"
          style={styles.inputGroup}
          value={lesson.title}
          onChangeText={(value) => handleTextChange(value, "title")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Descripción"
          style={styles.inputGroup}
          value={lesson.description}
          onChangeText={(value) => handleTextChange(value, "description")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Capacidad"
          style={styles.inputGroup}
          value={lesson.capacity}
          onChangeText={(value) => handleTextChange(value, "capacity")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Cupos disponibles"
          style={styles.inputGroup}
          value={lesson.availability}
          onChangeText={(value) => handleTextChange(value, "availability")}
        />
      </View>
      <View>
        {(Platform.OS=='android' || Platform.OS=='ios') && (
          <DateTimePicker2
            value={lesson.date}
            //onChange={onChange}
          />
        )}
        {/* {Platform.OS=='web' && (
        <View>
          <DateTimePicker style={styles.dateTimePickerI}
            onChange={(value) => handleTextChange(value, "date")}
            value={(lesson.date)}
            format="dd-MM-y hh:mm a" />
        </View>
        )} */}
      </View>
      <View style={styles.btn}>
        <Button
          title="Eliminar"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Actualizar" onPress={() => updateLesson()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
  dateTimePickerI:{
    // display: inline-block
  },
  header_text: {
    marginTop: 3,
    color: '#9E9E9E',
    fontSize: 14,
  },
});

export default UserLessonDetailScreen;