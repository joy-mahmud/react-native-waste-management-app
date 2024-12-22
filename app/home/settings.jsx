import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const settings = () => {
  return (
    <View style={styles.container}>
      <Text style={{textAlign:'center'}}>
        select language
      </Text>
    </View>
  )
}

export default settings

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})