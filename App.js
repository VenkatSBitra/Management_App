import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './src/screens/HomeScreen'
import AddTodo from './src/screens/AddTodo'
import TodoDetail from './src/screens/TodoDetail'

import CustomHeader from './src/components/CustomHeader'

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
              header: ({scene, previous, navigation}) => {
                return <CustomHeader title="Management App" navigation={navigation} noBack />
              }
            }} 
          />
          <Stack.Screen 
            name="AddTodo"
            component={AddTodo}
            options={{
              header: ({scene, previous, navigation}) => {
                return <CustomHeader title="Add Todo" navigation={navigation} />
              }
            }} 
          />
          <Stack.Screen 
            name="TodoDetail"
            component={TodoDetail}
            options={{
              header: ({scene, previous, navigation}) => {
                return <CustomHeader title="Edit Todo" navigation={navigation} />
              }
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}