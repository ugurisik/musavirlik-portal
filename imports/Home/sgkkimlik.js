import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert, TouchableOpacity, Button, TextInput } from 'react-native';
import DocumentScanner from "react-native-document-scanner-plugin";
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../header';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker'
import styles from '../styles';
import colors from '../colors';
import ssttyle from '../sssttyle';
import axios from 'axios';
import style from '../style';
import LoaderKit from 'react-native-loader-kit'
import Modal from 'react-native-modal';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useTokenControl from '../useTokenControl';
import Footer from '../Footer/Footer';
import Config from '../Config/Config';

export default function Sgkkimlik({ navigation }) {

    const [user, setUser] = useState('');
    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }
    const [isModalVisible, setModalVisible] = useState(false);

    async function handleMasraf() {
        if (inputValue === '' || inputValue === null || inputValue === undefined) {
            Alert.alert('Hata', 'Mesleğinizi Giriniz');
            return
        }
        openModal();

        let url = `${Config.BASE_URL}api/identity`;

        const bodyData = new FormData();

        bodyData.append('token', user.Token);
        bodyData.append('username', user.UserInfo.UserName);
        bodyData.append('startDate', date.toString());
        bodyData.append('job', inputValue);
        bodyData.append('photo', onKimlik);
        bodyData.append('photoBack', arkaKimlik);

        try {
            const res = await axios({
                method: "post",
                url: url,
                data: bodyData,
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log(res.data);

            if (res.data.Message === 'Kimlik başarıyla yüklendi!' && res.data.Status == true) {
                Alert.alert('Başarılı', res.data.Message, [
                    {
                        text: "Tamam",
                        onPress: () => navigation.navigate('Dashboard')
                    }
                ]);
            } else {
                Alert.alert('Hata', res.data.Message, [
                    {
                        text: "Tamam",
                        onPress: () => navigation.navigate('Dashboard')
                    }
                ]);
            }
        } catch (err) {
            Alert.alert('Hata', 'Bir Hata Oluştu : ' + err);
            return;

        }

        closeModal();


    }


    const [onKimlik, setOnKimlik] = useState();
    const [arkaKimlik, setArkaKimlik] = useState();
    const [inputValue, setInputValue] = useState('');


    const scanDocument = async (type) => {
        const { scannedImages } = await DocumentScanner.scanDocument({
            responseType: 'base64',
            maxNumDocuments: 1,
        })

        if (scannedImages.length > 0) {
            if (type == 'on') {
                setOnKimlik('data:image/jpeg;base64,' + scannedImages[0])
            } else {
                setArkaKimlik('data:image/jpeg;base64,' + scannedImages[0])
            }
        }
    }


    const checkUser = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('User'));

        if (!user) {
            return;
        }

        let response = await useTokenControl({ username: user.UserInfo.UserName, token: user.Token });
        console.log('Login Kontrol Kimlik 117 : ' + response.Message);
        if (response.Status !== true) { // heryerde response.status yapılacak
            await AsyncStorage.setItem('IsLogged', 'false');
            await AsyncStorage.removeItem('User');
            navigation.navigate('Loginpage');
        }
    }

    const setUserz = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('User'));
        if (!user) {
            navigation.navigate('Loginpage');
            return;
        }
        setUser(user);
    }

    useEffect(() => {
        checkUser();
        setUserz();
    }, []);
    
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (
        <>
            <ScrollView style={{ marginVertical: 15, marginBottom: 25, width: '100%', height: '100%' }} >
                <SafeAreaView style={{ width: '100%', height: '100%', paddingLeft: 25, paddingRight: 25, flex: 1, flexDirection: 'column', gap: 25, marginTop: 25 }}>

                    <View style={{ backgroundColor: colors.ortamuted, padding: 15, display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <Image
                            resizeMode='cover'
                            style={{ width: '100%', height: 200 }}
                            source={{ uri: onKimlik ? onKimlik : 'https://i.stack.imgur.com/y9DpT.jpg' }}
                        />

                        {
                            onKimlik ? null : <TouchableOpacity style={{ backgroundColor: colors.white, padding: 15 }} onPress={() => scanDocument('on')}>
                                <Text>ÖN KİMLİK YÜKLE</Text>
                            </TouchableOpacity>
                        }

                        <Image
                            resizeMode="cover"
                            style={{ width: '100%', height: 200 }}
                            source={{ uri: arkaKimlik ? arkaKimlik : 'https://i.stack.imgur.com/y9DpT.jpg' }}
                        />
                        {
                            arkaKimlik ? null : <TouchableOpacity style={{ backgroundColor: colors.white, padding: 15 }} onPress={() => scanDocument('arka')}>
                                <Text>ARKA KİMLİK YÜKLE</Text>
                            </TouchableOpacity>
                        }
                    </View>


                    {isModalVisible ? (
                        <View style={{ flex: 1 }}>
                            <Modal isVisible={isModalVisible}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    <LoaderKit
                                        style={{ width: 100, height: 100 }}
                                        name={'LineScale'} // Optional: see list of animations below
                                        size={50} // Required on iOS
                                        color={colors.primary}
                                    />
                                    <Text style={{ color: colors.white, fontSize: style.fontSizeBig }}>Kimlik Yükleniyor..</Text>
                                </View>
                            </Modal>
                        </View>
                    ) : null}
                    <DatePicker
                        title={'Tarih Seçiniz'}
                        modal
                        confirmText='Onayla'
                        cancelText='İptal'
                        open={open}
                        date={date}
                        mode='date'
                        locale='tr'
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />

                    <TouchableOpacity style={{ backgroundColor: colors.primary, padding: 15 }} onPress={() => setOpen(true)}>
                        <Text style={{ color: colors.white, textAlign: 'center', fontWeight: 500, fontSize: 16 }}>SGK BAŞLAMA TARİHİ SEÇ</Text>
                    </TouchableOpacity>

                    <View style={{ backgroundColor: colors.ortamuted }}>
                        {date ? <Text style={{ color: colors.white, textAlign: 'center', fontWeight: 500, fontSize: 16 }}>{date.toDateString()}</Text> : null}
                    </View>



                    <TextInput
                        placeholder='Mesleğinizi Giriniz'
                        style={styles.input}
                        onChangeText={text => setInputValue(text)}
                        value={inputValue}
                    />

                    <TouchableOpacity style={{ backgroundColor: colors.primary, padding: 15 }} onPress={() => handleMasraf()}>
                        <Text style={{ color: colors.white, textAlign: 'center', fontWeight: 500, fontSize: 16 }}>Gönder</Text>
                    </TouchableOpacity>


                    <View style={{ height: 55 }}></View>





                </SafeAreaView>
            </ScrollView>

            <Footer navigation={navigation} />
        </>
    );
}

