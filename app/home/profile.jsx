// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { Link, useRouter } from 'expo-router'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// const profile = () => {
//   const router= useRouter()
//   const handleLogout= async()=>{
//     await AsyncStorage.removeItem('authToken')
//     router.replace('/login')

//   }
//   return (
//     <View>
//       <Link href={'/register'}>register page</Link>
//       <Link href={'/login'} style={{marginTop:20}}>login page</Link>
//       <Link href={'/test'} style={{marginTop:20}}>create accont test page </Link>
//       <Link href={'/phone'} style={{marginTop:20}}>phone auth </Link>
//       <TouchableOpacity onPress={handleLogout} style={{padding:10,backgroundColor: "#F4722B",}}><Text>logout</Text></TouchableOpacity>
//     </View>
//   )
// }

// export default profile

// const styles = StyleSheet.create({})

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Alert, ImageBackground, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';


const ProfileScreen = () => {
  const router = useRouter()

  const [profile, setProfile] = useState({
    name: 'John Doe',
    phone: '123-456-7890',
    address: '123 Main St',
    holdingNo: '45A',
    profilePic: 'https://i.ibb.co.com/MVkgLyt/MPS-018-BL-WEB-01-1.jpg', // Replace with actual image URL or local path
  });




  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem('user')
      const user = JSON.parse(userData)
      if (user) {
        setProfile({ ...user }); // Convert string back to object
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
  const handleEditProfile = () => {
    router.push('editProfile')
  }

  return (
    <ImageBackground
      source={require('../../assets/images/profileBg.jpg')} // Adjust the path if necessary
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: profile.profilePic }}
          style={styles.profilePic}
        />
        <TouchableOpacity onPress={handleEditProfile} style={styles.editProfileBtn}>
          <Text style={styles.editProfileText}>Edit profile</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Name: {profile.name}</Text>
        <Text style={styles.text}>Phone: {profile.phone}</Text>
        <Text style={styles.text}>Address: {profile.address}</Text>
        <Text style={styles.text}>Holding No: {profile.holdingNo}</Text>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style='dark'></StatusBar>
    </ImageBackground>
  );
};

// Styling the components
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add semi-transparent overlay
    padding: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#fff', // White text for better visibility
    marginVertical: 5,
  },
  editProfileBtn: {

    backgroundColor: '#0066b2',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  editProfileText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
  },
  
});

export default ProfileScreen;
