import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'


const index = () => {
  
  return (
    <View  style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
       <ActivityIndicator size='large' color={'black'}></ActivityIndicator>
       
    </View>
  )
}

export default index

const styles = StyleSheet.create({})