import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Alert, Modal } from 'react-native';
import { BASE_URL } from '../../utils/constants';
import { AuthContext } from '../../context/authContext';

const RewardScreen = () => {
  const { rewardPoints } = useGlobalSearchParams()
  const [points, setpoints] = useState(rewardPoints?rewardPoints:0)
  const [modalVisible, setModalVisible] = useState(false);
  const [Allgifts, setGifts] = useState([{ name: 'watch', url: require('../../assets/images/watch.jpg') }, { name: 'headphone', url: require('../../assets/images/headphone.jpg') }, { name: 'iphone', url: require('../../assets/images/iphone.jpg') }])
  const [gift, setGift] = useState(null)
  const router = useRouter()
  const{userId}=useContext(AuthContext)
  const [user,setUser]=useState(null)
 
//console.log(rewardPoints)
  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem('user')
      const user = JSON.parse(userData)
      if (user) {
        setpoints(user.points);
        setUser(user) // Convert string back to object
      }

    }
    console.log("reward page")
    getUser()
  }, [rewardPoints])


  const handleEarnGift = async() => {
    // console.log('Button Pressed!');
    if (points<500) {
      Alert.alert("you need at least 500 points to earn a gift")
    } else {
      const numbers = [0, 1,2]; // Define the set
      const randomIndex = Math.floor(Math.random() * numbers.length); // Get a random index
      let selectedNumber = numbers[randomIndex];
      //console.log(selectedNumber)
      setGift(Allgifts[selectedNumber])
      const data={userId:userId}
      const response = await axios.post(`${BASE_URL}/earn-gift`,data)
      if(response.status==200){
        const newPoints = user.points-200
        
       await AsyncStorage.setItem('user',JSON.stringify({...user,points:newPoints}))
       setModalVisible(true)
       setpoints(points-200)
      }
      
    }

  };

  return (
    <ImageBackground
      source={require('../../assets/images/reawrdBg.jpg')} // Replace with your background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Your Reward Points</Text>
        <View style={styles.rewardContainer}>
          <Image
            source={require('../../assets/images/star.png')}
            style={styles.star}
          />
          <Text style={styles.rewardPoints}>{points}</Text>
          <Text style={styles.rewardLabel}>Points</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleEarnGift}>
          <Text style={styles.buttonText}>EARN A GIFT</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade" // or 'fade', 'none'
        transparent={true} // Makes the modal background transparent
        visible={modalVisible}
        onRequestClose={() => {
          // Handles back button behavior on Android
          setModalVisible(false);
          router.replace('home/homeCalendar')
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Congrats !!!</Text>
            <Text style={styles.modalContent}>
              You won a <Text style={{ fontsize: 20, fontWeight: 'bold' }}>{gift?.name}</Text>
            </Text>
            {gift && <Image
              source={gift.url}
              style={styles.gift}
              resizeMode='cover'
            />}

            {/* Button to Close Modal */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false)

              }}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  rewardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 40,
  },
  rewardPoints: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFA500', // A golden color for the points
  },
  rewardLabel: {
    fontSize: 18,
    color: '#333',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#FF6347', // Tomato color for the button
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  star: {
    width: 50,
    height: 50,
  },
  gift:{
    height:120,
    width:150,
    borderRadius:10,
    marginBottom:10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});

export default RewardScreen;
