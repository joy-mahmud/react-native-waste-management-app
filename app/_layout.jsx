import { Slot, Stack, Tabs, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { AuthContext, AuthProvider } from "../context/authContext"
import { useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
export default function RootLayout() {
  const segments = useSegments()
  const router = useRouter()


  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token !== null) {
          const inHome = segments[0] == 'home'
          if (!inHome) {
            router.replace('/home')
          }
        }
        else {
          router.replace('/login')
        }
      } catch (e) {
        // error reading value
      }
    };
    getAuthToken()


  }, [])

  return (


    <AuthProvider>

      <Stack>

        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="editProfile" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerTitle:"About Us",headerTitleAlign:'center' }} />
        <Stack.Screen name="contact" options={{ headerTitle:"Contact Us",headerTitleAlign:'center' }} />
        <Stack.Screen name="awarness" options={{ headerTitle:"Awarness and updates",headerTitleAlign:'center' }} />
        <Stack.Screen name="test" options={{ headerTitle:"test",headerTitleAlign:'center' }} />
        
      </Stack>
      <Toast />
  
    </AuthProvider>

    // <Tabs></Tabs>


  );
}


