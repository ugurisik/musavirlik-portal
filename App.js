import React, { useEffect, useState, useReducer } from 'react';
import styles from './imports/styles';
import { AppRegistry, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, SafeAreaView, Dimensions, StatusBar } from 'react-native';
// import colors from './imports/colors';
import { sha256 } from 'js-sha256';
// import { SECRET_KEY } from '@env';
import axios from 'axios';
// import DocumentScanner from 'react-native-document-scanner-plugin'
import Resim from './imports/resim';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './imports/dashboard';
import Loginpage from './imports/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MasraflariYukle from './imports/Home/masraflariyukle';
import { useNavigation } from '@react-navigation/native';
import colors from './imports/colors';
import Alisfatura from './imports/Home/alisfatura';
import Satisfatura from './imports/Home/satisfatura';
import Sgkkimlik from './imports/Home/sgkkimlik';
import Fisfatura from './imports/Home/fisfatura';
import Otpsayfasi from './imports/otpsayfasi';
import Duyurular from './imports/Footer/Duyurular';
import Menu from "./imports/menu";
import Firmadetay from './imports/firmadetay';
import Bildirimler from './imports/bildirimler';
import { firebase } from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { NativeModules } from 'react-native';
import useTokenControl from './imports/useTokenControl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';
import Musavirdengelenler from './imports/Home/musavirdengelenler';

const Stack = createNativeStackNavigator();

function MainContent() {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loginpage" component={Loginpage} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="Masraflariyukle" component={MasraflariYukle} options={{ headerShown: false }} />
          <Stack.Screen name="Alisfatura" component={Alisfatura} options={{ headerShown: false }} />
          <Stack.Screen name="Satisfatura" component={Satisfatura} options={{ headerShown: false }} />
          <Stack.Screen name="Sgkkimlik" component={Sgkkimlik} options={{ headerShown: false }} />
          <Stack.Screen name="Fisfatura" component={Fisfatura} options={{ headerShown: false }} />
          <Stack.Screen name="Otpsayfasi" component={Otpsayfasi} options={{ headerShown: false }} />
          <Stack.Screen name="Duyurular" component={Duyurular} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
          <Stack.Screen name="Firmadetay" component={Firmadetay} options={{ headerShown: false }} />
          <Stack.Screen name="Bildirimler" component={Bildirimler} options={{ headerShown: false }} />
          <Stack.Screen name="Musavirdengelenler" component={Musavirdengelenler} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {

  return (
    <View>
      <StatusBar backgroundColor={colors.primary} />
      <SafeAreaView style={{ backgroundColor: '#e3e3e3', width: '100%', height: '100%' }}>
        <MainContent />


      </SafeAreaView>
    </View>
  );
}