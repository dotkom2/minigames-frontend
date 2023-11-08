import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  apiUtility,
  appImages,
  colors,
  fontFamily,
  height,
  perfectPixel,
} from '../utilities';
import AdMob from '../components/AdMob';

const YourGameScore = ({navigation, route}) => {
  // console.log('route high score ==== ',route?.params)
  const [highScoreData, setHighScoreData] = useState([]);

  const [isloading, setIsLoading] = useState(false);

  const fetchHighScrore = async () => {
    const userObj = route?.params?.currentUser;
    // const name = JSON.parse(userObj)?.userName

    console.log('USER DATA ===>', userObj);

    await fetch(apiUtility.baseURL + 'score/findScores/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userName: userObj?.userName, game_round : route?.params?.game_round}),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('RESPONSE ===>', responseData);

        // setHighScoreData(responseData);
        // Group scores and find the highest score
        const groupedScores = responseData.reduce((result, item) => {
          const gameId = item.game.game_id;
          const score = parseInt(item.score.score);

          if (!result[gameId] || score > result[gameId].score) {
            result[gameId] = {
              game: item.game,
              score: score,
              isWinner: item?.isWinner
            };
          }

          return result;
        }, {});

        const highestScores = Object.values(groupedScores);

        console.log('Highest Scores ===>', highestScores);

        setHighScoreData(highestScores);
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

  const handleStart = item => {
    if (item?.game?.game_id) {
      navigation.replace('WebView', {
        gameToStart: item?.game?.game_id,
        currentUser: route?.params?.currentUser,
      });
    }
  };

  console.log('DATA ======', highScoreData);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.goBack()}
        style={styles.backBtn}>
        <Image
          style={{
            height: '100%',
            width: '100%',
          }}
          source={appImages.backBtn}
        />
      </TouchableOpacity>
      <Text style={styles.heading}>YOUR GAME SCORES</Text>
      <View style={[styles.subheadings, {marginBottom: perfectPixel(153)}]}>
        <Text style={styles.listtext}>game name</Text>
        <Text style={styles.listtext}>score number</Text>
        <Text style={styles.listtext}>winning</Text>
      </View>
      <View
        style={{
          height: Platform.OS == 'android' ? height * 0.65 : height * 0.61,
        }}>
        {isloading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <FlatList
            data={highScoreData.sort((a,b)=>b.score - a.score)}
            // keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.subheadings,
                    {marginBottom: perfectPixel(124)},
                  ]}>
                  <Text style={styles.listtext}>{item?.game?.game_name}</Text>
                  <Text style={styles.listtext}>{item?.score}</Text>
                  <View style={styles.listtext}>
                    {
                      item?.isWinner ? (
                        <TouchableOpacity
                          onPress={() => navigation.navigate('AddDetails')}
                          activeOpacity={1}>
                          <Image
                            style={styles.crownbtn}
                            source={appImages.crownBtn}
                          />
                        </TouchableOpacity>
                      ) : null
                      // (
                      //   <TouchableOpacity onPress={()=> handleStart(item)}>
                      //     <Text style={styles.listtext}>Start</Text>
                      //   </TouchableOpacity>
                      // )
                    }
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>

      <AdMob />
    </SafeAreaView>
  );
};

export default YourGameScore;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.gameBackground,
  },
  backBtn: {
    height: perfectPixel(101),
    width: perfectPixel(158),
    resizeMode: 'contain',
    marginLeft: perfectPixel(97),
    marginTop: perfectPixel(97),
    marginBottom: perfectPixel(86),
  },
  heading: {
    color: colors.white,
    fontSize: perfectPixel(66),
    fontFamily: fontFamily.AppTextBold,
    textAlign: 'center',
    marginBottom: perfectPixel(23),
  },
  subheadings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listtext: {
    color: colors.white,
    fontFamily: fontFamily.AppTextBold,
    fontSize: perfectPixel(36),
    textTransform: 'uppercase',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  crownbtn: {
    alignSelf: 'center',
    height: perfectPixel(101),
    width: perfectPixel(158),
  },
});
