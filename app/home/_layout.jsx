import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext } from 'react';
import {AuthContext} from "../../context/authContext"
import AppHeader from '../../components/header';
import { useTranslation } from 'react-i18next';
import '../../i18n'; // Import the i18n configuration

export default function TabLayout() {
const {user}=useContext(AuthContext)
   const { t } = useTranslation();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#6A0DAD' }}>
      <Tabs.Screen
        name="homeScreen"
        options={{
            title:t('tabs.home'),
            header:()=><AppHeader user={user}/>,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
      />
       <Tabs.Screen
        name="profile"
         options={{
          title: t('tabs.profile'),
            headerShown:false,
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={28} color={color} />,
          }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: t('tabs.points'),
          headerTitleAlign:"center",
          tabBarIcon: ({ color }) => <FontAwesome6 name="coins" size={24} color={color}/>,
        }}
      />
       <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          headerTitle: t('tabs.settings'),
          headerTitleAlign:"center",
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
        }}
      />
     
    </Tabs>
  );
}

const styles = StyleSheet.create({})