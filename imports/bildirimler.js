import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Button, Alert, Touchable } from 'react-native';
import DocumentScanner from "react-native-document-scanner-plugin";
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './header';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker'
// import styles from './styles';
import colors from './colors';
import axios from 'axios';
import Modal from 'react-native-modal';
import { SendPostRequest } from './request';
import style from './style';
import LoaderKit from 'react-native-loader-kit'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ssttyle from './sssttyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationCount from './NotificationCount';
import Footer from './Footer/Footer';


export default function Bildirimler({ navigation, route }) {

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [notifications, setNotifications] = useState([]);

    const getNotifications = async () => {
        const res = await NotificationCount('notification');
        if (res === 'loginError') {

            setIsLogged(false);
            navigation.navigate('Loginpage');
            return;
        }
        setNotifications(res);
    }

    const setNotificationReaded = async (guid) => {

        const user = JSON.parse(await AsyncStorage.getItem('User'));

        if (!user) {
            Alert.alert('hata', 'user not found pls login again');
            navigation.navigate('Loginpage');
            return;
        }

        const bodyData = new FormData();

        bodyData.append('username', user.UserInfo.UserName),
            bodyData.append('token', user.Token),
            bodyData.append('guid', guid)

        try {
            const response = await axios({
                method: 'POST',
                url: 'https://portal.safariyazilim.com/api/notification/read',
                data: bodyData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.Status === true) {
                // ?   
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getNotifications();
    }, []);

    let sortedNotifications = [];

    if (notifications && notifications.AllNotification && notifications.UserNotification) {
        sortedNotifications = [...notifications.AllNotification, ...notifications.UserNotification]
            .sort((a, b) => new Date(b.CreatedDate) - new Date(a.CreatedDate));
    }

    const count = route.params.notificationCount;

    return (
        <>
            <Header name={'Bildirimler ( ' + count + ' )'} disableBell={true} />

            {sortedNotifications.map((notification, index) => (
                <View
                    key={index}
                    style={[notification.Readed ? styles.readNotification : styles.unreadNotification, { marginVertical: 10, marginHorizontal: 15, padding: 10, borderRadius: 5 }]}
                >
                    <Text style={styles.title}>{notification.Title}</Text>
                    <Text style={styles.content}>
                        {notification.Content.substring(0, 15)}...
                    </Text>

                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                            marginTop: 10,
                        }}
                        onPress={() => {
                            setNotificationReaded(notification.Guid)
                            setSelectedNotification(notification);
                            setModalVisible(true);
                        }}
                    >
                        <Text style={{
                            color: colors.primary,
                            fontSize: style.fontSizeDefault,
                            fontWeight: style.fontBold
                        }}>DEVAMINI OKU</Text>
                    </TouchableOpacity>
                </View>
            ))}


            <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
                <View style={styles.modalContent}>
                    <View style={styles.modalBox}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={toggleModal}
                        >
                            <Icon name="close" size={20} color="#000" />
                        </TouchableOpacity>
                        {selectedNotification && (
                            <>
                                <Text style={styles.modalTitle}>{selectedNotification.Title}</Text>
                                <Text style={styles.modalContent}>{selectedNotification.Content}</Text>
                                {/* <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={toggleModal}
                                >
                                    <Text style={styles.textStyle}>Kapat</Text>
                                </TouchableOpacity> */}
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            <Footer navigation={navigation} />

        </>
    )
}

const styles = StyleSheet.create({
    readNotification: {
        backgroundColor: '#f8f8f8', // Change this to the color you want for read notifications
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContent: {
        fontSize: 16,
    },
    modalBox: {
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    unreadNotification: {
        backgroundColor: '#d3d3d3', // Change this to the color you want for unread notifications
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    content: {
        fontSize: 14,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    buttonText: {
        color: '#fff',
        backgroundColor: colors.primary,
        padding: 5,
        borderRadius: 5,
        textAlign: 'center',
        marginTop: 10,
    }
});