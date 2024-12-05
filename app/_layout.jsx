import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function RootLayout() {
  return (
    

  <Stack>
  <Stack.Screen name="home" options={{headerShown:false}}/>
  <Stack.Screen name="register" options={{headerShown:false}}/>

</Stack>
 

  // <Tabs></Tabs>
  

  );
}
