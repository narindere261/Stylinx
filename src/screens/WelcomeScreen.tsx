import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { responsive } from '../constants/responsive'; 

const WelcomeScreen = ({navigation}) => {
  const { isLandscape } = responsive.layout;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/welcome.png')} 
          style={[
            styles.logo,
            isLandscape && styles.logoLandscape
          ]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate("Login")} 
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          
          <Image 
            source={require('../assets/images/right-arrow.png')}
            style={styles.arrowIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    paddingVertical: responsive.getResponsiveValue(70, {
      small: 40,
      medium: 60,
      tablet: 100,
      landscape: 30,
    }),
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsive.getResponsiveValue(0, {
      tablet: responsive.spacing.xl,
    }),
  },
  logo: {
    width: responsive.getResponsiveValue('100%', {
      tablet: '90%',
    }),
    height: responsive.verticalScale(550),
    maxHeight: responsive.getResponsiveValue(550, {
      small: 400,
      medium: 500,
      tablet: 600,
      landscape: 350,
    }),
    minHeight: responsive.verticalScale(300),
  },
  logoLandscape: {
    height: responsive.verticalScale(400),
    maxHeight: responsive.verticalScale(400),
  },
  footerContainer: {
    paddingHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      medium: 20,
      tablet: 40,
    }),
    width: '100%',
    paddingBottom: responsive.getResponsiveValue(0, {
      small: responsive.spacing.sm,
      tablet: responsive.spacing.xl,
    }),
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: responsive.verticalScale(56),
    borderRadius: responsive.scale(28),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.getResponsiveValue(25, {
      small: 20,
      tablet: 30,
    }),
    width: '100%',
    minHeight: responsive.getResponsiveValue(56, {
      tablet: 64,
    }),
  },
  buttonText: {
    color: '#666668',
    fontSize: responsive.getResponsiveFont(16, {
      small: 14,
      tablet: 18,
      landscape: 15,
    }),
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  arrowIcon: {
    width: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 24,
    }),
    height: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 24,
    }),
    tintColor: '#666668',
  },
});

export default WelcomeScreen;