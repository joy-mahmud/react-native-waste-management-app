import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const WasteManagementForm = () => {
  const [address, setAddress] = useState('');
  const [holdingNumber, setHoldingNumber] = useState('');
  const [familyMembers, setFamilyMembers] = useState('');
  const [wasteType, setWasteType] = useState('');

  const handleSubmit = () => {
    if (!address || !holdingNumber || !familyMembers || !wasteType) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Simulate form submission
    Alert.alert('Form Submitted', `
      Address: ${address}
      Holding Number: ${holdingNumber}
      Family Members: ${familyMembers}
      Waste Type: ${wasteType}
    `);

    // Clear form
    setAddress('');
    setHoldingNumber('');
    setFamilyMembers('');
    setWasteType('');
  };

  return (
    <View style={styles.container}>
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

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default WasteManagementForm;
