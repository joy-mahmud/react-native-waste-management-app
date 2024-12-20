import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SlidingModal from './slidingModal'
import { Image } from 'expo-image'
import { blurhash } from '../utils/constants'
import { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const AppHeader = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const getUser = async () => {
            const userData = await AsyncStorage.getItem('user')
            const user = JSON.parse(userData)
            if (user) {
                setUser(user); // Convert string back to object
            }
            //console.log(user)
        }
        getUser()
    }, []);
    const handleLogout = async () => {
        // Perform logout (e.g., remove token from AsyncStorage or context)
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('user');
        Alert.alert('Logout Successful');
        router.push('/login')
      };
    return (
        <View style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
            <SlidingModal logout={handleLogout}/>
            <View style={styles.titleContainer}>
                <Image
                    style={{ height: 40, aspectRatio: 1, borderRadius:100 }}
                    source={require('../assets/images/logo.jpeg')}
                    placeholder={{ blurhash: blurhash || 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                    transition={500}
                />
                <Text style={styles.title}>MZDP</Text>
            </View>
            <Image
                style={{ height: 50, aspectRatio: 1, borderRadius: 100 }}
                source={user?.profilePic}
                placeholder={{ blurhash: blurhash || 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                transition={500}
            />
        </View>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        shadowColor: '#000', // iOS
        shadowOffset: { width: 2, height: 4 }, // iOS
        shadowOpacity: 0.2, // iOS
        shadowRadius: 3, // iOS
        elevation: 5, // Android
    },
    titleContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    }
})