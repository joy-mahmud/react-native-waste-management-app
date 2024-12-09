import { Slot, Stack, Tabs, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { AuthProvider } from "../context/authContext"
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function RootLayout() {
  const segments = useSegments()
  const router = useRouter()
  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token !== null) {
          console.log(token)
        }
        else{
          router.replace('/login')
        }
      } catch (e) {
        // error reading value
      }
    };
    getAuthToken()

    const inHome = segments[0] == 'home'
    if (!inHome) {
      router.replace('/home')
    }
  }, [])
  return (


    <AuthProvider>
      <Stack>

        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="test" options={{ headerShown: false }} />

      </Stack>
    </AuthProvider>

    // <Tabs></Tabs>


  );
}
