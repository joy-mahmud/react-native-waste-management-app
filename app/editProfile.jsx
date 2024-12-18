import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/authContext';
import { BASE_URL } from '../utils/constants';
import { useRouter } from 'expo-router';
const editProfile = () => {
    const router=useRouter()
    const { user } = useContext(AuthContext)
    const [name, setName] = useState(user ? user.name : '');
    const [phoneNumber, setPhoneNumber] = useState(user ? user.phone : '');
    const [address, setAddress] = useState(user ? user.address : '');
    const [holdingNumber, setHoldingNumber] = useState(user ? user.holdingNo : '');
    const [profile, setProfile] = useState({
        name: 'John Doe',
        phone: '123-456-7890',
        address: '123 Main St',
        holdingNo: '45A',
        profilePic: 'https://i.ibb.co.com/MVkgLyt/MPS-018-BL-WEB-01-1.jpg', // Replace with actual image URL or local path
    });
    const [profilePic, setProfilePic] = useState(null);
    const [imageUri, setImageUri] = useState('')
    useEffect(() => {
        const getUser = async () => {
            const userData = await AsyncStorage.getItem('user');
            console.log(userData)
            const user = JSON.parse(userData);
            console.log(user)
            if (user) {
                setProfile({
                    ...user,
                    profilePic: user.profilePic || 'https://i.ibb.co.com/MVkgLyt/MPS-018-BL-WEB-01-1.jpg', // Fallback for profilePic
                });
                setName(user.name || ''); // Initialize the state with values from storage
                setPhoneNumber(user.phone || '');
                setAddress(user.address || '');
                setHoldingNumber(user.holdingNo || '');
            }

        };
        getUser();
        console.log(user.address)
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
            uploadImageToServer(imageUri)

        }
    };
    const uploadImageToServer = async (imageUri) => {
        const data = new FormData();
        data.append('file', {
            uri: imageUri,
            type: 'image/jpg', // Adjust type if needed
            name: user.name,
        });

        const response = await fetch(`${BASE_URL}/upload`, {
            method: 'POST',
            body: data,
        });

        const result = await response.json();
        console.log('Uploaded Image URL:', result.url);
    };
    const handleSaveChange = async () => {
        console.log('save pressed')
    }
    const handleCancel = () => {
        console.log('cancel pressed')
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
                            source={profilePic ? { uri: profilePic } : { uri: profile.profilePic }}
                            style={styles.profilePic}
                        />

                        {/* Button to Close Modal */}
                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={pickImage}
                        >
                            <Text style={{ color: '#fff' }}>upload new photo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexGrow: 1, width: "100%" }}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name} // Shows the default value from AsyncStorage
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            value={phoneNumber}
                            keyboardType="phone-pad"
                            onChangeText={setPhoneNumber}
                        />

                        <Text style={styles.label}>Address</Text>
                        <TextInput
                            style={styles.input}
                            value={address}
                            onChangeText={setAddress}
                        />

                        <Text style={styles.label}>Holding Number</Text>
                        <TextInput
                            style={styles.input}
                            value={holdingNumber}
                            keyboardType="numeric"
                            onChangeText={setHoldingNumber}
                        />
                       
                    </View>
                    <View style={{ alignItems: 'center', flexDirection:'row',gap:10,justifyContent:'center' }}>
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={handleSaveChange}
                            >
                                <Text style={{ color: '#fff',textAlign:'center' }}>Save Changes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleCancel}
                        >
                            <Text style={{ color: '#fff' }}>cancel</Text>
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
        paddingTop: 20,
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
    cancelButton:{
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    }
})