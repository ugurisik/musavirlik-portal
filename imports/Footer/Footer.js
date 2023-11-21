import ssttyle from "../sssttyle"
import Icon from 'react-native-vector-icons/MaterialIcons';
import  { View , TouchableOpacity , Text } from 'react-native';
import React , {useEffect,  useState} from 'react';
import colors from "../colors";


export default function Footer({ navigation }) {
    return (

        <View style={ssttyle.footer}>
            <TouchableOpacity style={ssttyle.menuItem} onPress={() => navigation.navigate('Duyurular')}>
                <Icon name="announcement" size={25} />
                <Text>DUYURULAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ssttyle.centerMenuItem} onPress={() => navigation.navigate('Dashboard')}>
                <Icon name="home" size={40} color = {colors.white} />
            </TouchableOpacity>

            <TouchableOpacity style={ssttyle.menuItem} onPress={() => navigation.navigate('Menu')} >
                <Icon name='menu' size={25} />
                <Text>MENÜ</Text>
            </TouchableOpacity>
        </View>

    )
}