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
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Import the i18n configuration
const Register = () => {
  const { t } = useTranslation();
  const router = useRouter()
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [holdingNumber, setHoldingNumber] = useState('');
  const [familyMembers, setFamilyMembers] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1)


  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Login Successful!',
      text2: 'Congtratulations. you have successfully logged in 👋',
      position: 'top',
      visibilityTime: 1500, // Auto-dismiss after 500ms
    });

  };
  const handleSignup = () => {
    if (!name.trim()) {
      Alert.alert(t('registration.validation_error'), t('registration.validation_name'));
      return;
    }
    if (!phoneNumber.trim()) {
      Alert.alert(t('registration.validation_error'), t('registration.validation_phone'));
      return;
    }
    if (!password.trim()) {
      Alert.alert(t('registration.validation_error'), t('registration.validation_password'));
      return;
    } else {
      if (password.length < 6) {
        Alert.alert(t('registration.password_error'), t('registration.password_error_msg'))
        return;
      }
      setCurrentStep(2)
    }

  };
  const handleCompleteSignUp = async () => {
    if (!address || !holdingNumber || !familyMembers || !wasteType) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Simulate form submission
    // Alert.alert('Form Submitted', `
    //   Address: ${address}
    //   Holding Number: ${holdingNumber}
    //   Family Members: ${familyMembers}
    //   Waste Type: ${wasteType}
    // `);

    const data = {
      name: name,
      email: email,
      password: password,
      phone: phoneNumber,
      address: address,
      holdingNo: holdingNumber,
      familyMember: familyMembers,
      usualWasteType: wasteType

    };

    try {
      // Make the API call
      const response = await axios.post(`${BASE_URL}/register`, data);
      const token = response.data.token
      const user = response.data?.user
      if (response.status === 200) { // Assuming 201 is the success code
        //Alert.alert('Registration successful', "Welcome you have successfully completed your registration");
        await AsyncStorage.setItem("authToken", token)
        await AsyncStorage.setItem("user", JSON.stringify(user))
        showToast()
        setTimeout(() => {
          router.replace('/home');
        }, 1500);

        setAddress('');
        setHoldingNumber('');
        setFamilyMembers('');
        setWasteType('');
        //router.replace('/login'); 
      } else {
        Alert.alert(t('registration.error'), t('registration.error_msg'));
      }
    } catch (error) {
      console.log(error);
      Alert.alert(t('registration.error'), t('registration.error_msg2'));
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={40}
      >
        {
          currentStep == 1 && <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>{t('registration.title')}</Text>

            {/* Name Input */}
            <Text style={styles.label}>{t('registration.name')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('registration.placeholder_name')}
              value={name}
              onChangeText={setName}
            />

            {/* Phone Number Input */}
            <Text style={styles.label}>{t('registration.phone')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('registration.placeholder_phone')}
              value={phoneNumber}
              keyboardType="phone-pad"
              onChangeText={setPhoneNumber}
            />

            {/* Email Input */}
            <Text style={styles.label}>{t('registration.email')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('registration.placeholder_email')}
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <Text style={styles.label}>{t('registration.password')}</Text>
            <View style={styles.passContainer}>
              <TextInput
                style={styles.passInput}
                placeholder={t('registration.placeholder_password')}
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
              <Text style={{ fontSize: 16 }}>{t('registration.already_have_account')}</Text><Link style={{ color: "#6A0DAD", fontSize: 16, fontWeight: 500 }} href={'/login'}>{t('registration.login')}</Link>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>{t('registration.next')}</Text>
            </TouchableOpacity>
          </ScrollView>
        }
        {
          currentStep == 2 && <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>{t('registration.fill_info')}</Text>
            <Text style={styles.label}>{t('registration.address')}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              value={address}
              onChangeText={setAddress}
            />

            <Text style={styles.label}>{t('registration.holding_no')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('registration.placeholder_address')}
              value={holdingNumber}
              onChangeText={setHoldingNumber}
              keyboardType="numeric"
            />

            <Text style={styles.label}>{t('registration.family_members')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('registration.placeholder_family_members')}
              value={familyMembers}
              onChangeText={setFamilyMembers}
              keyboardType="numeric"
            />

            <Text style={styles.label}>{t('registration.usual_waste_type')}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={wasteType}
                onValueChange={(itemValue) => setWasteType(itemValue)}
              >
                <Picker.Item label={t('registration.select_waste_type')} value="" />
                <Picker.Item label={t('registration.organic')} value="organic" />
                <Picker.Item label={t('registration.recyclable')} value="recyclable" />
                <Picker.Item label={t('registration.hazardous')} value="hazardous" />
                <Picker.Item label={t('registration.e_waste')} value="e-waste" />
              </Picker>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCompleteSignUp}>
              <Text style={styles.buttonText}>{t('registration.complete')}</Text>
            </TouchableOpacity>
            <Toast />
          </ScrollView>
        }
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
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default Register;
