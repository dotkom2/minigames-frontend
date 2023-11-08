import React from 'react'
import { StyleSheet, View, Dimensions, Platform } from 'react-native'
import { colors, perfectPixel } from '../utilities';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// __DEV__ ? TestIds.BANNER : 

const adUnitId = Platform.OS == 'android' ? 'ca-app-pub-9569521326940318/8356533014' : 'ca-app-pub-9569521326940318/2557411425';

const width = Dimensions.get('window').width

const AdMob = (props) => {
    return (
        <View style={{ width: width, alignItems: 'center', justifyContent: 'center', paddingBottom: perfectPixel(10), paddingTop: perfectPixel(10), backgroundColor: colors.gameBackground }} >
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            {/* <Banner
                adSize={props.bannerSize ? props.bannerSize : 'banner'}
                adUnitID={true ? BANNER_TEST_ID : Platform.OS == 'android' ? 'ca-app-pub-9569521326940318/8356533014' : 'ca-app-pub-9569521326940318/2557411425'}
                onDidFailToReceiveAdWithError={(e) => console.log('new', e)}
                onAdLoaded={msg => console.log(msg)}
            /> */}
        </View>
    )
}

export default AdMob

const styles = StyleSheet.create({})