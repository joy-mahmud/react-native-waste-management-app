import React from 'react';
import { StyleSheet, Text, View, ScrollView, } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { blurhash } from '../utils/constants';
import { Image } from 'expo-image';

const AwarenessPage = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
               
                <FontAwesome name="recycle" size={40} color="#6A0DAD" />
                <Text style={styles.headerText}>Recycle for a Better Future</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Why Recycle?</Text>
                <Text style={styles.text}>
                    Recycling helps conserve resources, reduce pollution, and protect the environment. It also minimizes the amount of waste sent to landfills and incinerators, preserving our planet for future generations.
                </Text>

                <View style={{alignSelf:'center'}}>
                    <Image
                        style={{ height: 150, aspectRatio: 1, borderRadius: 25 }}
                        source={require('../assets/images/logo.jpeg')}
                        placeholder={{ blurhash: blurhash || 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                        transition={500}
                    />
                </View>

                <Text style={styles.sectionTitle}>How You Can Help</Text>
                <Text style={styles.text}>
                    - Separate recyclables from non-recyclable waste.{'\n'}
                    - Educate others about the importance of recycling.{'\n'}
                    - Support companies that use recycled materials.{'\n'}
                    - Reduce, reuse, and recycle every day.
                </Text>

                <Text style={styles.sectionTitle}>Did You Know?</Text>
                <Text style={styles.text}>
                    Recycling one ton of paper can save 17 trees and 7,000 gallons of water. Small steps can lead to big changes!
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
