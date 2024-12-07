import React, { useState } from 'react';
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

import { Link,router, useGlobalSearchParams, useRouter } from 'expo-router'

const FormInputs = () => {
    const [radioValue, setRadioValue] = useState('option1');
    const [wasteType, setWasteType] = useState('');
    const [wasteAmount, setWasteAmount] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [time, setTime] = useState("");
    const [show, setShow] = useState(false);
    const { date } = useGlobalSearchParams()

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        const formattedTime = dayjs(currentDate).format('hh:mm A')
        setTime(formattedTime);
    };
    const handleSubmit = () => {
        // Alert.alert(`you are rewarded with 200 points`)
        setModalVisible(true)

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
                            <Picker.Item label="Green for organic waste" value="green" />
                            <Picker.Item label="Red for biomedical waste" value="red" />
                            <Picker.Item label="Blue for dry recyclables" value="blue" />
                        </Picker>
                    </View>

                    {/* Number Input */}
                    <Text style={styles.label}>Enter Waste amount:</Text>
                    <TextInput
                        style={styles.numberInput}
                        keyboardType="numeric"
                        value={wasteAmount}
                        onChangeText={setWasteAmount}
                        placeholder="Enter amount"
                    />

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
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: "#6A0DAD", paddingRight: 10, paddingLeft: 15, paddingVertical: 5, borderRadius: 10, marginTop: 15 }}>
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
                            router.replace('home/homeCalendar')
                        }}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Excellent !!!</Text>
                                <Text style={styles.modalContent}>
                                    You are rewarded with <Text style={{fontsize:20,fontWeight:'bold'}}>200</Text> Points.
                                </Text>

                                {/* Button to Close Modal */}
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => {
                                        setModalVisible(false)
                                        router.replace('home/rewards')
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
