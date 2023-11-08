// IMAGES (PNG/JPG etc)
import { Dimensions, Platform } from "react-native";
const IMAGE_DIR = "../assets/images/";

const appImages = {
  backgroundHome: require(IMAGE_DIR + "bg_home_prizes.png"),
  buttonArrow: require(IMAGE_DIR + "button_arrow.png"),
  buttonExit: require(IMAGE_DIR + "button_exit.png"),

  iconCrownSmall: require(IMAGE_DIR + "icon_crown_small.png"),
  iconCrownBig: require(IMAGE_DIR + "icon_crown.png"),
  startBtn: require(IMAGE_DIR + "StartBtn.png"),
  modelsendBtn: require(IMAGE_DIR + "modelsendBtn.png"),
  backBtn: require(IMAGE_DIR + "backBtn.png"),
  crownBtn: require(IMAGE_DIR + "crownbtn.png"),
  savebtn: require(IMAGE_DIR + "savebtn.png"),
  champbtn: require(IMAGE_DIR + "champ.png"),
};

// FONT FAMILY

const fontFamily = {

  AppText: 'Inter',
  AppTextBold: 'Inter-Bold',
  AppTextTime: 'InriaSans-Bold'

};

const colors = {
  gameYellow: "#F8EF16",
  gameBlue: "#00B9F4",
  gameGreen: "#1CC574",
  gameRed: "#F00",
  gameBackground: "#0B0F1A",

  // Basic colors
  red: "#FF0000",
  green: "#09B01A",

  black: "#000000",
  darkgray: "#1D1E18",
  lightgray: "#8E94A1",
  offwhite: "#FCFCFCFC",
  white: "#FFFFFF",
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const fontSizeMultiplier = (height + width) / 10;

const responsiveFontSize = e => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  return ((height + width) / 100) * e;
};
const perfectPixel = fontSize => {
  let px_1 = responsiveFontSize(0.8) / 30;
  return px_1 * fontSize;
};

const apiUtility = {
  // baseURL: "https://bf1a-206-84-191-95.ngrok-free.app/", // local
  baseURL: "https://minigamesapi.sprintt.io/", // livee

};

const gameUtility = {
  // baseURL: 'https://a2ed-206-84-191-95.ngrok-free.app/', // local
  baseURL: 'https://minigames.sprintt.io/' // live
};

export {
  appImages,
  fontFamily,
  colors,
  apiUtility,
  gameUtility,
  width,
  height,
  fontSizeMultiplier,
  perfectPixel,
  responsiveFontSize,
};
