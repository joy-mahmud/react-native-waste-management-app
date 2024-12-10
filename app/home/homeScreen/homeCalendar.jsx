import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link, useRouter } from 'expo-router'
import DatePicker from 'react-native-modern-datepicker';
import dayjs from 'dayjs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Home = () => {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const [date, setDate] = useState(currentDate)
  const router=useRouter()
  const handleDateChange = (propdate) => {
    setDate(propdate)
  }

  const handleNext = () => {
    console.log(date)
    router.push(
       `/home/homeScreen/formInputs?date=${date}`,
      
    )
  }

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: "#F4722B", marginBottom: 10 }}>Select a date to complete task</Text>
      <DatePicker
        options={{
          backgroundColor: '#090C08',
          textHeaderColor: '#FFA25B',
          textDefaultColor: '#F6E7C1',
          selectedTextColor: '#fff',
          mainColor: '#F4722B',
          textSecondaryColor: '#D6C7A1',
          borderColor: 'rgba(122, 146, 165, 0.1)',
        }}
        current={date}
        selected={date}
        mode="calendar"
        maximumDate={currentDate}
        minuteInterval={1}
        style={{ borderRadius: 10 }}
        onDateChange={handleDateChange}
    
      ></DatePicker>
      <TouchableOpacity onPress={handleNext} style={{ backgroundColor: "#F4722B", paddingRight: 10,paddingLeft:15, paddingVertical: 10, borderRadius: 10, marginTop: 15 }}>
        <View style={{flexDirection:'row', alignItems:"flex-end"}}>
          <Text style={{ fontSize: 20, fontWeight: 500, color: "#fff" }}>next</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
     

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2
  }
})