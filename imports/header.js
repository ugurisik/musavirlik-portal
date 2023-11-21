import React, { useEffect, useState } from 'react';
import colors from './colors';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NotificationBell from './Bell';
import NotificationCount from './NotificationCount';
import useTokenControl from './useTokenControl';


export default function Header({ navigation, name, disableBell = false }) {

    const [notificationCount, setNotificationCount] = useState(0);

    async function getNotificationCount() {
        const count = await NotificationCount();
        setNotificationCount(count);
    }

    const checkUser = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('User'));

        if (!user) {
            return;
        }

        let response = await useTokenControl({ username: user.UserInfo.UserName, token: user.Token });
        console.log('Login Kontrol Header 29 : ' + response.Message);
        if (response.Status !== true) { // heryerde response.status yapılacak
            await AsyncStorage.setItem('IsLogged', 'false');
            await AsyncStorage.removeItem('User');
            navigation.navigate('Loginpage');
        }
    }

    useEffect(() => {

        checkUser();

        getNotificationCount();
    }, []);

    return (
        <View style={{ backgroundColor: colors.primary, alignItems: "center", height: 70, justifyContent: "center" }}>
            {disableBell ? '' : <NotificationBell navigation={navigation} notificationCount={notificationCount} />}
            <Text style={{ color: colors.white, fontSize: 20 }}>{name}</Text>
        </View>
    )
}