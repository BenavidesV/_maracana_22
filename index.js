import { registerRootComponent } from 'expo';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately



export default function Main() {
    return (
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  }
  AppRegistry.registerComponent('main', () => Main);
