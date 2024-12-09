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
const Register = () => {
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

  const handleSignup = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name is required.');
      return;
    }
    if (!phoneNumber.trim()) {
      Alert.alert('Validation Error', 'Phone number is required.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Validation Error', 'Phone number is required.');
      return;
    } else {
      if (password.length < 6) {
        Alert.alert("password error", "please enter at least 6 characters for the password")
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
      usualWasteType:wasteType

    };
  
    try {
      // Make the API call
      const response = await axios.post(`${BASE_URL}/register`, data);
      const token=response.data.token
      if (response.status === 200) { // Assuming 201 is the success code
        Alert.alert('Registration successful',"Welcome you have successfully completed your registration");
        await AsyncStorage.setItem("authToken",token)
        router.replace('/home')
        setAddress('');
        setHoldingNumber('');
        setFamilyMembers('');
        setWasteType('');
        //router.replace('/login'); 
      } else {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while registering. Please try again.');
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
            <Text style={styles.title}>Create a new account</Text>

            {/* Name Input */}
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />

            {/* Phone Number Input */}
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phoneNumber}
              keyboardType="phone-pad"
              onChangeText={setPhoneNumber}
            />

            {/* Email Input */}
            <Text style={styles.label}>Email (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Password</Text>
            <View style={styles.passContainer}>
              <TextInput
                style={styles.passInput}
                placeholder="Enter your password"
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
              <Text style={{ fontSize: 16 }}>Already have an account?</Text><Link style={{ color: "#6A0DAD", fontSize: 16, fontWeight: 500 }} href={'/login'}>Login</Link>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        }
        {
          currentStep == 2 && <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Fill the information to complete registration</Text>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              value={address}
              onChangeText={setAddress}
            />

            <Text style={styles.label}>Holding Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your holding number"
              value={holdingNumber}
              onChangeText={setHoldingNumber}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Family Members</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number of family members"
              value={familyMembers}
              onChangeText={setFamilyMembers}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Usual Waste Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={wasteType}
                onValueChange={(itemValue) => setWasteType(itemValue)}
              >
                <Picker.Item label="Select waste type" value="" />
                <Picker.Item label="Organic" value="organic" />
                <Picker.Item label="Recyclable" value="recyclable" />
                <Picker.Item label="Hazardous" value="hazardous" />
                <Picker.Item label="E-waste" value="e-waste" />
              </Picker>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCompleteSignUp}>
              <Text style={styles.buttonText}>Complete</Text>
            </TouchableOpacity>

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
