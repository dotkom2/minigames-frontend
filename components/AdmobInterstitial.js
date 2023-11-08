import React, { useEffect } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import { Interstitial } from "react-native-ad-manager";

import { INTERSTITIAL_AD_ID, INTERSTITIAL_TEST_ID } from './../constants/ENV';

const AdmobInterstitial = () => {

    useEffect(() => {
        getAd()
    }, []);

    const getAd = async () => {
        await Interstitial.setAdUnitID(INTERSTITIAL_TEST_ID);
        await Interstitial.requestAd().then(() => Interstitial.showAd());
    }

    return (
        <>
        </>
    )

}

export default AdmobInterstitial

const styles = StyleSheet.create({})
