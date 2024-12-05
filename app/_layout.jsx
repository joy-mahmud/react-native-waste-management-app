import { Slot, Stack, Tabs, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";

export default function RootLayout() {
  const segments = useSegments()
  const router=useRouter()
  useEffect(() => {
    const inHome=segments[0] == 'home'
    if (!inHome){
      router.replace('/home')
    }
  }, [])
  return (


    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />

    </Stack>


    // <Tabs></Tabs>


  );
}
