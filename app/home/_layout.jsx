import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#6A0DAD' }}>
      <Tabs.Screen
        name="homeRoot"
        options={{
            title: 'Waste-Manager',
            headerTitleAlign:"center",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
      />
       <Tabs.Screen
        name="profile"
         options={{
            title: 'Profile',
            headerTitleAlign:"center",
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={28} color={color} />,
          }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'My Points',
          tabBarIcon: ({ color }) => <FontAwesome6 name="coins" size={24} color={color}/>,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({})