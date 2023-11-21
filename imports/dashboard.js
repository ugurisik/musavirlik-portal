import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from 'react';
import Odemegunleri from './odemegunleri';
import Cizgi from './cizgi';
import DocumentScanner from 'react-native-document-scanner-plugin'
import Header from "./header";
import colors from './colors';
import styles from './styles';
import Footer from "./Footer/Footer";
import style from "./style";
import ssttyle from './sssttyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios, { all } from "axios";
import useTokenControl from "./useTokenControl";
import MarqueeText from 'react-native-marquee';
import Config from "./Config/Config";

export default function Dashboard({ navigation }) {

    const [username, setUsername] = useState('');
    const [duyuru, setDuyuru] = useState([]);

    const fetchUser = async () => {
        const value = await AsyncStorage.getItem('User');
        if (value !== null) {
            const user = JSON.parse(value);
            setUsername(user.UserInfo.UserName)
        }
    }

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

    const getDuyurular = async () => {

        const bodyData = new FormData();

        const user = JSON.parse(await AsyncStorage.getItem('User'));

        if (!user) {
            navigation.navigate('Loginpage');
            return;
        }

        bodyData.append('username', user.UserInfo.UserName);
        bodyData.append('token', user.Token);

        try {
            const response = await axios({
                method: 'POST',
                data: bodyData,
                url: `${Config.BASE_URL}api/announcements`,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.data.Status === true) {
                setDuyuru(response.data.AllAnn);
            }
        } catch (error) {
            console.log(error);
        }


    }

    useEffect(() => {

        checkUser();
        fetchUser();
        getDuyurular();
    }, []);


    return (
        <>
            <Header name={username} navigation={navigation} />
            <View style={{ paddingHorizontal: 25 }}>

                <MarqueeText
                    style={{ fontSize: style.fontSizeMid, marginVertical: 15 }}
                    marqueeOnStart={true}
                    loop={true}
                    delay={1000}
                >
                    Duyuru Duyuru Duyuru Duyuru Duyuru Duyuru Duyuru Duyuru Duyuru Duyuru Duyuru Duyuru Duyuru Duyuru Duyuru
                </MarqueeText>
            </View>

            <View style={{ paddingLeft: 25, paddingRight: 25 }}>

                <View style={{ marginTop: 15, display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 10 }} >
                    <TouchableOpacity
                        style={{
                            borderRadius: style.borderRadius,
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: colors.white,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10
                        }}
                        onPress={() => navigation.navigate('Satisfatura')}
                    >
                        <Image source={require('../assets/img/alis.png')} />
                        <Text style={styles.textiki}>Satış faturasi yükle</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            borderRadius: style.borderRadius,
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: colors.white,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10
                        }}
                        onPress={() => navigation.navigate('Sgkkimlik')}
                    >
                        <Image source={require('../assets/img/alis.png')} />
                        <Text style={styles.textiki}>Kimlik Ön/Arka yükle</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 15, display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 10 }} >
                    <TouchableOpacity
                        style={{
                            borderRadius: style.borderRadius,
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: colors.white,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10
                        }}
                        onPress={() => navigation.navigate('Alisfatura')}
                    >
                        <Image source={require('../assets/img/satis.png')} />
                        <Text style={styles.textiki}>Aliş faturasi yükle</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            borderRadius: style.borderRadius,
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: colors.white,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10
                        }}
                        onPress={() => navigation.navigate('Satisfatura')}
                    >
                        <Image source={require('../assets/img/borclar.png')} />
                        <Text style={styles.textiki}>Borçları Görüntüle</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 15, display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 10 }} >
                    <TouchableOpacity
                        style={{
                            borderRadius: style.borderRadius,
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: colors.white,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10
                        }}
                        onPress={() => navigation.navigate('Masraflariyukle')}
                    >
                        <Image source={require('../assets/img/masraflar.png')} />
                        <Text style={styles.textiki}>Masrafları yükle</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            borderRadius: style.borderRadius,
                            width: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: colors.white,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10
                        }}
                        onPress={() => navigation.navigate('Fisfatura')}
                    >
                        <Image source={require('../assets/img/fisvefatura.png')} />
                        <Text style={styles.textiki}>Fiş & Fatura Görüntüle</Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={{ marginTop: 15 }} >
                    <TouchableOpacity
                        style={{
                            borderRadius: style.borderRadius,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            backgroundColor: colors.white,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 10
                        }}
                        onPress={() => navigation.navigate('Masraflariyukle')}
                    >
                        <Image source={require('../assets/img/masraflar.png')} />
                        <Text style={styles.text}>Masraflari yükle</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 15, display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 30 }} >
                    <TouchableOpacity
                        style={{
                            borderRadius: style.borderRadius,
                            width: '45%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: colors.white,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10
                        }}
                        onPress={() => navigation.navigate('Alisfatura')}
                    >
                        <Image source={require('../assets/img/alis.png')} />
                        <Text style={styles.textiki}>Aliş faturasi yükle</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            borderRadius: style.borderRadius,
                            width: '45%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: colors.white,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10
                        }}
                        onPress={() => navigation.navigate('Satisfatura')}
                    >
                        <Image source={require('../assets/img/satis.png')} />
                        <Text style={styles.textiki}>Satiş faturasi yükle</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 15, marginBottom: 15 }} >
                    <TouchableOpacity
                        style={{
                            borderRadius: style.borderRadius,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: colors.white,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10
                        }}
                        onPress={() => navigation.navigate('Fisfatura')}    
                    >
                        <Image source={require('../assets/img/fisvefatura.png')} />
                        <Text style={styles.text}>Fiş ve Faturaları Görüntüle</Text>
                    </TouchableOpacity>
                </View> */}

                <View style={{ marginTop: 15 }}>

                </View>

                <Cizgi />


                <View style={{ marginTop: 15 }} >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Musavirdengelenler')
                        }}
                        style={{
                            borderRadius: style.borderRadius,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: colors.primary,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10,
                        }}
                    >
                        {/* <Image source={require('../assets/img/borclar.png')} /> */}
                        <Text style={{ color: colors.white, fontSize: style.fontSizeBig, fontWeight: style.fontBold }}>Müşavirden Gelenler</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 15 }} >
                    <TouchableOpacity
                        style={{
                            borderRadius: style.borderRadius,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: colors.primary,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10,
                        }}
                    >
                        {/* <Image source={require('../assets/img/borclar.png')} /> */}
                        <Text style={{ color: colors.white, fontSize: style.fontSizeMid, fontWeight: style.fontBold }}>???</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ padding: 15, marginTop: 15, backgroundColor: colors.white, alignItems: "center", borderTopEndRadius: style.borderRadius, borderTopStartRadius: style.borderRadius }} >
                    <Text style={{ color: colors.muted, fontWeight: style.fontBold, fontSize: style.fontSizeBig }}>Yaklaşan ödeme günleri</Text>
                </View>

            </View>



            <View style={{ flex: 1, paddingLeft: 25, paddingRight: 25, marginBottom: 25 }}>
                <Odemegunleri />
            </View>

            <Footer navigation={navigation} />



        </>
    );
}

