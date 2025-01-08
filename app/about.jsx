import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { blurhash } from '../utils/constants';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Import the i18n configuration
const AboutPage = () => {
    const { t } = useTranslation();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    style={{ height: 150, aspectRatio: 1, borderRadius: 26 }}
                    source={require('../assets/images/logo.jpeg')}
                    placeholder={{ blurhash: blurhash || 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                    transition={500}
                />
                <Text style={styles.appName}>MZDP</Text>
            </View>

            <Text style={styles.sectionTitle}>{t('sidebar.about.title')}</Text>
            <Text style={styles.description}>
              {t('sidebar.about.title_content')}
            </Text>

            <Text style={styles.sectionTitle}>{t('sidebar.about.feature')}</Text>
            <Text style={styles.description}>
               {t('sidebar.about.feature_content1')}{"\n"}
               {t('sidebar.about.feature_content2')}{"\n"}
               {t('sidebar.about.feature_content3')}{"\n"}
               {t('sidebar.about.feature_content4')}
            </Text>

            <Text style={styles.sectionTitle}>{t('sidebar.about.contact')}</Text>
            <Text style={styles.description}>
                {t('sidebar.about.contact_content')}
            </Text>
            <Text style={styles.contactInfo}>
                {t('sidebar.about.email')}: support@mzdp.com{"\n"}
                {t('sidebar.about.phone')}: +1 (234) 567-8901{"\n"}
                {t('sidebar.about.website')}: www.mzdp.com
            </Text>
        </ScrollView>
    );
};

export default AboutPage;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 20,
        marginBottom: 10,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6A0DAD',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
    },
    contactInfo: {
        fontSize: 16,
        color: '#007BFF',
        marginTop: 10,
        lineHeight: 24,
    },
});
