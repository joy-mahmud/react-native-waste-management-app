import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en/translation.json';
import bn from './locales/bn/translation.json';

const resources = {
  en: { translation: en },
  bn: { translation: bn },
};

const getSavedLanguage = async () => {
  const savedLanguage = await AsyncStorage.getItem('language');
  return savedLanguage || 'en';
};

const initializeI18n = async () => {
  const savedLanguage = await getSavedLanguage();

  i18n
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
      resources,
      lng: savedLanguage, // default language
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

initializeI18n();

export default i18n;
