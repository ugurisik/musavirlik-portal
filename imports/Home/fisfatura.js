import { Text, View, FlatList, TouchableOpacity, Image, StyleSheet, Button, ScrollView } from 'react-native';
import styles from '../styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from "react-native-modal";
import React from 'react';
import ssttyle from '../sssttyle';
import Config from '../Config/Config';
import Footer from '../Footer/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTokenControl from '../useTokenControl';

export default function Fisfatura({ navigation }) {

    const [user, setUser] = useState([]);
    const [files, setFiles] = useState([]);


    const checkUser = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('User'));

        if (!user) {
            navigation.navigate('Loginpage');
            return;
        }

        let response = await useTokenControl({ username: user.UserInfo.UserName, token: user.Token });
        console.log('Login Kontrol Fisfatura 28 : ' + response.Message);
        if (response.Status !== true) { // heryerde response.status yapılacak
            await AsyncStorage.setItem('IsLogged', 'false');
            await AsyncStorage.removeItem('User');
            navigation.navigate('Loginpage');
        }
    }

    const filesKoy = async () => {

        const data = new FormData();

        const user = JSON.parse(await AsyncStorage.getItem('User')); // useState fix soon

        data.append('username', user.UserInfo.UserName);
        data.append('token', user.Token);

        const res = await axios({
            method: 'post',
            url: `${Config.BASE_URL}api/files/all`,
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
        })

        if (res.data.Status === true && res.data.Message === 'İşlem Başarılı') {
            console.log(res.data);
            setFiles(res.data.Files);
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
        filesKoy();

    }, [])

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };



    return (
        <>
            {user && <>
                <Text style={[styles.text, { textAlign: 'center', marginTop: 15, fontSize: 20, marginBottom: 15 }]}>
                    Fişler/Faturalar
                </Text>

                <FlatList
                    data={files}
                    removeClippedSubviews={true}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    updateCellsBatchingPeriod={100}
                    windowSize={7}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item: file }) => (
                        <TouchableOpacity
                            style={{
                                marginTop: 15,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 12,
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 10
                            }}
                            onPress={() => {
                                setModalData(file);
                                toggleModal();
                            }}
                        >
                            {
                                file.Status == 'İşlenmedi' ?
                                    <Text style={{ color: 'red' }}>
                                        {file.Status}
                                    </Text>
                                    :
                                    <Text>
                                        {file.Status}
                                    </Text>
                            }
                            <Text style={styles.text}>{file.FileDate}</Text>
                            <Text>Fatura Tipi : {file.Type}</Text>
                        </TouchableOpacity>
                    )}
                />

                <View style={{ height: 80, backgroundColor: '#fff' }}></View>

                <View>
                    <Modal isVisible={isModalVisible}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'white', width: '85%', padding: 15, display: 'flex', flexDirection: 'columnn' }}>
                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Tarih : {modalData.FileDate}</Text>
                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Durum : {
                                    modalData.Status == 'İşlenmedi' ?
                                        <Text style={{ color: 'red' }}>
                                            {modalData.Status}
                                        </Text>
                                        :
                                        <Text>
                                            {modalData.Status}
                                        </Text>

                                }</Text>
                                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Fatura Tipi : {modalData.Type}</Text>
                            </View>
                            <Image style={{ width: '85%', height: '50%' }} source={{ uri: modalData.File }} />
                        </View>
                        <Button title="KAPAT" onPress={toggleModal} />
                    </Modal>
                </View>


                <Footer navigation={navigation} /></>}
        </>
    )
}

