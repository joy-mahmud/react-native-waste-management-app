import React from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { blurhash } from '../utils/constants';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Import the i18n configuration
const AwarenessPage = () => {
    const { t } = useTranslation();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
               
                <FontAwesome name="recycle" size={40} color="#6A0DAD" />
                <Text style={styles.headerText}>{t('sidebar.awarness.title')}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>{t('sidebar.awarness.why_recycle')}</Text>
                <Text style={styles.text}>
                {t('sidebar.awarness.why_recycle_content')}
                </Text>

                <View style={{alignSelf:'center'}}>
                    <Image
                        style={{ height: 150, aspectRatio: 1, borderRadius: 25 }}
                        source={require('../assets/images/logo.jpeg')}
                        placeholder={{ blurhash: blurhash || 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                        transition={500}
                    />
                </View>

                <Text style={styles.sectionTitle}>{t('sidebar.awarness.how_u_help')}</Text>
                <Text style={styles.text}>
                {t('sidebar.awarness.how_u_help_1')}{'\n'}
                {t('sidebar.awarness.how_u_help_2')}{'\n'}
                {t('sidebar.awarness.how_u_help_3')}{'\n'}
                {t('sidebar.awarness.how_u_help_4')}
                </Text>

                <Text style={styles.sectionTitle}>{t('sidebar.awarness.did_u_know')}</Text>
                <Text style={styles.text}>
                {t('sidebar.awarness.did_u_know_content')}
                </Text>
            </View>
        </ScrollView>
    );
};

export default AwarenessPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 16,
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6A0DAD',
        marginTop: 10,
        textAlign: 'center',
    },
    content: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
});
