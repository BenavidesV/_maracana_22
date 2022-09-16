import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileMenu from '../profile/ProfileMenu';


const Tab = createBottomTabNavigator();


//Elias, importe sus screems  y cambia SettingsScreen por sus componentes
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function ButtomTabs() {
  return (

    <Tab.Navigator>
      <Tab.Screen name="Calendario" component={SettingsScreen} options={{
        headerShown: false
      }} />
      <Tab.Screen name="Mis reservaciones" component={SettingsScreen} options={{
        headerShown: false
      }} />

      <Tab.Screen name="Configuraciones" component={ProfileMenu} options={{
        headerShown: false
      }} />
    </Tab.Navigator>

  );
}