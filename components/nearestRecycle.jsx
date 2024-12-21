import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { blurhash } from '../utils/constants';
import { Image } from 'expo-image';

const NearestRecycle = () => {
    return (
        <View style={ styles.container}>
            <Text style={styles.title}>Find nearest collection center or bin</Text>
            <View style={styles.innerContainer}>
                <View style={styles.binCard}>
                    <View style={styles.imgContainer}>
                        <Image
                            style={{ height: 140, aspectRatio: 1, }}
                            source={require('../assets/images/remove.png')}
                            placeholder={{ blurhash: blurhash || 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                            transition={500}
                        />

                    </View>
                    <Text style={styles.subtitle}>Bin</Text>
                </View>
                <View style={styles.binCard}>
                    <View style={styles.imgContainer}>
                        <Image
                            style={{ height: 140, aspectRatio: 1, }}
                            source={require('../assets/images/arrow_circle.png')}
                            placeholder={{ blurhash: blurhash || 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                            transition={500}
                        />

                    </View>
                    <Text style={styles.subtitle}>Center</Text>
                </View>
            </View>
        </View>
    )
}

export default NearestRecycle

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        elevation: 3,
        marginHorizontal:20,
        marginBottom:30
    },
    title: {
        fontSize: 23,
        fontWeight: '700',
        marginBottom: 10,
        textAlign:'center',
    
        
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    innerContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop:20
    },
    binCard: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingBottom:10,
        elevation: 2,
       
    },
    imgContainer: {
        backgroundColor: "#800000",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },

})