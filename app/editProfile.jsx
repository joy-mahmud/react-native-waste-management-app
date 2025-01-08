import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/authContext';
import { BASE_URL, blurhash } from '../utils/constants';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Import the i18n configuration

const editProfile = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter()
    // const { user } = useContext(AuthContext)
    const { userId } = useContext(AuthContext)
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [holdingNumber, setHoldingNumber] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [imageUri, setImageUri] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            const userData = await AsyncStorage.getItem('user')
            const user = JSON.parse(userData)
            if (user) {
                setName(user.name); // Convert string back to object
                setPhoneNumber(user.phone); // Convert string back to object
                setAddress(user.address);
                setHoldingNumber(user.holdingNo)
                setProfilePic(user.profilePic) // Convert string back to object
            }
            //console.log(user)
        }
        getUser()
    }, []);


    const pickImage = async () => {
        // Request permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'You need to grant permission to access the library');
            return;
        }

        // Open image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1], // Crop to square
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri
            setProfilePic(imageUri); // Save image URI
            setImageUri(imageUri)
            // uploadImageToServer(imageUri)

        }
    };
    const uploadImageToServer = async (imageUri) => {
        const data = new FormData();
        data.append('file', {
            uri: imageUri,
            type: 'image/jpg', // Adjust type if needed
            name: name,
        });

        const response = await fetch(`${BASE_URL}/upload`, {
            method: 'POST',
            body: data,
        });

        const result = await response.json();
        //console.log('Uploaded Image URL:', result.url);
        return result
    };
    const handleSaveChange = async () => {
        setLoading(true)
        if (imageUri) {
            const result = await uploadImageToServer(imageUri)
            if (result.url) {
                const data = {
                    userId: userId,
                    name: name,
                    phone: phoneNumber,
                    address: address,
                    holdingNo: holdingNumber,
                    profilePic: result.url
                }
                try {
                    const response = await axios.post(`${BASE_URL}/updateProfile`, data, {
                        headers: {
                            'Content-Type': 'application/json', // Ensure the correct header is set for JSON
                        },
                    });


                    if (response.status == 200) {
                        Alert.alert('profile updated')
                        await AsyncStorage.setItem("user", JSON.stringify(response.data.user))
                        setLoading(false)
                        router.replace('home/profile')
                    }
                } catch (error) {
                    console.log(error)
                }

            }
        }
        else {
            const data = {
                userId: userId,
                name: name,
                phone: phoneNumber,
                address: address,
                holdingNo: holdingNumber,
                profilePic: profilePic
            }
            try {
                const response = await axios.post(`${BASE_URL}/updateProfile`, data, {
                    headers: {
                        'Content-Type': 'application/json', // Ensure the correct header is set for JSON
                    },
                });


                if (response.status == 200) {
                    Alert.alert('profile updated')
                    await AsyncStorage.setItem("user", JSON.stringify(response.data.user))
                    setLoading(false)
                    router.replace('home/profile')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    const handleCancel = () => {
        //console.log('cancel pressed')
        router.replace('home/profile')
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={40}
            >
                <ScrollView >
                    <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                        <Image
                            style={{ height: 120, aspectRatio: 1, marginBottom: 20, borderRadius: 100 }}
                            source={profilePic}
                            placeholder={{ blurhash: blurhash || 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                            transition={500}
                        />

                        {/* Button to Close Modal */}
                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={pickImage}
                        >
                            <Text style={{ color: '#fff' }}>{t('edit_profile.upload_photo')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexGrow: 1, width: "100%" }}>
                        <Text style={styles.label}>{t('edit_profile.name')}</Text>
                        <TextInput
                            style={styles.input}
                            value={name} // Shows the default value from AsyncStorage
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>{t('edit_profile.phone')}</Text>
                        <TextInput
                            style={styles.input}
                            value={phoneNumber}
                            keyboardType="phone-pad"
                            onChangeText={setPhoneNumber}
                        />

                        <Text style={styles.label}>{t('edit_profile.address')}</Text>
                        <TextInput
                            style={styles.input}
                            value={address}
                            onChangeText={setAddress}
                        />

                        <Text style={styles.label}>{t('edit_profile.holding_no')}</Text>
                        <TextInput
                            style={styles.input}
                            value={holdingNumber}
                            keyboardType="numeric"
                            onChangeText={setHoldingNumber}
                        />

                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                        {
                            loading ? <View style={styles.activity}><ActivityIndicator></ActivityIndicator></View> : <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={handleSaveChange}
                            >
                                <Text style={{ color: '#fff', textAlign: 'center' }}>{t('edit_profile.save')}</Text>
                            </TouchableOpacity>

                        }
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleCancel}
                        >
                            <Text style={{ color: '#fff' }}>{t('edit_profile.cancel')}</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>


            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default editProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 5
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    activity: {
        paddingHorizontal: 50,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalContent: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    uploadButton: {
        backgroundColor: '#6A0DAD',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,


    },
    cancelButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    }
})