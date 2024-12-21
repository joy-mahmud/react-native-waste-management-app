import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import { blurhash } from '../utils/constants';

const AboutPage = () => {
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

            <Text style={styles.sectionTitle}>About Us</Text>
            <Text style={styles.description}>
                Welcome to MZDP! We are dedicated to providing you with the best experience for [insert purpose of your app, e.g., "managing deliveries", "exploring local events"].
                Our mission is to make your life easier and more efficient with innovative solutions and user-friendly interfaces.
            </Text>

            <Text style={styles.sectionTitle}>Features</Text>
            <Text style={styles.description}>
                - Easy to use and navigate.{"\n"}
                - Secure and reliable.{"\n"}
                - Customizable to suit your needs.{"\n"}
                - Real-time updates and notifications.
            </Text>

            <Text style={styles.sectionTitle}>Contact Us</Text>
            <Text style={styles.description}>
                Have questions, feedback, or need support? Feel free to reach out to us:
            </Text>
            <Text style={styles.contactInfo}>
                Email: support@mzdp.com{"\n"}
                Phone: +1 (234) 567-8901{"\n"}
                Website: www.mzdp.com
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
