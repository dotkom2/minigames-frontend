import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import { Banner } from 'react-native-ad-manager';
import { BANNER_AD_ID, BANNER_TEST_ID } from './../constants/ENV';

const width = Dimensions.get('window').width

const AdMob = (props) => {
    return (
        <View style={{ width: width, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }} >
            <Banner
                adSize={props.bannerSize ? props.bannerSize : 'banner'}
                adUnitID={BANNER_TEST_ID}
                onDidFailToReceiveAdWithError={(e) => console.log('new', e)}
                onAdLoaded={msg => console.log(msg)}
            />
        </View>
    )
}

export default AdMob

const styles = StyleSheet.create({})