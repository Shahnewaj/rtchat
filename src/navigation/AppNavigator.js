import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screen/ChatScreen';
import LoginScreen from '../screen/LoginScreen';
import UserlistScreen from '../screen/UserlistScreen';

const Stack = createNativeStackNavigator();


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Userlist" component={UserlistScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Chat" component={ChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator