import { FlatList, View, Text, StyleSheet } from "react-native"
import colors from './colors';
import style from "./style";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#ECECEC',
        // backgroundColor: '#e3e3e3',
        borderRadius: 10,
        borderBottomWidth: 2,
        padding: 5,
    },
    listItemText: {
        fontSize: 14,
    },
    listItemDate: {
        fontSize: 14,
    },
});

export default function Odemegunleri() {
    return (<>

        <View style={{
            flex: 1, backgroundColor: colors.white, paddingRight:15, paddingLeft:15, marginBottom:55, borderBottomEndRadius:style.borderRadius, borderBottomStartRadius:style.borderRadius
        }}>
            <View style={{
                flex: 1
            }} >

                <FlatList
                    data={[
                        { id: 1, key: 'SGK YAPILANDIRMA1', date: '12.12.1221' },
                        { id: 2, key: 'SGK YAPILANDIRMA2', date: '12.12.1222' },
                        { id: 3, key: 'SGK YAPILANDIRMA3', date: '12.12.1223' },
                        { id: 4, key: 'SGK YAPILANDIRMA4', date: '12.12.1224' },
                        { id: 5, key: 'SGK YAPILANDIRMA5', date: '12.12.1225' },
                        { id: 6, key: 'SGK YAPILANDIRMA6', date: '12.12.1226' },
                        { id: 7, key: 'SGK YAPILANDIRMA7', date: '12.12.1227' },
                        { id: 8, key: 'SGK YAPILANDIRMA8', date: '12.12.1228' },
                        
                    ]}
                    renderItem={({ item }) => (
                        <View style={[styles.listItem]}>
                            <Text style={styles.listItemText}>{item.key}</Text>
                            <Text style={styles.listItemDate}>{item.date}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />


            </View>
        </View>
    </>
    )
}