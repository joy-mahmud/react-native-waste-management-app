import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'


const Main = () => {

  return (
   <Redirect href={'/home'}></Redirect>
  )
}

export default Main

const styles = StyleSheet.create({})