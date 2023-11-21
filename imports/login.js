import React, { useEffect, useState, useReducer } from 'react';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import colors from './colors';
import { sha256 } from 'js-sha256';
// import { SECRET_KEY } from '@env';
import axios from 'axios';
// import DocumentScanner from 'react-native-document-scanner-plugin'
import Resim from './resim';
import * as Keychain from 'react-native-keychain';
import Dashboard from './dashboard';
import style from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCheckUser } from './CheckUser';
import useTokenControl from './useTokenControl';
import Config from './Config/Config';

const initialState = {
    email: '',
    password: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        default:
            return state;
    }
};



function Loginpage({ navigation }) {
    

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleEmailChange = (text) => {
        dispatch({ type: 'SET_EMAIL', payload: text });
    };

    const handlePasswordChange = (text) => {
        dispatch({ type: 'SET_PASSWORD', payload: text });
    };

    const handleLogin = async () => {
        let { email, password } = state;

        email = 'admin';
        password = 'K3dk9sz3.!*';

        // let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        // if (emailRegex.test(email) === false) {
        //     alert('Lütfen geçerli bir e-mail adresi giriniz.');
        //     return;
        // }

        var bodyFormData = new FormData();
        bodyFormData.append('username', `${email}`);
        bodyFormData.append('password', `${password}`);

        axios({
            method: "post",
            url: `${Config.BASE_URL}api/login`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(async (res) => {
            if (res.data.Status === true && res.data.Message === 'Giriş Başarılı!') {

                await AsyncStorage.setItem('User', JSON.stringify(res.data));
                await AsyncStorage.setItem('IsLogged' , 'true');
                navigation.navigate('Dashboard');

            } else {
                // console.log(res.data.Message);
            }
        }).catch((er) => {
            // console.log(er);
        })


    };

    const handleForgotPassword = async () => {

    }

    useEffect(() => {

        const checkUser = async () => {
            const user = JSON.parse(await AsyncStorage.getItem('User'));

            if (!user) {
                return;
            }

            let response = await useTokenControl({ username: user.UserInfo.UserName, token: user.Token });
            console.log('User Token : ' + user.Token);
            console.log('Login Kontrol : ' + response.Message);
            if (response.Status === true) { // heryerde response.status yapılacak
                await AsyncStorage.setItem('IsLogged' , 'true');
                navigation.navigate('Dashboard');
            }
        }

        checkUser();
    }, [])




    return (<>

        <View style={{ paddingRight: 15, paddingLeft: 15, width: '100%', height: '100%', backgroundColor: colors.primary, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', backgroundColor: colors.white, padding: 25, borderRadius: style.borderRadius, display: 'flex', gap: 10, flexDirection: 'column' }}>

                <View>
                    <Image source={require('../assets/img/safariportal_logo.png')} style={{ width: '100%', height: 40, marginBottom: 15 }} />
                </View>

                <Text style={{ fontSize: 12, textAlign: 'center', fontSize: style.fontSizeDefault, fontWeight: style.fontBold }}>
                    Mali müşavirinizden aldığınız bilgiler ile giriş yapın.
                </Text>

                <Text style={styles.text}>E-Mail</Text>
                <TextInput
                    style={styles.input}
                    placeholder="E-Mail"
                    value={state.email}
                    onChangeText={handleEmailChange}
                />

                <Text style={styles.text}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={state.password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={{ width: '100%', height: 45, textAlign: 'center', backgroundColor: colors.primary, justifyContent: 'center', marginTop: 25 }} onPress={handleLogin}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.textSpan}>Forgot Password</Text>
                </TouchableOpacity>


            </View>
        </View>
    </>)
}

export default Loginpage;
