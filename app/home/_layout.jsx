import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useContext } from 'react';
import {AuthContext} from "../../context/authContext"

export default function TabLayout() {
  const {value}=useContext(AuthContext)
  console.log(value)
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#6A0DAD' }}>
      <Tabs.Screen
        name="homeScreen"
        options={{
            title: 'Home',
            headerTitle:"Waste Management System",
            headerTitleAlign:"center",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
      />
       <Tabs.Screen
        name="profile"
         options={{
            headerShown:false,
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={28} color={color} />,
          }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'My Points',
          headerTitleAlign:"center",
          tabBarIcon: ({ color }) => <FontAwesome6 name="coins" size={24} color={color}/>,
        }}
      />
     
    </Tabs>
  );
}

const styles = StyleSheet.create({})