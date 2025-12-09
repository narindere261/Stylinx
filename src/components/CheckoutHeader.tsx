import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsive } from '../constants/responsive';

const CheckoutHeader = ({ currentStep, cartItems, goToPrevStep }) => {
  const { isTablet, isLandscape, isSmallDevice } = responsive.layout;
  
  const stepCircleSize = responsive.getResponsiveValue(40, { tablet: 48 });
  const stepIconSize = responsive.getResponsiveValue(20, { tablet: 24 });
  const stepLineWidth = responsive.getResponsiveValue(50, { tablet: 70 });

  return (
    <View style={[
      styles.headerContainer,
      isTablet && styles.headerContainerTablet,
      isLandscape && styles.headerContainerLandscape,
    ]}>
      <View style={[
        styles.headerTopRow,
        isTablet && styles.headerTopRowTablet,
      ]}>
        {currentStep < 3 ? (
          <TouchableOpacity onPress={goToPrevStep} style={styles.backButton}>
            <Ionicons 
              name="chevron-back" 
              size={responsive.getResponsiveValue(24, { tablet: 28 })} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <Text style={[
          styles.headerTitle,
          isTablet && styles.headerTitleTablet,
          isSmallDevice && styles.headerTitleSmall,
        ]}>
          {currentStep === 3 ? 'Order Completed' : 'Check out'}
        </Text>
        {currentStep < 3 && (
          <View style={[
            styles.cartCountBadge,
            isTablet && styles.cartCountBadgeTablet,
          ]}>
            <Text style={[
              styles.cartCountText,
              isTablet && styles.cartCountTextTablet,
            ]}>{cartItems.length}</Text>
          </View>
        )}
      </View>

      <View style={styles.stepsIndicatorContainer}>
        {/* Step 1 - Location */}
        <View style={[
          styles.stepCircle, 
          { width: stepCircleSize, height: stepCircleSize, borderRadius: stepCircleSize / 2 },
        ]}>
          <Ionicons 
            name="location-sharp" 
            size={stepIconSize} 
            color={currentStep >= 1 ? '#FCFCFD' : '#A0A0A0'} // Blue when active
          />
        </View>
        
        {/* Dashed Line between Step 1 and 2 */}
        <View style={[
          styles.stepLineSeparator,
          styles.stepLineDashed,
          { width: stepLineWidth },
          currentStep >= 2 && styles.stepLineActive
        ]} />
        
        {/* Step 2 - Credit Card */}
        <View style={[
          styles.stepCircle, 
          { width: stepCircleSize, height: stepCircleSize, borderRadius: stepCircleSize / 2 },
        ]}>
          <MaterialCommunityIcons 
            name="credit-card" 
            size={stepIconSize} 
            color={currentStep >= 2 ? '#FCFCFD' : '#A0A0A0'} // Teal when active
          />
        </View>

        {/* Dashed Line between Step 2 and 3 */}
        <View style={[
          styles.stepLineSeparator,
          styles.stepLineDashed,
          { width: stepLineWidth },
          currentStep >= 3 && styles.stepLineActive
        ]} />
        
        {/* Step 3 - Checkmark */}
        <View style={[
          styles.stepCircle, 
          { width: stepCircleSize, height: stepCircleSize, borderRadius: stepCircleSize / 2 },
        ]}>
          <Ionicons 
            name="checkmark" 
            size={stepIconSize} 
            color={currentStep >= 3 ? '#FCFCFD' : '#A0A0A0'} // Green when active
          />
        </View>
      </View>
    </View>
  );
};

const styles = {
  headerContainer: {
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    paddingTop: responsive.verticalScale(10),
    paddingBottom: responsive.verticalScale(20),
    backgroundColor: '#121212',
  },
  headerContainerTablet: {
    paddingHorizontal: 40,
    paddingTop: responsive.verticalScale(20),
    paddingBottom: responsive.verticalScale(30),
  },
  headerContainerLandscape: {
    paddingTop: responsive.verticalScale(5),
    paddingBottom: responsive.verticalScale(15),
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.verticalScale(25),
  },
  headerTopRowTablet: {
    marginBottom: responsive.verticalScale(35),
  },
  headerTitle: {
    fontSize: responsive.getResponsiveFont(18, {
      small: 16,
      tablet: 24,
      landscape: 20,
    }),
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft:110
  },
  headerTitleTablet: {
    fontSize: 24,
  },
  headerTitleSmall: {
    fontSize: 16,
  },
  backButton: {
    width: responsive.scale(24),
  },
  cartCountBadge: {
    backgroundColor: '#508A7B',
    width: responsive.scale(24),
    height: responsive.scale(24),
    borderRadius: responsive.scale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountBadgeTablet: {
    width: responsive.scale(30),
    height: responsive.scale(30),
    borderRadius: responsive.scale(15),
  },
  cartCountText: {
    color: '#121212',
    fontSize: responsive.getResponsiveFont(12, { tablet: 14 }),
    fontWeight: 'bold',
  },
  cartCountTextTablet: {
    fontSize: 14,
  },
  stepsIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // No background
    borderWidth: 0, // No border
  },
  stepLineSeparator: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginHorizontal: responsive.spacing.sm,
  },
  stepLineDashed: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#777E90',
    backgroundColor: 'transparent',
    height: 0,
  },
  stepLineActive: {
    borderColor: 'white', // Teal color for active dashed line
  },
};

export default CheckoutHeader;