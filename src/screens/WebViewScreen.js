import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import WebView from 'react-native-webview';
import moment from 'moment';

import {
  gameUtility,
  appImages,
  fontFamily,
  perfectPixel,
  colors,
  apiUtility,
  width,
  height,
} from '../utilities/';
import AdMob from '../components/AdMob';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { useIsFocused } from '@react-navigation/native';

const adUnitId = Platform.OS == 'android' ? 'ca-app-pub-9569521326940318/2237847229' : 'ca-app-pub-9569521326940318/8765148003';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  // requestNonPersonalizedAdsOnly: true,
});

const WebViewScreen = ({ navigation, route }) => {
  // console.log('route ===',JSON.parse(route?.params))
  const webViewRef = useRef(null);

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [gameId, setGameId] = useState(0);

  const [showAd, setShowAd] = useState(false);
  const [viewPrizes, setViewPrizes] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);
  const [disableButton, setDisableButton] = useState(true);


  const [currentUser, setCurrentUser] = useState(route?.params);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      // interstitial.show()
      // setLoader(false)
    });

    interstitial.load();

    return unsubscribe;
  }, []);


  // console.log('time === ',data?.[0]?.game_round)


  // Count down timer
  const calculateRemainingTime = () => {
    const targetDate = moment(
      data[data.find(item => item.game_id == gameId)?.game_id - 1]
        ?.datetime_end,
    );
    const currentDate = moment();
    const duration = moment.duration(targetDate.diff(currentDate));
    if (duration.asMilliseconds() <= 0) {
      return {
        Hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
    const Hours = (days * 24 + hours).toString().padStart(2, '0');
    return {
      Hours,
      minutes,
      seconds,
    };
  };
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    setRemainingTime(calculateRemainingTime());
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [data[data.find(item => item.game_id == gameId)?.game_id - 1]
    ?.datetime_end]);

  const { Hours, minutes, seconds } = remainingTime;

  // console.log('route ==== ',route?.params?.gameToStart)

  // Checks response/data from WebView to ReactNative
  const manageGameSelection = gid => {
    // console.log('netive ===',gid.split('nextgame:')[1])
    // for level selection
    let id;
    if (gid[0] == 'n') {
      id = gid.split('nextgame:')[1];
    } else if (gid[0] == 'p') {
      id = gid.split('prevgame:')[1];
    }

    if (gid[0] == 'n' || gid[0] == 'p') {
      setShowNavBar(true);
      setViewPrizes(true);
      setDisableButton(false);
      setShowAd(false);
      interstitial.load()

      setGameId(parseInt(id) + 1);
      console.log(gid, id);

      console.log(
        data[data.find(item => item.game_id == id + 1)?.game_id]?.game_name,
      );
    }

    // When game finishes (score)
    if (gid[0] == 's') {
      setViewPrizes(false);
      setShowNavBar(true);
      setShowAd(true);
      try {
        interstitial.show()
      } catch (e) {
        console.log("OK")
      }
      console.log(gid);
      addScore(gid.split('score:')[1])
    }

    // When we enter game
    if (gid[0] == 'g') {
      console.log(gid);
      setShowNavBar(false);
      setViewPrizes(false);
      setShowAd(false);
    }

    // When we retry game
    if (gid[0] == 'r') {
      console.log(gid);
      setShowNavBar(false);
      interstitial.load()
      setViewPrizes(false);
      setShowAd(false);
    }
  };

  const addScore = async (score) => {
    // console.log("USER OBJ SCORE ===>", route?.params?.currentUser)

    const userObj = route?.params?.currentUser;
    const userData = {
      userName: userObj.userName,
      game_id: data[data.find(item => item.game_id == gameId)?.game_id - 1]
        ?.game_id,
      score: score,
      game_round : data?.[0]?.game_round
    }

    await fetch(apiUtility.baseURL + 'score/createScore', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log({ responseData });
        // console.log('respone -==============', JSON.stringify(responseData));
      })
      .catch(e => {
        console.log('ERROR =======', e);
      });
  };



  // Fetches all games data from Web API
  useEffect(() => {
    console.log("GAME TO START ===>", route?.params?.gameToStart)


    if (route?.params?.gameToStart) {
      webViewRef?.current?.postMessage(route.params.gameToStart)
    }

    fetch(apiUtility.baseURL + 'game/findAllGames')
      .then(resp => resp.json())
      .then(json => {
        setData(json);
        console.log('GAMES DATA ===>', 'r');
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // Open AliExpress Link in browser on Image press
  const handleLinkPress = url => {
    Linking.openURL(url).catch(err =>
      console.error('Error opening URL: ', err),
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.gameBackground}
      />

      {/* Full Screen AD */}
      {/* {showAd ? <AdmobInterstitial /> : null} */}

      {/* Top Bar - Buttons */}
      {showNavBar ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          {/* <Text style={{ color: colors.white, fontSize: 32 }}>{gameId.toString()}</Text> */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('HomePage')}>
            <Image
              source={appImages.backBtn}
              style={{ width: perfectPixel(158), height: perfectPixel(101) }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            disabled={disableButton}
            onPress={() => navigation.navigate('HighScorePage', { currentGame: data[data.find(item => item.game_id == gameId)?.game_id - 1]?.game_id,game_round: data?.[0]?.game_round })}>
            <Image
              source={appImages.champbtn}
              style={{ width: perfectPixel(509), height: perfectPixel(129) }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            disabled={disableButton}
            onPress={() => navigation.navigate('YourGameScore', { currentUser: route?.params?.currentUser ,game_round: data?.[0]?.game_round })}>
            <Image
              source={appImages.crownBtn}
              style={{ width: perfectPixel(158), height: perfectPixel(101) }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: perfectPixel(509),
            height: perfectPixel(129),
            backgroundColor: colors.gameBackground,
          }}></View>
      )}

      {/* Game Details */}
      {viewPrizes ? (
        <View style={styles.layer}>
          <View
            style={{
              alignSelf: 'flex-start',
              // marginTop: perfectPixel(70),
            }}>
            <Text style={styles.layerheading}>THE PRIZE</Text>
            <Text
              style={{
                color: colors.lightgray,
                fontSize: perfectPixel(46),
                fontFamily: 'Inter',
                maxWidth: perfectPixel(550),
              }}>
              {
                data[data.find(item => item.game_id == gameId)?.game_id - 1]
                  ?.prize_name
              }
            </Text>
            <Text
              style={[
                styles.layerheading,
                { fontSize: perfectPixel(45), marginTop: perfectPixel(30) },
              ]}>
              END GAME
            </Text>
            <Text
              style={{
                color: colors.lightgray,
                fontSize: perfectPixel(82),
                fontFamily: fontFamily.AppTextTime,
                marginTop: perfectPixel(-10),
              }}>
              {Hours}:{minutes}:{seconds}
            </Text>
          </View>

          {Platform.OS === "android" && <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              handleLinkPress(
                data[data.find(item => item.game_id == gameId)?.game_id - 1]
                  ?.prize_url,
              )
            }>
            <Image
              source={{
                uri: data[
                  data.find(item => item.game_id == gameId)?.game_id - 1
                ]?.prize_image,
              }}
              style={{
                borderRadius: perfectPixel(10),
                width: perfectPixel(429),
                height: perfectPixel(358),
              }}
            />
          </TouchableOpacity> }
        </View>
      ) : null}

      <WebView
        source={{ uri: gameUtility.baseURL }}
        style={{ flex: 1, backgroundColor: colors.gameBackground }}
        onMessage={event => {
          manageGameSelection(event.nativeEvent.data);
        }}
        javaScriptEnabled
        ref={webViewRef}
      />
      {/* <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    /> */}

      <AdMob />
    </SafeAreaView>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.gameBackground,
    paddingTop: perfectPixel(20),
  },

  layer: {
    position: 'absolute',
    // top: perfectPixel(135),
    top: Platform.OS == 'android' ? '13.5%' : '20.5%',
    // marginLeft: perfectPixel(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1000,
    alignSelf: 'center',
    // backgroundColor: colors.gameBackground,
    // alignItems: 'center',
    width: width * 0.8,
    height: height * 0.2,
  },
  layerheading: {
    color: colors.white,
    fontSize: perfectPixel(56),
    fontFamily: fontFamily.AppTextBold,
  },
});
