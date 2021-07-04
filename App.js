import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './Scr/Home';
import { Login } from './Scr/Login';
import { Signup } from './Scr/Signup';
import { DataRTimeScreen } from './Scr/DataRTime';
import { PostScreen } from './Scr/Post';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none' initialRouteName='DataRTime'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="DataRTime" component={DataRTimeScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;