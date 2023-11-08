import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId ='ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
});

export default function Test() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    // interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

    <Button
      title="Show Interstitial"
      onPress={() => {
        try {
          interstitial.show()
        } catch (e) {
          console.log("OK")
        }
        }}
        />
        <Button
      title="Show load"
      onPress={() => {
          interstitial.load();
        }}
        />
        </View>
  );
}









// import { Button, Platform, StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// // import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
// import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';


// const Test = () => {

//     const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
    
//     const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
//       requestNonPersonalizedAdsOnly: true,
//       keywords: ['fashion', 'clothing'],
//     });
    

//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
//             <Button onPress={() => { }} title='click me' />
//         </View>
//     )
// }

// export default Test

// const styles = StyleSheet.create({})