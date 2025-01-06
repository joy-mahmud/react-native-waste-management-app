import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Import the i18n configuration

const TrackImpact = () => {
    const [recycle, setRecycle] = useState(80);
    const [compost, setCompost] = useState(20);
    const [trash, setTrash] = useState(10);
    const { t, i18n } = useTranslation();



    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('home.track_impact')}</Text>
            <View style={styles.progressBarContainer}>
                <AnimatedCircularProgress
                    size={90} // Diameter of the circular progress
                    width={6} // Thickness of the circular progress bar
                    fill={recycle} // Percentage to fill (0 to 100)
                    tintColor="#3498db" // Color of the progress bar
                    backgroundColor="#e0e0e0" // Color of the remaining part
                    rotation={0} // Start angle (default: 0)
                    lineCap="round"
                    duration={1500} // Shape of the line ends ('butt', 'round', or 'square')
                >
                    {() => (
                        <View style={styles.textContainer}>
                            <Text style={styles.percentageText}>{`${recycle}%`}</Text>
                            <Text style={styles.labelText}>Recycled</Text>
                        </View>
                    )}
                </AnimatedCircularProgress>
                <AnimatedCircularProgress
                    size={90} // Diameter of the circular progress
                    width={6} // Thickness of the circular progress bar
                    fill={compost} // Percentage to fill (0 to 100)
                    tintColor="#3498db" // Color of the progress bar
                    backgroundColor="#e0e0e0" // Color of the remaining part
                    rotation={0} // Start angle (default: 0)
                    lineCap="round"
                    duration={1500} // Shape of the line ends ('butt', 'round', or 'square')
                >
                    {() => (
                        <View style={styles.textContainer}>
                            <Text style={styles.percentageText}>{`${compost}%`}</Text>
                            <Text style={styles.labelText}>Compost</Text>
                        </View>
                    )}
                </AnimatedCircularProgress>
                <AnimatedCircularProgress
                    size={90} // Diameter of the circular progress
                    width={6} // Thickness of the circular progress bar
                    fill={trash} // Percentage to fill (0 to 100)
                    tintColor="#800000" // Color of the progress bar
                    backgroundColor="#e0e0e0" // Color of the remaining part
                    rotation={0} // Start angle (default: 0)
                    lineCap="round"
                    duration={1500} // Shape of the line ends ('butt', 'round', or 'square')
                >
                    {() => (
                        <View style={styles.textContainer}>
                            <Text style={styles.percentageText}>{`${trash}%`}</Text>
                            <Text style={styles.labelText}>Trash</Text>
                        </View>
                    )}
                </AnimatedCircularProgress>
            </View>

        </View>
    );
};

export default TrackImpact;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        elevation: 3,
    },
    title: {
        fontSize: 23,
        fontWeight: '700',
        textAlign: 'center'
    },
    progressBarContainer: {
        flexDirection: 'row',
        marginTop: 30,
        gap: 10
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentageText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3498db',
    },
    labelText: {
        fontSize: 12,
        color: '#7f8c8d',
    },
});
