/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import Add from '../Add';
import Update from '../Update';
import { StatusBar } from 'react-native';
// import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Router = () => {
    return (
        <NavigationContainer fallback={<Text>Loading...</Text>}>
        {/* <NavigationContainer fallback={<ActivityIndicator color="blue" size="large" />}> */}
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#abc123" translucent = {true}/>
            <Stack.Navigator>
                <Stack.Screen
                 name="HomeScreen"
                 component={HomeScreen}
                 options={{
                    headerShown: false,
                 }}
                />
                <Stack.Screen
                 name="Add"
                 component={Add}
                 options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                 name="Update"
                 component={Update}
                 options={{
                    headerShown: false,
                  }}
                  getId={({ params }) => {
                    console.log({ params });
                    return params?.userId;
                  }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
