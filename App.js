import React, { useEffect, useState } from 'react'
import Home from './src/components/Home'
import Signup from './src/components/Signup'
import Profile from './src/components/Profile'
import {Text , View} from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'
import Login from './src/components/Login';
import Message from './src/components/Message'
import Chat from './src/components/Chat'
import firestore from '@react-native-firebase/firestore'
const theme = {
  ...DefaultTheme,
  roundness: 2,

  colors: {
    ...DefaultTheme.colors,
    primary: "#00f"
  }
};
const Stack = createStackNavigator();
const Navigation = () => {
  const [user, setUser] = useState('')
  useEffect(() => {
    const unregister = auth().onAuthStateChanged(userExist => {
      if (userExist){
        setUser(userExist)
        firestore().collection('users')
        .doc(userExist.uid)
        .update({
          status:'online'
        })
      }
      else setUser('')
    })
    return () => {
      unregister()
    }
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          user ?
          <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Message"  options={{  headerShown: false}} >
              {props => <Message {...props} user={user}/>}
              </Stack.Screen>
            <Stack.Screen name="Chat"   options={({ route }) => ({ title:<View>
              <Text>{ route.params.name }</Text>
              <Text>{ route.params.status }</Text>
              </View>}) } >
            {props => <Chat {...props} user={user}/>}
              </Stack.Screen>
              <Stack.Screen name="Profile"  options={{  headerShown: false}} >
              {props => <Profile {...props} user={user}/>}
              </Stack.Screen>
              
            </>
            :
            <>
              <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="signup" component={Signup} options={{ headerShown: false }} />
            </>
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}




const App = () => {

  return (
    <>
      <PaperProvider theme={theme}>
        {/* <Signup /> */}
        <Navigation />
      </PaperProvider>
    </>
  )

}


export default App

















