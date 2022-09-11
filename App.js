import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import PendingReservationsScreen from './screens/admin/PendingReservationsScreen';
import LessonDetailsScreen from './screens/admin/LessonDetailsScreen';
import LessonsListScreen from './screens/admin/ListLessonsScreen';
import CreateLessonScreen from './screens/admin/CreateLessonScreen';
import UserLessonDetailsScreen from './screens/users/UserLessonDetailsScreen';
import LessonControlScreen from './screens/admin/LessonControlScreen';
import SpecificLessonControlScreen from './screens/admin/SpecificLessonControlScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PendingReservations" component={PendingReservationsScreen} />
        <Stack.Screen name="LessonsList" component={LessonsListScreen} />
        <Stack.Screen name="LessonDetails" component={LessonDetailsScreen} />
        <Stack.Screen name="CreateLesson" component={CreateLessonScreen} />
        <Stack.Screen name="UserLessonDetails" component={UserLessonDetailsScreen} />
        <Stack.Screen name="AttendanceControl" component={LessonControlScreen} />
        <Stack.Screen name="SpecificAttendanceControl" component={SpecificLessonControlScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});