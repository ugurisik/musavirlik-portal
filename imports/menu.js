import styles from "./styles";
import { Style, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import Header from "./header";
import Cizgi from "./cizgi";
import ssttyle from './sssttyle';
import style from "./style";
import colors from "./colors";
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navmenu from './navmenu';
import messaging from '@react-native-firebase/messaging';
import Footer from "./Footer/Footer";
import axios from "axios";
import useTokenControl from './useTokenControl';
import Config from "./Config/Config";

export default function Menu({ navigation }) {


    const [token, setToken] = useState('');
    const [projects, setProjects] = useState([]);

    const checkUser = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('User'));

        if (!user) {
            return;
        }

        let response = await useTokenControl({ username: user.UserInfo.UserName, token: user.Token });
        console.log('Login Kontrol Menu 31 : ' + response.Message);
        if (response.Status !== true) { // heryerde response.status yapılacak
            await AsyncStorage.setItem('IsLogged', 'false');
            await AsyncStorage.removeItem('User');
            navigation.navigate('Loginpage');
        }
    }
    const getToken = () => {
        messaging().getToken().then(token => {
            setToken(token)
        });
    }

    const getProject = async () => {

        const user = JSON.parse(await AsyncStorage.getItem('User'));
        if (!user) return;

        const bodyData = new FormData();

        bodyData.append('username', user.UserInfo.UserName);
        bodyData.append('token', user.Token);

        const response = await axios({
            method: 'POST',
            data: bodyData,
            url: `${Config.BASE_URL}api/projects`,
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.Status !== true) {
            setProjects([{
                Content: 'Proje Bulunamadı',
                Cover: '',
                Guid: '',
                ID: 0,
                Title: 'Proje Bulunamadı',
                TitleImg: '',
                Url: ''
            }]);

            return;
        }

        setProjects(response.data.Projects);

    }
    React.useEffect(() => {



        checkUser();
        getProject();
        getToken();


    }, []);


    return (
        <>
            {/* <Header name={user[0].UserInfo.UserName} /> */}

            <View style={{ paddingLeft: 25, paddingRight: 25 }}>

                <Navmenu />



                <View style={{ paddingLeft: 25, paddingRight: 25, display: "flex", justifyContent: "center", alignItems: "center", gap: 25, flexDirection: "row", marginTop: 15, width: '100%' }}>
                    {/* 
                    <TouchableOpacity style={[styles.iconBox, styles.boxGolge]} onPress={() => {
                        navigation.navigate('Firmadetay', { text: 'Test lorem ipsum  Test lorem ipsum Test lorem ipsum', title: 'gps' })
                    }}>
                        <Image source={require('../assets/img/gps_icon.png')} style={{ width: '100%', height: 100, borderRadius: style.borderRadius }}></Image>
                    </TouchableOpacity> */}

                    {projects?.map((project) => {
                        console.log(project.Cover);
                        return (

                            <TouchableOpacity key={project.ID} style={[styles.iconBox, styles.boxGolge]} onPress={() => {
                                navigation.navigate('Firmadetay', { text: project.Content, title: project.Title, image: project.Cover, url: project.Url })
                            }}>
                                <Image source={{ uri: project.Cover }} style={{ width: '100%', height: 65 }}></Image>
                            </TouchableOpacity>
                        )
                    })}

                </View>

            </View>

            <Text style={{
                position: 'absolute',
                bottom: 150,
                paddingHorizontal:25
            }}
                selectable={true}>
                FCM Token for Testing Purposes :  <Text style={{ color: colors.primary }}>{token}</Text>
            </Text>

            <TouchableOpacity style={{
                position: 'absolute',
                bottom: 100,
                backgroundColor: colors.primary,
                padding: 10,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'

            }} onPress={async () => {
                await AsyncStorage.removeItem('User');
                await AsyncStorage.removeItem('IsLogged');
                navigation.navigate('Loginpage')
            }} >
                <Text style={{ color: colors.white }}>Çıkış</Text>
            </TouchableOpacity>



            <Footer navigation={navigation} />
        </>
    )
}