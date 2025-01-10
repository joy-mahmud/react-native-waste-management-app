import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Import the i18n configuration
const Login = () => {
  const { t } = useTranslation();
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Login Successful!',
      text2: 'Congtratulations. you have successfully logged in 👋',
      position: 'top',
      visibilityTime: 2000, // Auto-dismiss after 500ms
    });

  };
  const handleLogin = async () => {

    if (!phoneNumber.trim()) {
      Alert.alert('Validation Error', 'Phone number is required.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Password Error', 'Please put your password');
      return;
    }
    const data = {
      phone: phoneNumber,
      password: password
    }
    try {
      const response = await axios.post(`${BASE_URL}/login`, data);

      if (response.status === 200) {
        const token = response.data.token;
        const user = response.data?.user

        // Save token in AsyncStorage
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        showToast()
        setPhoneNumber('')
        setPassword('')
        setTimeout(() => {
          router.replace('/home');
        }, 1500);

        // Navigate to the home screen

      }
    } catch (error) {
      // Handle error response
      if (error.response && error.response.status === 401) {
        Alert.alert(t('login.invalid_credentials'), t('login.invalid_msg'));
      } else {
        // Handle other possible errors
        Alert.alert('Error', 'Something went wrong. Please try again later.');
        console.error(error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={40}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>{t('login.title')}</Text>


          {/* Phone Number Input */}
          <Text style={styles.label}>{t('login.phone')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('login.placeholder_phone')}
            value={phoneNumber}
            keyboardType="phone-pad"
            onChangeText={setPhoneNumber}
          />

          <Text style={styles.label}>{t('login.password')}</Text>
          <View style={styles.passContainer}>
            <TextInput
              style={styles.passInput}
              placeholder={t('login.placeholder_password')}
              value={password}
              secureTextEntry={!isPasswordVisible}
              onChangeText={setPassword}
              multiline={false}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}

            >
              <MaterialCommunityIcons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="#777"
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', gap: 2, marginBottom: 15, }}>
            <Text style={{ fontSize: 16 }}>{t('login.do_not_have_account')}</Text><Link style={{ color: "#6A0DAD", fontSize: 16, fontWeight: 500 }} href={'/register'}>{t('login.create_account')}</Link>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>{t('login.login')}</Text>
          </TouchableOpacity>
          <Toast />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: "#6A0DAD"
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6A0DAD',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  passInput: {
    width: '90%',
    fontSize: 16,
    padding: 0,
    color: '#000',

  },
  eyeIcon: {
    marginLeft: 8,
  },
});

export default Login;
