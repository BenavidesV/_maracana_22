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
// import DateTimePicker from 'react-datetime-picker';
import {DateTimePicker as DateTimePicker2} from '@react-native-community/datetimepicker';
import firebaseApp from "../../firebase";
import { deleteDoc, getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";

const LessonDetailScreen = (props) => {
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

  const handleTextChange = (value, prop) => {
    setLesson({ ...lesson, [prop]: value });
  };

  const getLessonById = async (id) => {
    const docRef = doc(db, "lessons", id);
    const docSnap = await getDoc(docRef);
    const lesson = docSnap.data();
    setLesson({ ...lesson, id: id , date: new Date(lesson.date.seconds*1000)});
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
      const lessonRef = doc(db, "lessons", lesson.id);
      await updateDoc(lessonRef, {
        title: lesson.title,
        description: lesson.description,
        capacity: lesson.capacity,
        availability:lesson.availability,
        date:lesson.date
      
    });
    setLesson(initialState);
    props.navigation.navigate("LessonsList"); 
    } catch (error) {
      console.log(error)
    }
  };

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
  }
});

export default LessonDetailScreen;