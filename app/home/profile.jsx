import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const profile = () => {
  return (
    <View>
      <Link href={'/register'}>register page</Link>
      <Link href={'/login'} style={{marginTop:20}}>login page</Link>
      <Link href={'/test'} style={{marginTop:20}}>create accont test page </Link>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})