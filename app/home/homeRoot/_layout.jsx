import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HomeInnerLayout = () => {
  console.log()
  return (
    <Stack>
         <Stack.Screen name='homeCalendar' options={{headerShown:false}}/>
        <Stack.Screen name='formInputs' options={{title:'Fill out the information',headerTintColor:"#6A0DAD", animation:'slide_from_right'}}/>
       
    </Stack>
  )
}

export default HomeInnerLayout

const styles = StyleSheet.create({})