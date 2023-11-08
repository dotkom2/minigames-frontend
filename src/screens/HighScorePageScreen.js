import { ActivityIndicator, FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import {
  gameUtility,
  appImages,
  fontFamily,
  perfectPixel,
  colors,
  height,
  apiUtility,
} from "../utilities/";
import AdMob from "../components/AdMob";

const HighScorePageScreen = ({ navigation, route }) => {
  // console.log('first =====',route?.params?.game_round)
  const [highScoreData, setHighScoreData] = useState([]);

  const [isloading, setIsLoading] = useState(false);

  const fetchHighScrore = async () => {
    const gameObj = JSON.parse(route?.params?.currentGame);

    // console.log('GAME DATA ===>', gameObj);

    await fetch(apiUtility.baseURL + 'score/findScoresByGameId/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ game_id: gameObj.toString(), game_round : route?.params?.game_round }),
    })
      .then(response => response.json())
      .then(responseData => {
        setHighScoreData(responseData?.data?.sort((a, b) => b?.score - a?.score));
      })
      .catch(e => {
        console.log('ERROR =======', e);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);

    fetchHighScrore();
  }, []);



  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={colors.gameBackground}
      />
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()} style={styles.backBtn} >

        <Image
          style={{
            height: '100%',
            width: '100%'
          }}
          source={appImages.backBtn}
        />
      </TouchableOpacity>

      <Text
        style={styles.heading} >
        GAME HIGH SCORE
      </Text>
      <View style={{ height: Platform.OS == 'android' ? height * 0.69 : height * 0.65 }} >

        {isloading ?
          <ActivityIndicator color={colors.white} />
          :
          <FlatList
            data={highScoreData}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.listcontainer} key={index}>
                  <Text style={styles.listtext}>{index + 1}.</Text>
                  <Text style={[styles.listtext, { textAlign: 'left' }]}>{item.userName}</Text>
                  <Text style={[styles.listtext, { textAlign: 'right', flex: 0.5 }]}>{item.score} </Text>
                </View>
              )
            }}
          />}

      </View>

      <AdMob />
    </SafeAreaView>
  );
};

export default HighScorePageScreen;

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
    marginBottom: perfectPixel(10)
  },
  heading: {
    color: colors.white,
    fontSize: perfectPixel(82),
    fontFamily: fontFamily.AppTextBold,
    textAlign: 'center',
    marginBottom: perfectPixel(104)
  },
  listcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: perfectPixel(10),
    marginHorizontal: perfectPixel(74)
  },
  listtext: {
    color: colors.white,
    fontFamily: fontFamily.AppTextBold,
    fontSize: perfectPixel(56),
    flex: 1,
  }
});
