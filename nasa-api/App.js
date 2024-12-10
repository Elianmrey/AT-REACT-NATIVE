import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GalleryScreen from './src/Screens/Gallery.js';
import PhotoDetailsScreen from './src/Screens/PhotoDetails.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Gallery">
        <Stack.Screen name="Gallery" component={GalleryScreen} options={{ title: 'Galeria de Fotos' }}/>
        <Stack.Screen name="ImageDetails" component={PhotoDetailsScreen} options={{ title: 'Detalhes da Foto' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
