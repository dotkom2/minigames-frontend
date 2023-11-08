import {
  ActivityIndicator,
  Button,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import {
  gameUtility,
  appImages,
  fontFamily,
  perfectPixel,
  colors,
  width,
  height,
  apiUtility,
} from '../utilities/';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import AdmobInterstitial from '../components/AdmobInterstitial';
import DeviceInfo from 'react-native-device-info';
import { useIsFocused } from '@react-navigation/native';

import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

// __DEV__ ? TestIds.INTERSTITIAL : 

const adUnitId = Platform.OS == 'android' ? 'ca-app-pub-9569521326940318/2237847229' : 'ca-app-pub-9569521326940318/8765148003';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  // requestNonPersonalizedAdsOnly: true,
});

const HomePageScreen = ({ navigation }) => {
  const [loader, setLoader] = useState(false);

  const [isModelVisble, setIsModelVisible] = useState(false);
  const [name, setName] = useState('');
  const [token, setToken] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  const [response, setResponse] = useState('');
  const isfocused = useIsFocused();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      try {
        interstitial.show()
      } catch (e) {
        console.log("OK")
      }
      setLoader(false)
    });

    interstitial.load();

    return unsubscribe;
  }, []);


  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      setToken(uniqueId);
      console.log('unique id ===== ', uniqueId);
    });

    checkUserSaved();
  }, [isfocused]);

  const saveUserData = async () => {
    try {
      // Save user data (userName and token) in AsyncStorage
      const userData = JSON.stringify(response?.user);
      await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data to AsyncStorage: ', error);
    }
  };

  // console.log('response homepage ===== ', response)

  const checkUserSaved = async () => {
    try {
      // Retrieve user data from AsyncStorage
      const currentUserData = await AsyncStorage.getItem('currentUser');
      if (currentUserData) {
        const parsedata = JSON.parse(currentUserData)
        setCurrentUser(JSON.parse(parsedata));
      }
    } catch (error) {
      console.error(
        'Error reading user data from AsyncStorage: ',
        error.message,
      );
    }
  };

  // console.log("current user === ",currentUser )
  // console.log('response === ',response?.user)



  useEffect(() => {
    if (response?.message == 'You have signed In') {
      saveUserData();
      checkUserSaved();
      navigation.navigate('WebView', { currentUser: response?.user });
      setResponse('');
    } else if (response?.message == 'User registered successfully') {
      saveUserData();
      checkUserSaved();
      navigation.navigate('WebView', { currentUser: response?.user });
      setResponse('');
    }
  }, [isfocused, response]);

  const createUser = async () => {
    setLoader(true)
    await fetch(apiUtility.baseURL + 'user/createUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: name,
        token: token,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        setResponse(responseData);
        console.log({ responseData });
        setLoader(false);

        // console.log('respone -==============', responseData?.user);
      })
      .catch(e => {
        setLoader(false);

        console.log('ERROR =======', e);
      });
  };

  const saveName = () => {
    if (name != '') {
      createUser();
      // setName('')
      toggleModal();
    }
  };

  const toggleModal = () => {
    setIsModelVisible(!isModelVisble);
  };

  const handleStart = () => {
    if (currentUser) {
      console.log("CURRENT USER ===>", currentUser)
      navigation.navigate('WebView', { currentUser });
    } else {
      toggleModal();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* <AdmobInterstitial /> */}

      {loader && (
        <View
          style={{
            flex: 1,
            height: height,
            width: width,
            position: 'absolute',
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <ActivityIndicator size={32} color={colors.white} />
        </View>
      )}

      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.gameBackground}
      />
      <ImageBackground
        source={appImages.backgroundHome}
        resizeMode="contain"
        style={{ width: width, height: height }}>
        <View
          style={{
            alignSelf: 'center',
            marginHorizontal: perfectPixel(95),
            marginTop: perfectPixel(10),
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: perfectPixel(66),
              fontFamily: fontFamily.AppTextBold,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}>
            Play mini{' '}
            <Text style={{ fontSize: perfectPixel(86), color: colors.gameBlue }}>
              games
            </Text>{' '}
            and win prizes from{' '}
            <Text style={{ color: colors.gameYellow }}>AliExpress</Text>!
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleStart()}
          activeOpacity={1}
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: height * 0.28,
          }}>
          <Image
            source={appImages.startBtn}
            style={{
              height: perfectPixel(129),
              width: perfectPixel(509),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </ImageBackground>
      <Modal onBackdropPress={toggleModal} isVisible={isModelVisble}>
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: '#232B41',
            width: width * 0.8,
            height: height * 0.3,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: perfectPixel(30),
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: perfectPixel(58),
              fontFamily: fontFamily.AppTextBold,
              textTransform: 'uppercase',
              paddingBottom: perfectPixel(10),
            }}>
            Your Name
          </Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor={colors.lightgray}
            value={name}
            onChangeText={text => setName(text)}
            style={{
              marginTop: perfectPixel(30),
              marginBottom: perfectPixel(129),
              borderWidth: perfectPixel(1),
              width: perfectPixel(641),
              height: perfectPixel(177),
              textAlign: 'center',
              color: colors.white,
              backgroundColor: colors.gameBackground,
              fontSize: perfectPixel(58),
              fontFamily: fontFamily.AppText,
            }}
          />
          <TouchableOpacity onPress={saveName} activeOpacity={1}>
            <Image
              style={{
                height: perfectPixel(129),
                width: perfectPixel(509),
                resizeMode: 'contain',
              }}
              source={appImages.modelsendBtn}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomePageScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: colors.gameBackground },
});
