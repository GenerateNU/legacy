import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = (size) => {
  return (width / guidelineBaseWidth) * size;
};
export const verticalScale = (size) => {
  return (height / guidelineBaseHeight) * size;
};
export const moderateScale = (size, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};
