import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform, 
  Switch,
  Text
} from "react-native";
// import DateTimePicker from 'react-datetime-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import firebaseApp from "../../firebase";
import { addDoc, collection, getFirestore,
  where, getDocs, query } from "firebase/firestore";
const db = getFirestore(firebaseApp);

const CreateLessonScreen = (props) => {
  const initalState = {
    title: "",
    description: "",
    capacity: "",
    availability:"",
    date:new Date()
  };

  const [state, setState] = useState(initalState);
  const [isConcurrent, setIsConcurrent] = useState(false);
  const toggleSwitch = () => setIsConcurrent(previousState => !previousState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewLesson = async () => {
    if (state.title === "" || state.description === "" 
    || state.availability === ""|| state.capacity === "") {
      alert("Todos los campos son requeridos.");
    } else {
      if (isConcurrent) {
        const month=state.date.getMonth();
        const year=state.date.getFullYear();
        const hour = state.date.getHours();
        const minutes = state.date.getMinutes();
        var days= new Date(year, month, 0).getDate();
        const weekday = state.date.getDay();

        while (days>0) {
          const t_day=new Date(year, month, days,hour, minutes);
          const w_day=t_day.getDay();
          if (weekday==w_day) {
            console.log("w_day: "+w_day)
            const q = query(collection(db, "lessons"), where("date","==", t_day));
            const querySnapshot = getDocs(q);
            
            querySnapshot.then(async(result)=>{
              if (result.empty) {
                console.log("result is empty")
                try {
                  const docRef = await addDoc(collection(db, "lessons"), {
                    title: state.title,
                    description: state.description,
                    availability: state.availability,
                    capacity: state.capacity,
                    date: t_day,
                  });
                  
                } catch (error) {
                  console.log(error)
                }
                
              }else{
                console.log("No se puede crear la lección para la fecha: "+t_day)
              }
              });
        }
        days=days-1;
        console.log(" t_day "+t_day);
      }
      //navigation.navigate("LessonsList");

      }else{
        try {
            const q = query(collection(db, "lessons"), where("date","==", state.date));
            const querySnapshot = getDocs(q);
            
            querySnapshot.then(async(result)=>{
              if (result.empty) {
                try {
                  const docRef = await addDoc(collection(db, "lessons"), {
                    title: state.title,
                    description: state.description,
                    availability: state.availability,
                    capacity: state.capacity,
                    date: state.date,
                  });
                  navigation.navigate("LessonsList");
                  
                } catch (error) {
                  console.log(error)
                }
                
              }else{
                console.log("No se puede ya hay un evento esa fecha")
              }
              });          
          
        } catch (error) {
          console.log(error)
        }
      }
      
        // try {
        //     addDoc(collection(db, "lessons"), {
        //         title: state.title,
        //         description: state.description,
        //         availability: state.availability,
        //         capacity: state.capacity,
        //         date: state.date,
        //     });
        //     console.log("Debe salir exitoso")
        //     navigation.navigate("LessonsList");
        //   } catch (error) {
        //     console.log(error)
        //   }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="título"
          onChangeText={(value) => handleChangeText(value, "title")}
          value={state.title}
        />
      </View>

      {/* Description Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="descripción"
          onChangeText={(value) => handleChangeText(value, "description")}
          value={state.description}
        />
      </View>

      {/* Availability */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="disponibilidad"
          onChangeText={(value) => handleChangeText(value, "availability")}
          value={state.availability}
        />
      </View>
      {/* Capacity */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="capacidad"
          onChangeText={(value) => handleChangeText(value, "capacity")}
          value={state.capacity}
        />
      </View>
      {/* Date */}
      <View>
        {(Platform.OS=='android' || Platform.OS=='ios') && (
          <DateTimePicker
          onChange={(value) => handleChangeText(value, "date")}
          value={state.date}
          format="dd-MM-y hh:mm a" />
        )}
        {/* {Platform.OS=='web' && (
        <View>
          <DateTimePicker  
            onChange={(value) => handleChangeText(value, "date")}
            value={state.date}
            format="dd-MM-y hh:mm a" />
        </View>
        )} */}
      </View>
      {/* Concurrent */}
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isConcurrent ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isConcurrent}
        />
        {isConcurrent && 
          <Text>Repetir evento todo el mes</Text>
        }
        {!isConcurrent && 
          <Text>Evento único</Text>
        }
      </View>

      <View style={styles.button}>
        <Button title="Guardar lección" onPress={() => saveNewLesson()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
});

export default CreateLessonScreen;