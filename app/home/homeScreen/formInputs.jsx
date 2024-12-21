import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
    Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import dayjs from 'dayjs';
import { BASE_URL } from "../../../utils/constants"
import { Link, router, useGlobalSearchParams, useRouter } from 'expo-router'
import axios from 'axios';
import { AuthContext } from '../../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormInputs = () => {
    const { userId } = useContext(AuthContext)
    const [radioValue, setRadioValue] = useState('option1');
    const [wasteType, setWasteType] = useState('');
    const [wasteAmount, setWasteAmount] = useState('');
    const [unit, setUnit] = useState('kg');
    const [modalVisible, setModalVisible] = useState(false);
    const [time, setTime] = useState("");
    const [show, setShow] = useState(false);
    const [rewardPoints, setRewardPoints] = useState(null)
    const { date } = useGlobalSearchParams()

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        const formattedTime = dayjs(currentDate).format('hh:mm A')
        setTime(formattedTime);
    };
    const handleWasteAmountChange = (value) => {
        // Ensure only numeric values are entered
        const numericValue = value.replace(/[^0-9.]/g, '');
        setWasteAmount(numericValue);
    };
    const handleSubmit = async () => {
        const data = {
            userId: userId,
            wasteType: wasteType,
            time: time,
            date: date,
            points: 20,
            rulesFollow: radioValue
        }
        // Alert.alert(`you are rewarded with 200 points`)
        const response = await axios.post(`${BASE_URL}/addTask`, data)
        if (response.status == 200) {
            await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
            setRewardPoints(response.data.user.points)
            setModalVisible(true)
            console.log(response.data.user)

        } else {
            Alert.alert("Failed to add task! Try again.")
        }


    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={80}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Select Input */}
                    <Text style={styles.label}>When you use the bin </Text>
                    <View style={styles.selectContainer}>
                        <TouchableOpacity
                            onPress={() => setShow(true)}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16 }}>{time ? time : "Select time..."}</Text>
                            <MaterialCommunityIcons name="clock-plus" size={24} color="#6A0DAD" />
                        </TouchableOpacity>

                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                mode="time"
                                is24Hour={false}
                                onChange={onChange}

                            />
                        )}
                    </View>

                    {/* Waste Type */}
                    <Text style={styles.label}>Waste Type:</Text>
                    <View style={styles.selectContainer}>
                        <Picker
                            selectedValue={wasteType}
                            style={styles.selectInput}
                            onValueChange={(itemValue) => setWasteType(itemValue)}
                        >
                            <Picker.Item label="Select..." value="" />
                            <Picker.Item label="Biodegradable waste" value="biodegradable" />
                            <Picker.Item label="Non-Biodegradable wastee" value="non-biodegradable" />
                            <Picker.Item label="Solid Waste" value="solid-waste" />
                            <Picker.Item label="Organic Waste" value="organic-waste" />
                        </Picker>
                    </View>

                    {/* Number Input */}
                    {/* <Text style={styles.label}>Enter Waste amount:</Text>
                    <TextInput
                        style={styles.numberInput}
                        keyboardType="numeric"
                        value={wasteAmount}
                        onChangeText={setWasteAmount}
                        placeholder="Enter amount"
                    /> */}
                    <View style={styles.inlineContainer}>
                        <Text style={styles.label}>
                            Enter Waste Amount: {wasteAmount || '0'} {unit}
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.wasteInput}
                            keyboardType="numeric"
                            value={wasteAmount}
                            onChangeText={handleWasteAmountChange}
                            placeholder="Enter amount"
                        />
                        <Picker
                            selectedValue={unit}
                            style={styles.picker}
                            onValueChange={(itemValue) => setUnit(itemValue)}
                        >
                            <Picker.Item label="kg" value="kg" />
                            <Picker.Item label="gm" value="gm" />
                        </Picker>
                    </View>

                    {/* Radio Input */}
                    <Text style={styles.label}>Did you follow the waste management rules?</Text>
                    <View style={styles.radioGroup}>
                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => setRadioValue(true)}
                        >
                            <View
                                style={[
                                    styles.radioCircle,
                                    radioValue === true && styles.radioSelected,
                                ]}
                            />
                            <Text style={styles.radioLabel}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => setRadioValue(false)}
                        >
                            <View
                                style={[
                                    styles.radioCircle,
                                    radioValue === false && styles.radioSelected,
                                ]}
                            />
                            <Text style={styles.radioLabel}>No</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: "#6A0DAD", paddingRight: 10, paddingLeft: 15, paddingVertical: 10, borderRadius: 10, marginTop: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: "flex-end" }}>
                                <Text style={{ fontSize: 20, fontWeight: 500, color: "#fff" }}>submit</Text>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="slide" // or 'fade', 'none'
                        transparent={true} // Makes the modal background transparent
                        visible={modalVisible}
                        onRequestClose={() => {
                            // Handles back button behavior on Android
                            setModalVisible(false);
                            router.replace('home/homePage')
                        }}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Excellent !!!</Text>
                                <Text style={styles.modalContent}>
                                    You earn <Text style={{ fontsize: 20, fontWeight: 'bold' }}>20</Text> Points.
                                </Text>

                                {/* Button to Close Modal */}
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => {
                                        setModalVisible(false)
                                        router.replace(`home/rewards?rewardPoints=${rewardPoints}`)
                                    }}
                                >
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 150
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#777',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        backgroundColor: '#007BFF',
    },
    radioLabel: {
        fontSize: 16,
    },
    selectContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    selectInput: {
        height: 50,
        width: '100%',
    },
    numberInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        height: 50,
        marginBottom: 15
    },
    inlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    wasteInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        flex: 1,
        marginRight: 10,
    },
    picker: {
        width: 120,
        height: 50,
    },
    openButton: {
        backgroundColor: '#6A0DAD',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
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

export default FormInputs;
