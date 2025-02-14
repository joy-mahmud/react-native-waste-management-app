import { Slot, Stack, Tabs, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { AuthContext, AuthProvider } from "../context/authContext"
import { useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Import the i18n configuration
export default function RootLayout() {
  const { t, i18n } = useTranslation(); 
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
        <Stack.Screen name="about" options={{ headerTitle:t('sidebar.screens.about'),headerTitleAlign:'center' }} />
        <Stack.Screen name="contact" options={{ headerTitle:t('sidebar.screens.contact'),headerTitleAlign:'center' }} />
        <Stack.Screen name="awarness" options={{ headerTitle:t('sidebar.screens.awarness'),headerTitleAlign:'center' }} />
        <Stack.Screen name="test" options={{ headerTitle:"test",headerTitleAlign:'center' }} />
        
      </Stack>
      <Toast />
  
    </AuthProvider>

    // <Tabs></Tabs>


  );
}


