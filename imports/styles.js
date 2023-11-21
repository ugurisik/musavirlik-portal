import { StyleSheet } from 'react-native';
import colors from './colors';
const style = {
    borderRadius: 35,
    fontSize: 20,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: .25,
    shadowRadius: 3.84,
    elevation: 5,

}


const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    loginContainer: {
        width: '100%',
        height: '60%',
        backgroundColor: colors.white,
        borderRadius: style.borderRadius,
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSpan: {
        color: colors.muted,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    boxGolge: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
        flexDirection: "column",
        backgroundColor: colors.white,
        width: '33.333%',
        height: 100,
        borderRadius: 25,
        padding: 2
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: colors.muted,
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
    },
    text: {
        color: colors.ortamuted,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textiki: {
        color: colors.ortamuted,
        fontSize: 12,
        fontWeight: '800',
    },

    button: {
        backgroundColor: colors.primary,
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        width: '100%',
    }, container: {
        position: 'relative',
        width: 75,
        alignItems: 'center'
    },
    background: {
        position: 'absolute',
        top: 0,
    },
    button: {
        top: -22.5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 27,
        backgroundColor: '#E94F37',
    },
    buttonIcon: {
        fontSize: 16,
        color: '#F6F7EB'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    column: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
    },


});

export default styles;

// react antive react 
