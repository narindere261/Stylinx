import { Dimensions, PixelRatio, Platform, ScaledSize } from "react-native";

const { width, height }: ScaledSize = Dimensions.get("window");

const BASE_WIDTH: number = 375;
const BASE_HEIGHT: number = 812;

export const scale = (size: number): number => (width / BASE_WIDTH) * size;
export const verticalScale = (size: number): number => (height / BASE_HEIGHT) * size;
export const moderateScale = (size: number, factor: number = 0.5): number => 
  size + (scale(size) - size) * factor;

const scaleFactor: number = width / BASE_WIDTH;
const scaleFactorHeight: number = height / BASE_HEIGHT;
const averageScale: number = (scaleFactor + scaleFactorHeight) / 2;

const isSmallDevice: boolean = width < 350;
const isMediumDevice: boolean = width >= 350 && width < 400;
const isLargeDevice: boolean = width >= 400 && width < 768;
const isTablet: boolean = width >= 768;
const isLandscape: boolean = width > height;

export const responsiveFontSize = (size: number): number => {
  const scaledSize: number = size * scaleFactor;
  
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
  }
  
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize)) - 2;
};

export const responsiveHeight = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * scaleFactorHeight);
};

export const responsiveWidth = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size * scaleFactor);
};

export const responsivePixel = (size: number): number => {
  return PixelRatio.getPixelSizeForLayoutSize(size);
};

export const fontScale = (size: number, factor: number = 0.5): number => {
  const scaledSize: number = size * scaleFactor;
  
  if (isSmallDevice) {
    return scaledSize * 0.9;
  }
  
  if (isTablet) {
    return scaledSize * 1.2;
  }
  
  return size + (scaledSize - size) * factor;
};

export const lineHeightScale = (fontSize: number, multiplier: number = 1.2): number => {
  return fontSize * multiplier;
};

export const spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(48),
  xxxl: moderateScale(64),
};

export const fontSize = {
  h1: responsiveFontSize(32),
  h2: responsiveFontSize(28),
  h3: responsiveFontSize(24),
  h4: responsiveFontSize(20),
  h5: responsiveFontSize(18),
  h6: responsiveFontSize(16),
  bodyLarge: responsiveFontSize(18),
  body: responsiveFontSize(16),
  bodySmall: responsiveFontSize(14),
  caption: responsiveFontSize(12),
  tiny: responsiveFontSize(10),
};

export const lineHeight = {
  h1: lineHeightScale(fontSize.h1, 1.3),
  h2: lineHeightScale(fontSize.h2, 1.3),
  h3: lineHeightScale(fontSize.h3, 1.3),
  h4: lineHeightScale(fontSize.h4, 1.3),
  h5: lineHeightScale(fontSize.h5, 1.3),
  h6: lineHeightScale(fontSize.h6, 1.3),
  bodyLarge: lineHeightScale(fontSize.bodyLarge, 1.5),
  body: lineHeightScale(fontSize.body, 1.5),
  bodySmall: lineHeightScale(fontSize.bodySmall, 1.5),
  caption: lineHeightScale(fontSize.caption, 1.5),
  tiny: lineHeightScale(fontSize.tiny, 1.5),
};

export const layout = {
  window: {
    width,
    height,
  },
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  isTablet,
  isLandscape,
  screenWidth: width,
  screenHeight: height,
  screenAspectRatio: width / height,
};

export const device = {
  width,
  height,
  scale: PixelRatio.get(),
  fontScale: PixelRatio.getFontScale(),
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  isPad: Platform.OS === 'ios' && Platform.isPad,
};

export const getResponsiveValue = (
  value: number,
  options?: {
    small?: number;
    medium?: number;
    large?: number;
    tablet?: number;
    landscape?: number;
  }
): number => {
  if (isLandscape && options?.landscape !== undefined) {
    return options.landscape;
  }
  
  if (isTablet && options?.tablet !== undefined) {
    return options.tablet;
  }
  
  if (isLargeDevice && options?.large !== undefined) {
    return options.large;
  }
  
  if (isMediumDevice && options?.medium !== undefined) {
    return options.medium;
  }
  
  if (isSmallDevice && options?.small !== undefined) {
    return options.small;
  }
  
  return value;
};

export const getResponsiveFont = (
  baseSize: number,
  options?: {
    small?: number;
    medium?: number;
    large?: number;
    tablet?: number;
    landscape?: number;
  }
): number => {
  const size = getResponsiveValue(baseSize, options);
  return responsiveFontSize(size);
};

export const responsive = {
  scale,
  verticalScale,
  moderateScale,
  fontSize,
  lineHeight,
  spacing,
  layout,
  device,
  fontScale,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  getResponsiveValue,
  getResponsiveFont,
};