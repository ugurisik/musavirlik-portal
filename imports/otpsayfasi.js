import { Text, View, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
// import styles from './styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from "react-native-modal";
import colors from './colors';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { TouchableHighlight } from 'react-native-gesture-handler';


export default function Otpsayfasi({ navigation }) {


    const [timerStarted, setTimerStarted] = useState(false);
    const [time, setTime] = useState(5);
    let interval;

    const startTimer = () => {
        if (timerStarted) return;

        setTimerStarted(true);

        interval = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);
    };

    useEffect(() => {
        if (time === 0) {
            setTimerStarted(false);
            clearInterval(interval);
        }
    }, [time]);

    useEffect(() => {
        return () => {
            if (interval) clearInterval(interval);
        };
    }, []);


    return (
        <>

            <View style={{ paddingLeft: 15, paddingRight: 15, backgroundColor: colors.primary, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>

                <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 16 }}>Lütfen telefonunuza gelen kodu giriniz!</Text>


                <OTPInputView
                    style={{ width: '100%', height: 200, }}
                    pinCount={6}
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    // onCodeChanged = {code => { this.setState({code})}}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code) => {
                        console.log(`Code is ${code}, you are good to go!`)
                    }}
                />

                <TouchableOpacity style={{ backgroundColor: colors.white, marginVertical: 15, padding: 15, width: '100%' }} onPress={handleLogin}>
                    <Text style={{ textAlign: 'center' }}>Giriş</Text>

                </TouchableOpacity>

                <TouchableOpacity style={{ marginVertical: 15 }} onPress={startTimer}>
                    <Text style={{ textAlign: 'center', color: colors.white }}>Resend OTP</Text>
                </TouchableOpacity>

                {
                    time == 5 ? '' : <Text style={{ textAlign: 'center', color: colors.white }}>Tekrar kod gönderebilmeniz için {time} saniye.</Text>
                }


            </View>




        </>
    )
}

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});



const ssttyle = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 5,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
    },
    menuItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerMenuItem: {
        backgroundColor: 'white',
        width: 70,
        height: 70,
        borderRadius: 35,
        position: 'absolute',
        bottom: 15,
        left: '42%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
    },
    icon: {
        width: 15,
        height: 15,
    }
});
