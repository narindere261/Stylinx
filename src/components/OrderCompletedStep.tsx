import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { responsive } from '../constants/responsive';

// Import your image - update the path as needed
const COMPLETED_IMAGE = require('../assets/images/order2.png');

const OrderCompletedStep = ({ onContinueShopping }) => {
  const { isTablet, isLandscape } = responsive.layout;
  
  // Set image dimensions
  const imageWidth = responsive.getResponsiveValue(120, { 
    tablet: 150, 
    landscape: 100 
  });
  const imageHeight = responsive.getResponsiveValue(120, { 
    tablet: 150, 
    landscape: 100 
  });

  return (
    <View style={[
      styles.completedContainer,
      isTablet && styles.completedContainerTablet,
    ]}>
      <View style={styles.completedIconContainer}>
        {/* Replace Ionicons with Image component */}
        <Image 
          source={COMPLETED_IMAGE}
          style={[
            styles.completedImage,
            {
              width: imageWidth,
              height: imageHeight,
            },
            isTablet && styles.completedImageTablet,
            isLandscape && styles.completedImageLandscape,
          ]}
          resizeMode="contain"
        />
      </View>
      
      <Text style={[
        styles.completedTitle,
        isTablet && styles.completedTitleTablet,
      ]}>Order Completed</Text>
      <Text style={[
        styles.completedSubtitle,
        isTablet && styles.completedSubtitleTablet,
        isLandscape && styles.completedSubtitleLandscape,
      ]}>
        Thank you for your purchase.{'\n'}You can view your order in 'My Orders' section.
      </Text>

      <TouchableOpacity 
        style={[
          styles.mainButton,
          isTablet && styles.mainButtonTablet,
        ]} 
        onPress={onContinueShopping}
      >
        <Text style={[
          styles.mainButtonText,
          isTablet && styles.mainButtonTextTablet,
        ]}>Continue shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  completedContainer: { 
    alignItems: 'center', 
    paddingTop: responsive.verticalScale(60), 
    paddingHorizontal: responsive.getResponsiveValue(40, { tablet: 60 }) 
  },
  completedContainerTablet: {
    paddingTop: responsive.verticalScale(80),
    paddingHorizontal: 60,
  },
  completedIconContainer: { 
    marginBottom: responsive.verticalScale(30) 
  },
  // New styles for the image
  completedImage: {
    width: 120,
    height: 120,
  },
  completedImageTablet: {
    width: 150,
    height: 150,
  },
  completedImageLandscape: {
    width: 100,
    height: 100,
  },
  completedTitle: { 
    color: '#FFFFFF', 
    fontSize: responsive.getResponsiveFont(24, { tablet: 30 }), 
    fontWeight: 'bold', 
    marginBottom: responsive.verticalScale(15) ,
    marginTop: responsive.verticalScale(35) 
  },
  completedTitleTablet: {
    fontSize: 30,
    marginBottom: responsive.verticalScale(20),
  },
  completedSubtitle: { 
    color: '#FCFCFD', 
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }), 
    textAlign: 'center', 
    lineHeight: responsive.getResponsiveValue(24, { tablet: 28 }), 
    marginBottom: responsive.verticalScale(40) 
  },
  completedSubtitleTablet: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: responsive.verticalScale(50),
  },
  completedSubtitleLandscape: {
    fontSize: 16,
    lineHeight: 24,
  },
  mainButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: responsive.scale(30),
    paddingVertical: responsive.verticalScale(16),
    alignItems: 'center',
    marginTop: responsive.verticalScale(25),
    width: '100%',
  },
  mainButtonTablet: {
    borderRadius: 35,
    paddingVertical: responsive.verticalScale(20),
    marginTop: responsive.verticalScale(30),
  },
  mainButtonText: {
    color: '#000000',
    fontSize: responsive.getResponsiveFont(16, {
      small: 15,
      tablet: 18,
    }),
    fontWeight: 'bold',
  },
  mainButtonTextTablet: {
    fontSize: 18,
  },
};

export default OrderCompletedStep;