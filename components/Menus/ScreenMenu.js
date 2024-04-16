import { View, Text} from 'react-native';
import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import Register from "../../screens/auth/Register"
import Login from "../../screens/auth/Login"
import { AuthContext } from '../../context/authContext';
import HeaderMenu from './HeaderMenu';
import About from '../../screens/About';
import Account from '../../screens/Account';
import Alerta from '../../screens/Alerta';
const ScreenMenu = () => {

    // global state
    const [state] = useContext(AuthContext)
    // auth condition true false
    const authenticatedUser = state?.user && state?.token;
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Login">
            {authenticatedUser ? 
            (<>
            <Stack.Screen  name="Home" component={Home} options={{title: "Software Innovation", headerRight: () => <HeaderMenu/>,
            }}  
            />
            <Stack.Screen  name="Alerta" component={Alerta} options={{headerBackTitle: "Back", headerRight: () => <HeaderMenu/>,
            }}  
            />
            <Stack.Screen  name="About" component={About} options={{headerBackTitle: "Back", headerRight: () => <HeaderMenu/>,
            }}  
            />
            <Stack.Screen  name="Account" component={Account} options={{headerBackTitle: "Back", headerRight: () => <HeaderMenu/>,
            }}  
            />
            </>
            ) : (
                <>
                <Stack.Screen  name="Register" component={Register} options={{ headerShown: false }}  />
                <Stack.Screen  name="Login" component={Login} options={{ headerShown: false }} /></>
            )}
          </Stack.Navigator>
      );    
};

export default ScreenMenu;