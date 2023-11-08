import { Button, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { apiUtility, appImages, colors, perfectPixel } from '../utilities'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddDetails = ({ navigation, route }) => {
    const fields = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'phoneNumber', label: 'Mobile' },
        { key: 'email', label: 'Email' },
        { key: 'country', label: 'Country' },
        { key: 'address', label: 'Address' },
        { key: 'city', label: 'City' },
        { key: 'state', label: 'State' },
        { key: 'zipcode', label: 'Zip Code' },
    ];
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        country: "",
        address: "",
        city: "",
        state: "",
        zipcode: ""
    });

    function isFormDataEmpty(formData) {
        for (const key in formData) {
            if (formData[key].trim() !== '') {
                return false;
            }
        }
        return true;
    }
    const isEmpty = isFormDataEmpty(formData);


    const UpdateData = async () => {
        fetch(apiUtility.baseURL + "user/updateUser/" + route?.params?.userName, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)

        })
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('respone -==============', JSON.stringify(responseData));
            });
    }

    const handleInputChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleSubmit = () => {
        if (!isEmpty) {
            UpdateData()
            console.log('Form data:', formData);
            saveUserData()
            navigation.goBack()
        }
    };

    const saveUserData = async () => {
        try {
          const userDetail = JSON.stringify(formData);
          await AsyncStorage.setItem('userDetails', JSON.stringify(userDetail));
        } catch (error) {
          console.error('Error saving user data to AsyncStorage: ', error);
        }
      };
    
    
      const checkUserSaved = async () => {
        try {
          const currentUserData = await AsyncStorage.getItem('userDetails');
          if (currentUserData) {
            const formdataparsed = JSON.parse(currentUserData)
            setFormData(JSON.parse(formdataparsed));
          }
        } catch (error) {
          console.error(
            'Error reading user data from AsyncStorage: ',
            error.message,
          );
        }
      };

      useEffect(()=>{
        checkUserSaved()
      },[])



    return (
        <SafeAreaView style={styles.mainContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1} style={styles.backBtn}>
                <Image
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                    source={appImages.backBtn}
                />
            </TouchableOpacity>
            <Text style={styles.heading}>
                ADD YOUR DETAILS AND COLLECT YOUR PRIZE
            </Text>
            <KeyboardAvoidingView
                style={{ flex: 0.85 }}
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={0}
            >
                <ScrollView>
                    <View style={{ marginTop: perfectPixel(110) }}>
                        {fields.map((field) => (
                            <View style={styles.inputRow} key={field.key}>
                                <Text style={styles.label}>{field.label}</Text>
                                <TextInput
                                    keyboardType={field.key == 'phoneNumber' || field.key == 'zipcode' ? 'decimal-pad' : null}
                                    placeholderTextColor={colors.lightgray}
                                    placeholder={field.label}
                                    onChangeText={(text) => handleInputChange(field.key, text)}
                                    value={formData[field.key]}
                                    style={styles.input}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={()=>{handleSubmit()}} style={styles.savebtn}>
                <Image style={{ width: '100%', height: '100%' }} source={appImages.savebtn} />
            </TouchableOpacity>
        </SafeAreaView>

    )
}

export default AddDetails

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.gameBackground
    },
    backBtn: {
        height: perfectPixel(101),
        width: perfectPixel(158),
        resizeMode: 'contain',
        marginLeft: perfectPixel(97),
        marginTop: perfectPixel(97),
        marginBottom: perfectPixel(86)
    },
    heading: {
        color: colors.white,
        fontSize: perfectPixel(54),
        fontFamily: 'InterBold',
        textAlign: 'center',
        marginBottom: perfectPixel(23),
        paddingHorizontal: perfectPixel(50)
    },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: perfectPixel(30),
        marginHorizontal: perfectPixel(45)
    },
    label: {
        fontSize: perfectPixel(46),
        color: colors.white,
        width: perfectPixel(300),
        textTransform: 'uppercase',
        fontFamily: 'InterBold'
    },
    input: {
        flex: 1,
        fontFamily: 'Inter',
        color: colors.white,
        height: perfectPixel(125),
        padding: perfectPixel(30),
        backgroundColor: '#232B41'
    },
    savebtn: {
        alignSelf: 'center',
        marginTop: perfectPixel(100),
        width: perfectPixel(509),
        height: perfectPixel(129),


    }
})