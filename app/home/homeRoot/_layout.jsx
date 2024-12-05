import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HomeInnerLayout = () => {
  return (
    <Stack>
         <Stack.Screen name='homeCalendar' options={{headerShown:false}}/>
        <Stack.Screen name='timeAndOthers' options={{headerShown:false,animation:'slide_from_right'}}/>
       
    </Stack>
  )
}

export default HomeInnerLayout

const styles = StyleSheet.create({})