import { StyleSheet  , Image} from 'react-native';
import colors from './colors';


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
        backgroundColor: colors.primary,
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

export default ssttyle;