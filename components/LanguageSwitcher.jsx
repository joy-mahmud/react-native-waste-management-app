import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Import the i18n configuration


const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    useEffect(() => {
        const loadLanguage = async () => {
          const savedLanguage = await AsyncStorage.getItem('language');
          setSelectedLanguage(savedLanguage || 'en');
        };
        loadLanguage();
      }, []);
    
      const changeLanguage = async (language) => {
        await AsyncStorage.setItem('language', language);
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('settings.select_language')}</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue) => changeLanguage(itemValue)}
                >
                    <Picker.Item label="English" value="en" />
                    <Picker.Item label="বাংলা" value="bn" />
                    {/* Add more languages here */}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    picker: {
        width: 200,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    pickerContainer: {
        width: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },

});

export default LanguageSwitcher;
