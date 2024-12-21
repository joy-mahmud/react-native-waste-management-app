import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Linking } from 'react-native';

const ContactUsPage = () => {
  const handleEmail = () => {
    Linking.openURL('mailto:sabbir1517003@gmail.com?subject=Support Request&body=Hello, I need help with...');
  };

  const handlePhoneCall = () => {
    Linking.openURL('tel:+8801304175559');
  };

  const handleWebsite = () => {
    Linking.openURL('https://sites.google.com/view/ahmedsabbir/home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}> Meherpur Zila Development Program (MZDP)</Text>
      <Text style={styles.description}>
        We’re here to help! If you have any questions, feedback, or need support, feel free to reach out to us using the options below.
      </Text>

      <View style={styles.contactItem}>
        <Text style={styles.label}>Email:</Text>
        <TouchableOpacity onPress={handleEmail}>
          <Text style={styles.link}>support@mzdp.com</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactItem}>
        <Text style={styles.label}>Phone:</Text>
        <TouchableOpacity onPress={handlePhoneCall}>
          <Text style={styles.link}>+8801304175559</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactItem}>
        <Text style={styles.label}>Website:</Text>
        <TouchableOpacity onPress={handleWebsite}>
          <Text style={styles.link}>www.mzdp.com</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>Send Us a Message</Text>
      <TextInput style={styles.input} placeholder="Your Name" />
      <TextInput style={styles.input} placeholder="Your Email" keyboardType="email-address" />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your Message"
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ContactUsPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 20,
    textAlign:'center'
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 20,
  },
  contactItem: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  link: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
