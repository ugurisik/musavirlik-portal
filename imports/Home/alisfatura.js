import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import DocumentScanner from "react-native-document-scanner-plugin";
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../header';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker'
import styles from '../styles';
import colors from '../colors';
import axios from 'axios';
import Modal from 'react-native-modal';
import { SendPostRequest } from '../request';
import style from '../style';
import LoaderKit from 'react-native-loader-kit'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ssttyle from '../sssttyle';
import Footer from '../Footer/Footer';
import Config from '../Config/Config';

import useTokenControl from '../useTokenControl';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Satisfatura({ navigation }) {

    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');

    let url = `${Config.BASE_URL}api/upload/purchase/`;

    const [scannedImage, setScannedImage] = useState();
    const [data, setData] = useState([]);
    const [loading, isLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [imageUri, setImageUri] = useState(null);
    const [secilmis, setSecilmis] = useState(0);


    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }


    const fotografCek = async () => {
        const { scannedImages } = await DocumentScanner.scanDocument({
            maxNumDocuments: 1,
            responseType: 'base64',
        });

        if (scannedImages.length > 0) {
            setScannedImage(scannedImages[0]);
        }

        setSecilmis(1);
    }

    const SelectImage = async () => {

        const options = {
            mediaType: 'photo',
            includeBase64: true,
        }

        launchImageLibrary(options, (res) => {
            console.log(res);
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
            } else {
                const source = { uri: res.assets[0].uri };
                setImageUri(res.assets[0].base64);
            }
        });

        setSecilmis(2);
    }

    const gonder = async () => {

        if (!scannedImage && !imageUri) {
            Alert.alert('Hata', 'Lütfen bir resim seçiniz!')
            return;
        }

        // console.log(scannedImage);

        openModal();

        let bodyData = new FormData();
        bodyData.append('username', username);
        bodyData.append('token', token);
        bodyData.append('CostDate', date.toString());
        bodyData.append('base64', scannedImage ? 'data:image/jpeg;base64,' + scannedImage : 'data:image/jpeg;base64,' + imageUri);


        try {
            const res = await axios({
                method: "post",
                url: url,
                data: bodyData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            closeModal();
            Alert.alert('Başarılı', 'Masrafınız başarıyla kaydedildi!', [
                { text: 'Tamam', onPress: () => navigation.navigate('Dashboard') }
            ]);
        }



    }


    const checkUser = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('User'));

        if (!user) {
            navigation.navigate('Loginpage');
            return;
        }

        let response = await useTokenControl({ username: user.UserInfo.UserName, token: user.Token });
        console.log('Login Kontrol Alis 135 : ' + response.Message);
        if (response.Status !== true) { // heryerde response.status yapılacak
            await AsyncStorage.setItem('IsLogged', 'false');
            await AsyncStorage.removeItem('User');
            navigation.navigate('Loginpage');
        }
    }

    const setUser = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('User'));

        if (!user) {
            navigation.navigate('Loginpage');
            return;
        }

        setUsername(user.UserInfo.UserName);
        setToken(user.Token);
    }


    useEffect(() => {
        checkUser();
        setUser();
    }, []);

    return (
        <>
            {/* <Header name='MASRAFLARI YUKLE' /> */}
            <SafeAreaView style={{ width: '100%', height: '100%', paddingLeft: 25, paddingRight: 25, flex: 1, flexDirection: 'column', gap: 25, marginTop: 25 }}>


                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Text style={{ color: colors.white }}>ÇEKİLEN RESİM</Text> */}
                    {/* {masraflar.map((resim, index) => (
                        <View key={index} style={{ marginVertical: 10 }}>
                            <Image
                                resizeMode="contain"
                                style={{ width: '100%', height: 300 }}
                                source={{ uri: resim }}
                            />
                        </View>
                    ))} */}

                    {secilmis === 0 ?
                        <Image source={require('../../assets/img/upload-icon-22.png')} />
                        : secilmis === 1 ?
                            <Image source={{ uri: `data:image/jpeg;base64,${scannedImage}` }} style={{ width: '100%', height: 300 }} />
                            : secilmis === 2 ?
                                <Image source={{ uri: `data:image/jpeg;base64,${imageUri}` }} style={{ width: '100%', height: 300 }} />
                                : null
                    }




                </View>

                <DatePicker
                    title={'Tarih Seçiniz'}
                    locale='tr-TR'
                    modal
                    mode='date'
                    confirmText='Onayla'
                    cancelText='İptal'
                    open={open}
                    date={date}
                    androidVariant='nativeAndroid'

                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />

                <TouchableOpacity style={{ backgroundColor: colors.muted, padding: 15 }} onPress={() => setOpen(true)} >
                    <Text style={{ textAlign: 'center', color: colors.white, fontSize: style.fontSizeMid, fontWeight: style.fontBold }}>Tarih Seçiniz</Text>
                </TouchableOpacity>
                {
                    <Text style={{ textAlign: 'center', color: colors.primary, fontSize: style.fontSizeMid, fontWeight: style.fontBold }}>
                        {date.toDateString('tr-TR')}
                    </Text>
                }




                <View style={{ display: 'flex', flexDirection: 'column', gap: 15, position: 'absolute', bottom: 100, right: 25, justifyContent: 'center', width: '100%' }}>
                    {/* <TouchableOpacity style={{ backgroundColor: colors.primary, padding: 15, width: '100%' }} onPress={() => handleMasraf()}>
                        <Text style={{ color: colors.white, textAlign: 'center', fontWeight: 500, fontSize: 16 }}>Galeriden Fotoğraf Seç</Text>
                    </TouchableOpacity> */}


                    {imageUri === null && !scannedImage ? <TouchableOpacity style={{ backgroundColor: colors.primary, padding: 15, width: '100%' }} onPress={() => fotografCek()}>
                        <Text style={{ color: colors.white, textAlign: 'center', fontWeight: 500, fontSize: 16 }}>Fotoğraf Çek</Text>
                    </TouchableOpacity>
                        : null
                    }

                    {
                        imageUri != null || scannedImage ? null : <TouchableOpacity onPress={() => SelectImage()} style={{ backgroundColor: colors.primary, padding: 15, width: '100%' }}>
                            <Text style={{ color: colors.white, textAlign: 'center', fontWeight: 500, fontSize: 16 }}>Resim Seç</Text>
                        </TouchableOpacity>

                    }



                    <TouchableOpacity style={{ backgroundColor: colors.primary, padding: 15, width: '100%' }} onPress={() => gonder()}>
                        <Text style={{ color: colors.white, textAlign: 'center', fontWeight: 500, fontSize: 16 }}>Gönder</Text>
                    </TouchableOpacity>
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
                                <Text style={{ color: colors.white, fontSize: style.fontSizeBig }}>Fiş-Faturanız Yapay Zeka ile İşleniyor</Text>
                            </View>
                        </Modal>
                    </View>
                ) : null}



            </SafeAreaView>
            <Footer navigation={navigation} />
        </>
    );
}
