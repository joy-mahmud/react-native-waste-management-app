import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LanguageSwitcher from '../../components/LanguageSwitcher'

const settings = () => {
  return (
    <View style={styles.container}>
      <LanguageSwitcher/>
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