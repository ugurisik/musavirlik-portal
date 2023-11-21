import styles from "./styles";
import { Style, Text, View, TouchableOpacity, Image } from 'react-native';
import Header from "./header";
import Cizgi from "./cizgi";
import ssttyle from './sssttyle';
import style from "./style";
import colors from "./colors";



export default function Navmenu() {
    return (
        <View style={[{ borderRadius: style.borderRadius, width: '100%', height: 50, backgroundColor: colors.white, marginTop: 15, display: 'flex', justifyContent: "space-between", alignItems: "center", flexDirection: 'row', paddingHorizontal: 15 }, styles.boxGolge]}>
            <Image source={require('../assets/img/safariportal_logo.png')} style={{ width: '50%', height: 15 }} />

            <Image source={require('../assets/img/userlogo.png')} style={{ width: '15%', height: '100%' }} />

        </View>
    )
}