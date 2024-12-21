import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircularProgressExample = () => {
  const [fill, setFill] = useState(90);

  const increaseProgress = () => {
    setFill((prevFill) => (prevFill + 25 > 100 ? 0 : prevFill + 25)); // Increment by 25%, reset at 100%
  };

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={90} // Diameter of the circular progress
        width={10} // Thickness of the circular progress bar
        fill={fill} // Percentage to fill (0 to 100)
        tintColor="#3498db" // Color of the progress bar
        backgroundColor="#e0e0e0" // Color of the remaining part
        rotation={0} // Start angle (default: 0)
        lineCap="round"
        duration={1500} // Shape of the line ends ('butt', 'round', or 'square')
      >
        {() => (
          <View style={styles.textContainer}>
            <Text style={styles.percentageText}>{`${fill}%`}</Text>
            <Text style={styles.labelText}>Progress</Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <Button title="Increase Progress" onPress={increaseProgress} />
    </View>
  );
};

export default CircularProgressExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },
  labelText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});
