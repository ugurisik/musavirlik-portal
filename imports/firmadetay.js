import styles from "./styles";
import { Style, Text, View, TouchableOpacity, Image } from 'react-native';
import Header from "./header";
import Cizgi from "./cizgi";
import ssttyle from './sssttyle';
import style from "./style";
import colors from "./colors";
import Navmenu from './navmenu';
import Footer from "./Footer/Footer";

export default function Firmadetay({ route, navigation }) {

    let { text, title, image, url } = route.params;


    return (
        <>

            <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                <Navmenu />

                <View style={{ marginTop: 25, display: 'flex', gap: 15, backgroundColor: 'rgba(171,183,183,0.6)', borderRadius: style.borderRadius, padding: 25 }}>
                    <Image source={{ uri: image }} style={{ width: '100%', height: 50 }} />
                    <Text style={{
                        color: colors.primary,
                        fontSize: style.fontSizeBig,
                        fontWeight: style.fontBold
                    }}>
                        {title}
                    </Text>
                    <Text>
                        {text}
                    </Text>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Webview', { url: url }) // here fix
                    }} style={{ backgroundColor: 'white', borderRadius: style.borderRadius, padding: 8, width: '45%', marginTop: 55 }}>
                        <Text style={{ fontSize: style.fontSizeBig, fontWeight: style.fontBold }}>TEKLİF AL</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer navigation={navigation} />

        </>
    )
}