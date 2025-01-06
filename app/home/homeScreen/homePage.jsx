import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import DatePicker from 'react-native-modern-datepicker';
import dayjs from 'dayjs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SponsoredBy from '../../../components/sponsor';
import NearestRecycle from '../../../components/nearestRecycle';
import TrackImpact from '../../../components/TrackImpact';
import { useTranslation } from 'react-i18next';
import '../../../i18n'; // Import the i18n configuration

const Home = () => {
  const currentDate = dayjs().format('YYYY-MM-DD');
  const [date, setDate] = useState(currentDate);
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleNext = () => {
    console.log(date);
    router.push(`/home/homeScreen/formInputs?date=${date}`);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.headerText}>{t('home.select_date')}</Text>
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
        style={styles.datePicker}
        onDateChange={handleDateChange}
      />
      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Text style={styles.buttonText}>{t('home.next')}</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#fff" />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => router.push('/test')} style={styles.button}>
        <Text style={styles.buttonText}>Test</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#fff" />
      </TouchableOpacity> */}
      <SponsoredBy />
      <TrackImpact />
      <NearestRecycle />

    </ScrollView>


  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    flexGrow:1
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 23,
    color: '#6A0DAD',
    marginBottom: 20,
    marginTop:10
  },
  datePicker: {
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A0DAD',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
    width: '90%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginRight: 5,
  },
});
