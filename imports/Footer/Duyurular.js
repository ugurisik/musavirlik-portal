import styles from "../styles";
import { Style, Text, View, TouchableOpacity, Image } from 'react-native';
import Header from "../header";
import React, { useEffect, useState } from 'react';
import Cizgi from "../cizgi";
import ssttyle from '../sssttyle';
import colors from "../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "./Footer";

export default function Duyurular({ navigation }) {

    const [user, setUser] = useState([]);

    const checkIsLogged = async () => {
        const IsLogged = JSON.parse(await AsyncStorage.getItem('IsLogged'));
        console.log('Gib.JS 12 , İsLogged:  ' + IsLogged);
        if (!IsLogged) {
            navigation.navigate('Login');
            return;
        }
    }



    useEffect(() => {
        checkIsLogged();

        const setUserInfo = async () => {
            const user = JSON.parse(await AsyncStorage.getItem('User'));
            setUser(user);
        }

        setUserInfo();
    }, [])

    return (
        <>
            <Header name={user?.UserInfo?.UserName} navigation={navigation} />

            <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.textSpan} >Safari Yazilim ve Arac Takip Sistemleri Ltd. Sti..</Text>
                </View>

                <Cizgi />


                <Text style={{
                    textAlign: "center",
                    fontSize: 36,
                    marginTop: 50,
                    color: colors.primary,
                    fontWeight: "bold"
                }}>Çok Yakında..</Text>

            </View>

            <Footer navigation = {navigation} />
        </>
    )
}