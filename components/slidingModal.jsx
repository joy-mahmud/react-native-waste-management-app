import React, { useState, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    PanResponder,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { blurhash } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Import the i18n configuration

const SlidingModal = () => {
     const { t, i18n } = useTranslation();
    const [visible, setVisible] = useState(false);
    const translateX = useRef(new Animated.Value(-Dimensions.get('window').width)).current;
    const router = useRouter()
    const openModal = () => {
        setVisible(true);
        Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(translateX, {
            toValue: -Dimensions.get('window').width,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    };
    //swipe left to close modal

    //   const panResponder = useRef(
    //     PanResponder.create({
    //       onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 20,
    //       onPanResponderMove: (_, gestureState) => {
    //         if (gestureState.dx < 0) {
    //           translateX.setValue(gestureState.dx);
    //         }
    //       },
    //       onPanResponderRelease: (_, gestureState) => {
    //         if (gestureState.dx < -100) {
    //           closeModal();
    //         } else {
    //           Animated.spring(translateX, {
    //             toValue: 0,
    //             useNativeDriver: true,
    //           }).start();
    //         }
    //       },
    //     })
    //   ).current;
    const handleModalButton = (route) => {
        router.push(route)
        closeModal()
    }
        const handleLogout = async (route) => {
      
            // Perform logout (e.g., remove token from AsyncStorage or context)
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('user');
     
            // Alert.alert('Logout Successful');
            router.replace(route)
            closeModal()
          };
   
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openModal} style={styles.button}>
                <Ionicons name="menu-sharp" size={30} color="black" />
            </TouchableOpacity>

            <Modal transparent visible={visible} animationType="none">
                {/* Detect click outside */}
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalBackground}>
                        {/* Prevent clicks inside modal content from triggering close */}
                        <TouchableWithoutFeedback>
                            <Animated.View
                                // {...panResponder.panHandlers}
                                style={[styles.modalContent, { transform: [{ translateX }] }]}
                            >
                                <View style={styles.titleContainer}>
                                    <Image
                                        style={{ height: 50, aspectRatio: 1, borderRadius: 10 }}
                                        source={require('../assets/images/logo.jpeg')}
                                        placeholder={{ blurhash: blurhash || 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                                        transition={500}
                                    />
                                    <Text style={styles.title}>MZDP</Text>
                                </View>
                                <View style={{ backgroundColor: 'rgba(132, 128, 128, 0.5)', height: 2, marginVertical: 5 }}></View>

                                <TouchableOpacity onPress={() => handleModalButton('about')} style={styles.modalButton}>
                                    <Text style={styles.buttonText}>{t('sidebar.screens.about')}</Text>

                                </TouchableOpacity>
                                <View style={{ backgroundColor: 'rgba(132, 128, 128, 0.5)', height: 1, marginVertical: 5 }}></View>
                                <TouchableOpacity onPress={() => handleModalButton('contact')} style={styles.modalButton}>
                                    <Text style={styles.buttonText}>{t('sidebar.screens.contact')}</Text>

                                </TouchableOpacity>
                                <View style={{ backgroundColor: 'rgba(132, 128, 128, 0.5)', height: 1, marginVertical: 5 }}></View>
                                <TouchableOpacity onPress={() => handleModalButton('awarness')} style={styles.modalButton}>
                                    <Text style={styles.buttonText}>{t('sidebar.screens.awarness')}</Text>

                                </TouchableOpacity>
                                <View style={{ backgroundColor: 'rgba(132, 128, 128, 0.5)', height: 1, marginVertical: 5 }}></View>
                                
                                <TouchableOpacity onPress={()=>handleLogout('/login')} style={styles.modalButton}>
                                    <Text style={styles.buttonText}>{t('sidebar.screens.logout')}</Text>

                                </TouchableOpacity>

                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    button: {
        padding: 10,
        borderRadius: 5,
        width: 50
    },
    modalButton: {
        paddingVertical: 10
    },
    buttonText: {
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,

        width: '65%'
    },
    modalText: {
        marginBottom: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});

export default SlidingModal;
