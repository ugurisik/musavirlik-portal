import axios from "axios"
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from "react-native"
import Config from "../Config/Config"
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTokenControl from "../useTokenControl"
import styles from "../styles"
import Header from "../header";
import Footer from "../Footer/Footer";

export default function Musavirdengelenler({ navigation }) {

    const [musavirData, setMusavirData] = useState([]);

    const checkUser = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('User'));

        if (!user) {
            navigation.navigate('Loginpage');
            return;
        }

        let response = await useTokenControl({ username: user.UserInfo.UserName, token: user.Token });
        console.log('User Token : ' + user.Token);
        console.log('Login Kontrol : ' + response.Message);
        if (response.Status !== true) { // heryerde response.status yapılacak
            await AsyncStorage.setItem('IsLogged', 'false');
            await AsyncStorage.removeItem('User');
            navigation.navigate('Loginpage');
            return;
        }
    }
    const getMusavir = async () => {

        const user = JSON.parse(await AsyncStorage.getItem('User'));

        const bodyData = new FormData();

        bodyData.append('username', user.UserInfo.UserName);
        bodyData.append('token', user.Token);

        const response = await axios({
            method: 'POST',
            url: `${Config.BASE_URL}api/sended`,
            data: bodyData,
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (response.data.Status !== true) {
            Alert.alert('Hata', response.data.Message);
            return;
        }

        if (response.data.All.length === 0) {
            Alert.alert('Hata', 'Müşavirden gelen dosya bulunamadı.');
            return;
        }

        setMusavirData(response.data.All);
    }

    useEffect(() => {
        checkUser();
        getMusavir();

    }, []);
    return (
        <>
            <View style={styles.container}>
                <Header name='Müşavirden Gelenler' disableBell={true} />

                {musavirData && musavirData.map((item, index) => {
                    return (
                        <View key={index}>
                            buray ne gelecek bilmediğim için durdu.
                        </View>
                    )
                })}
            </View>

            <Footer navigation={navigation} />
        </>
    )
}