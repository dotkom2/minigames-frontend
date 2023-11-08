// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Dimensions,
//   ActivityIndicator,
//   StatusBar,
//   Platform,
// } from 'react-native';

// import {Interstitial} from 'react-native-ad-manager';

// import {INTERSTITIAL_AD_ID, INTERSTITIAL_TEST_ID} from './../constants/ENV';
// import {colors, height, width} from '../utilities';

// const AdmobInterstitial = () => {
//   const [loader, setLoader] = useState(true);

//   useEffect(() => {
//     getAd();

//     // return () => {
//     //   Interstitial.removeAllListeners();
//     // };
//   }, []);

//   const getAd = async () => {
//     await Interstitial.setAdUnitID(
//       true
//         ? INTERSTITIAL_TEST_ID
//         : Platform.OS == 'android'
//         ? 'ca-app-pub-9569521326940318/2237847229'
//         : 'ca-app-pub-9569521326940318/8765148003',
//     );

//     // Interstitial.addEventListener('adLoaded', () => {
//     //   console.log('Interstitial adLoaded');
//     //   showInterstitial()
//     // });
//     // Interstitial.addEventListener('adFailedToLoad', error =>
//     //   console.warn(error),
//     // );
//     // Interstitial.addEventListener('adOpened', () =>
//     //   console.log('Interstitial => adOpened'),
//     // );
//     // Interstitial.addEventListener('adClosed', () => {
//     //   console.log('Interstitial => adClosed');
//     //   setLoader(false);
//     //   return Interstitial.removeAllListeners("adLoaded");
//     // //   Interstitial.requestAd().catch(error => console.warn(error));
//     // });

//     // Interstitial.requestAd().catch(error => console.warn(error));

//     await Interstitial.requestAd()
//       .then(() => Interstitial.showAd())
//       .finally(() => {
//         setLoader(false);

//         Interstitial.removeAllListeners();
//         Interstitial.removeEventListener();
//         console.log("INT AD UN-LOADED ===========")

//       });
//   };

//   const showInterstitial = () => {
//     Interstitial.showAd().catch(error => console.warn(error));
//   };

//   return (
//     loader && (
//       <View
//         style={{
//           flex: 1,
//           height: height,
//           width: width,
//           position: 'absolute',
//           top: 0,
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 99,
//           backgroundColor: 'rgba(0,0,0,0.5)',
//         }}>
//         <StatusBar
//           backgroundColor={colors.gameBackground}
//           barStyle={'light-content'}
//         />
//         <ActivityIndicator size={32} color={colors.white} />
//       </View>
//     )
//   );
// };

// export default AdmobInterstitial;

// const styles = StyleSheet.create({});
