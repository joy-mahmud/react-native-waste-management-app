import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { blurhash } from '../utils/constants';
import { Image } from 'expo-image';

// Import images statically
import sponsorALogo from '../assets/images/logo1.jpg';
import sponsorBLogo from '../assets/images/logo2.jpg';
import sponsorCLogo from '../assets/images/logo3.jpg';
import sponsorDLogo from '../assets/images/logo4.jpg';

const sponsors = [
    { id: 1, name: 'Sponsor A', logo: sponsorALogo },
    { id: 2, name: 'Sponsor B', logo: sponsorBLogo },
    { id: 3, name: 'Sponsor C', logo: sponsorCLogo },
    { id: 4, name: 'Sponsor D', logo: sponsorDLogo },
];

const SponsoredBy = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sponsored By</Text>
            <FlatList
                data={sponsors}
                renderItem={({ item }) => (
                    <View style={styles.sponsorCard}>
                        <Image
                            style={styles.logo}
                            source={item.logo} // Use static import for images
                            placeholder={{ blurhash: blurhash || 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
                            transition={500}
                        />
                        <Text style={styles.sponsorName}>{item.name}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()} // Convert id to string
                horizontal // Make the FlatList horizontal
                showsHorizontalScrollIndicator={false} 
            />
        </View>
    );
};

export default SponsoredBy;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginTop: 50,
        elevation: 3,
        height:250 // Adds a subtle shadow for better appearance
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    sponsorCard: {
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding:10,
        elevation: 2,
        height:170
    },
    logo: {
        width: 120,
        height: 120,
        contentFit: 'fill',
        marginBottom: 8,
        borderRadius:10
    },
    sponsorName: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        color: '#555',
    },
});
