import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, ScrollView,
    ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';

import { getAuth} from "firebase/auth";
import firebaseApp from "../../firebase";
import { deleteDoc, getFirestore, updateDoc, doc, getDoc, where, getDocs,
    collection, query} from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const SpecificLessonControlScreen= (props) => {
  const db = getFirestore(firebaseApp);
  const initialState = {
    id: "",
    title: "",
    description: "",
    capacity: "",
    availability:"",
    date:new Date('2022-08-17')
  };
  
  const [lesson, setLesson] = useState(initialState);
  const [loading, setLoading] = useState(true);
  
  const [received, setReceived] = React.useState([]);
  const [r2, setR2] = React.useState([]);
  const [r3, setR3] = React.useState([]);
  const [r4, setR4] = React.useState([]);
  const [staged, setStaged] = React.useState([]);

  const getLessonById = async (id) => {
    const docRef = doc(db, "lessons", id);
    const docSnap = await getDoc(docRef);
    const lesson = docSnap.data();
    setLesson({ ...lesson, id: id , date: new Date(lesson.date.seconds*1000)});
    setLoading(false);
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
          <Text>Hola de nuevo {lesson.description+"---"+lesson.title}</Text>
          <DraxProvider>
            <View style={styles.container}>
              <DraxView
                style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
                receivingStyle={styles.receiving}
                renderContent={({ viewState }) => {
                  const receivingDrag = viewState && viewState.receivingDrag;
                  const payload = receivingDrag && receivingDrag.payload;
                  return (
                    <>
                      <Text>Receiving Zone</Text>
                      <Text style={styles.incomingPayload}>{payload || '-'}</Text>
                      <Text style={styles.received}>{received.join(' ')}</Text>
                    </>
                  );
                }}
                onReceiveDragDrop={(event) => {
                  setReceived([
                    ...received,
                    event.dragged.payload || '?',
                  ]);
                }}
              />
              <DraxView
                style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
                receivingStyle={styles.receiving}
                renderContent={({ viewState }) => {
                  const receivingDrag = viewState && viewState.receivingDrag;
                  const payload = receivingDrag && receivingDrag.payload;
                  return (
                    <>
                      <Text>2</Text>
                      <Text style={styles.incomingPayload}>{payload || '-'}</Text>
                      <Text style={styles.received}>{r2.join(' ')}</Text>
                    </>
                  );
                }}
                onReceiveDragDrop={(event) => {
                  setR2([
                    ...r2,
                    event.dragged.payload || '?',
                  ]);
                }}
              />
              <DraxView
                style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
                receivingStyle={styles.receiving}
                renderContent={({ viewState }) => {
                  const receivingDrag = viewState && viewState.receivingDrag;
                  const payload = receivingDrag && receivingDrag.payload;
                  return (
                    <>
                      <Text>3</Text>
                      <Text style={styles.incomingPayload}>{payload || '-'}</Text>
                      <Text style={styles.received}>{r3.join(' ')}</Text>
                    </>
                  );
                }}
                onReceiveDragDrop={(event) => {
                  setR3([
                    ...r3,
                    event.dragged.payload || '?',
                  ]);
                }}
              />
              <View style={styles.palette}>
                <DraxView
                  style={[styles.centeredContent, styles.draggableBox, styles.red]}
                  draggingStyle={styles.dragging}
                  dragReleasedStyle={styles.dragging}
                  hoverDraggingStyle={styles.hoverDragging}
                  dragPayload={'R'}
                  longPressDelay={0}
                >
                  <Text>Red</Text>
                </DraxView>
                <DraxView
                  style={[styles.centeredContent, styles.draggableBox, styles.green]}
                  draggingStyle={styles.dragging}
                  dragReleasedStyle={styles.dragging}
                  hoverDraggingStyle={styles.hoverDragging}
                  dragPayload={'G'}
                  longPressDelay={0}
                >
                  <Text>Green</Text>
                </DraxView>
                <DraxView
                  style={[styles.centeredContent, styles.draggableBox, styles.blue]}
                  draggingStyle={styles.dragging}
                  dragReleasedStyle={styles.dragging}
                  hoverDraggingStyle={styles.hoverDragging}
                  dragPayload={'B'}
                  longPressDelay={0}
                >
                  <Text>Blue</Text>
                </DraxView>
                <DraxView
                  style={[styles.centeredContent, styles.draggableBox, styles.yellow]}
                  draggingStyle={styles.dragging}
                  dragReleasedStyle={styles.dragging}
                  hoverDraggingStyle={styles.hoverDragging}
                  dragPayload={'Y'}
                  longPressDelay={0}
                >
                  <Text>Yellow</Text>
                </DraxView>
              </View>
              <DraxView
                dragPayload={staged.join(' ')}
                draggable={staged.length > 0}
                renderContent={({ viewState }) => {
                  const receivingDrag = viewState && viewState.receivingDrag;
                  const payload = receivingDrag && receivingDrag.payload;
                  const dragging = viewState && viewState.dragStatus !== 0;
                  const combinedStyles = [
                    styles.centeredContent,
                    styles.receivingZone,
                    styles.cyan,
                  ];
                  if (dragging) {
                    combinedStyles.push({ opacity: 0.2 });
                  } else if (receivingDrag) {
                    combinedStyles.push(styles.receiving);
                  }
                  return (
                    <View style={combinedStyles}>
                      <Text>Staging Zone</Text>
                      <Text style={styles.incomingPayload}>{payload || '-'}</Text>
                      <Text style={styles.received}>{staged.join(' ')}</Text>
                    </View>
                  );
                }}
                renderHoverContent={({ viewState }) => {
                  const offsetStyle = viewState.grabOffset
                    ? {
                      marginLeft: viewState.grabOffset.x - 30,
                      marginTop: viewState.grabOffset.y - 30,
                    }
                    : undefined;
                  const combinedStyles = [
                    styles.centeredContent,
                    styles.draggableBox,
                    styles.cyan,
                    offsetStyle,
                  ];
                  if (viewState.dragStatus === 1) {
                    combinedStyles.push(styles.hoverDragging);
                  }
                  return (
                    <View style={combinedStyles}>
                      <Text style={styles.stagedCount}>{staged.length}</Text>
                    </View>
                  );
                }}
                onReceiveDragDrop={(event) => {
                  setStaged([
                    ...staged,
                    event.dragged.payload || '?',
                  ]);
                }}
                onDragDrop={() => setStaged([])}
              />
            </View>
          </DraxProvider>
        </ScrollView>
      );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 40
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  receivingZone: {
    height: 200,
    borderRadius: 10,
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  incomingPayload: {
    marginTop: 10,
    fontSize: 24,
  },
  received: {
    marginTop: 10,
    fontSize: 18,
  },
  palette: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  draggableBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  green: {
    backgroundColor: '#aaffaa',
  },
  blue: {
    backgroundColor: '#aaaaff',
  },
  red: {
    backgroundColor: '#ffaaaa',
  },
  yellow: {
    backgroundColor: '#ffffaa',
  },
  cyan: {
    backgroundColor: '#aaffff',
  },
  magenta: {
    backgroundColor: '#ffaaff',
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  stagedCount: {
    fontSize: 18,
  },
})
export default SpecificLessonControlScreen;