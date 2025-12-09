import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsive } from '../constants/responsive';
import InputField from './InputField';

const ShippingStep = ({
  shippingInfo,
  shippingMethod,
  couponCode,
  copyBillingAddress,
  errors,
  cartItems,
  isProcessing,
  onShippingChange,
  onSetShippingMethod,
  onSetCouponCode,
  onToggleCopyAddress,
  onApplyCoupon,
  onShowCountryModal,
  onContinue,
}) => {
  const { isTablet, isLandscape } = responsive.layout;
  const halfInputMargin = responsive.getResponsiveValue(10, { tablet: 15 });

  return (
    <View>
      <Text style={[
        styles.stepTitle,
        isTablet && styles.stepTitleTablet,
      ]}>STEP 1</Text>
      <Text style={[
        styles.sectionHeader,
        isTablet && styles.sectionHeaderTablet,
        isLandscape && styles.sectionHeaderLandscape,
      ]}>Shipping</Text>

     
          <InputField 
            label="First name" 
            value={shippingInfo.firstName}
            placeholder="Enter first name"
            onChangeText={(text) => onShippingChange('firstName', text)}
            error={errors.firstName}
            required
          />
          <InputField 
            label="Last name" 
            value={shippingInfo.lastName}
            placeholder="Enter last name"
            onChangeText={(text) => onShippingChange('lastName', text)}
            error={errors.lastName}
            required
          />

      <InputField 
        label="Country" 
        value={shippingInfo.country}
        placeholder="Select country"
        onChangeText={() => {}}
        editable={false}
        onPress={onShowCountryModal}
        error={errors.country}
        required
      />

      <InputField 
        label="Street name" 
        value={shippingInfo.street}
        placeholder="Enter street address"
        onChangeText={(text) => onShippingChange('street', text)}
        error={errors.street}
        required
      />

      <InputField 
        label="City" 
        value={shippingInfo.city}
        placeholder="Enter city"
        onChangeText={(text) => onShippingChange('city', text)}
        error={errors.city}
        required
      />

          <InputField 
            label="State / Province" 
            value={shippingInfo.state}
            placeholder="Enter state"
            onChangeText={(text) => onShippingChange('state', text)}
          />
          <InputField 
            label="Zip-code" 
            value={shippingInfo.zipCode}
            placeholder="Enter zip code"
            onChangeText={(text) => onShippingChange('zipCode', text)}
            keyboardType="number-pad"
            error={errors.zipCode}
            required
          />

      <InputField 
        label="Phone number" 
        value={shippingInfo.phone}
        placeholder="Enter phone number"
        onChangeText={(text) => onShippingChange('phone', text)}
        keyboardType="phone-pad"
        error={errors.phone}
        required
      />

      <Text style={[
        styles.sectionHeader, 
        { marginTop: responsive.verticalScale(30) },
        isTablet && styles.sectionHeaderTablet,
        { fontSize: responsive.getResponsiveFont(18, { tablet: 22 }) }
      ]}>Shipping method</Text>
      
      <TouchableOpacity 
        style={[
          styles.shippingOption, 
          isTablet && styles.shippingOptionTablet,
          shippingMethod === 'free' && styles.shippingOptionSelected,
        ]}
        onPress={() => onSetShippingMethod('free')}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons 
            name={shippingMethod === 'free' ? "radio-button-on" : "radio-button-off"} 
            size={responsive.getResponsiveValue(24, { tablet: 28 })} 
            color={shippingMethod === 'free' ? '#508A7B' : '#A0A0A0'} 
          />
          <View style={{ marginLeft: responsive.spacing.md }}>
            <Text style={[
              styles.shippingTitle,
              isTablet && styles.shippingTitleTablet,
            ]}>Free Delivery to home</Text>
            <Text style={[
              styles.shippingSubtitle,
              isTablet && styles.shippingSubtitleTablet,
            ]}>Delivery from 3 to 7 business days</Text>
          </View>
        </View>
        <Text style={[
          styles.shippingPrice,
          isTablet && styles.shippingPriceTablet,
        ]}>$0</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.shippingOption, 
          isTablet && styles.shippingOptionTablet,
          shippingMethod === 'standard' && styles.shippingOptionSelected,
        ]}
        onPress={() => onSetShippingMethod('standard')}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons 
            name={shippingMethod === 'standard' ? "radio-button-on" : "radio-button-off"} 
            size={responsive.getResponsiveValue(24, { tablet: 28 })} 
            color={shippingMethod === 'standard' ? '#508A7B' : '#A0A0A0'} 
          />
          <View style={{ marginLeft: responsive.spacing.md }}>
            <Text style={[
              styles.shippingTitle,
              isTablet && styles.shippingTitleTablet,
            ]}>Delivery to home</Text>
            <Text style={[
              styles.shippingSubtitle,
              isTablet && styles.shippingSubtitleTablet,
            ]}>Delivery from 4 to 6 business days</Text>
          </View>
        </View>
        <Text style={[
          styles.shippingPrice,
          isTablet && styles.shippingPriceTablet,
        ]}>$9.70</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.shippingOption, 
          isTablet && styles.shippingOptionTablet,
          shippingMethod === 'fast' && styles.shippingOptionSelected,
        ]}
        onPress={() => onSetShippingMethod('fast')}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons 
            name={shippingMethod === 'fast' ? "radio-button-on" : "radio-button-off"} 
            size={responsive.getResponsiveValue(24, { tablet: 28 })} 
            color={shippingMethod === 'fast' ? '#508A7B' : '#A0A0A0'} 
          />
          <View style={{ marginLeft: responsive.spacing.md }}>
            <Text style={[
              styles.shippingTitle,
              isTablet && styles.shippingTitleTablet,
            ]}>Fast Delivery</Text>
            <Text style={[
              styles.shippingSubtitle,
              isTablet && styles.shippingSubtitleTablet,
            ]}>Delivery from 2 to 3 business days</Text>
          </View>
        </View>
        <Text style={[
          styles.shippingPrice,
          isTablet && styles.shippingPriceTablet,
        ]}>$9.70</Text>
      </TouchableOpacity>

      <Text style={[
        styles.sectionHeader, 
        { marginTop: responsive.verticalScale(30) },
        { fontSize: responsive.getResponsiveFont(16, { tablet: 18 }) }
      ]}>Coupon Code</Text>
      <View style={[
        styles.couponContainer,
        isTablet && styles.couponContainerTablet,
      ]}>
        <TextInput
          style={[
            styles.couponInput,
            isTablet && styles.couponInputTablet,
          ]}
          value={couponCode}
          onChangeText={onSetCouponCode}
          placeholder="Have a coupon's code? type it here..."
          placeholderTextColor="#A0A0A0"
          onSubmitEditing={onApplyCoupon}
        />
        <TouchableOpacity onPress={onApplyCoupon}>
          <Text style={[
            styles.couponValidate,
            isTablet && styles.couponValidateTablet,
          ]}>Validate</Text>
        </TouchableOpacity>
      </View>

      <Text style={[
        styles.sectionHeader, 
        { marginTop: responsive.verticalScale(30) },
        { fontSize: responsive.getResponsiveFont(16, { tablet: 18 }) }
      ]}>Billing Address</Text>
      <TouchableOpacity 
        style={styles.checkboxRow}
        onPress={onToggleCopyAddress}
      >
        <Ionicons 
          name={copyBillingAddress ? "checkbox" : "square-outline"} 
          size={responsive.getResponsiveValue(24, { tablet: 28 })} 
          color={copyBillingAddress ? '#508A7B' : '#A0A0A0'} 
        />
        <Text style={[
          styles.checkboxLabel,
          isTablet && styles.checkboxLabelTablet,
        ]}>Copy address data from shipping</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.mainButton, 
          (cartItems.length === 0 || isProcessing) && styles.buttonDisabled,
          isTablet && styles.mainButtonTablet,
        ]}
        onPress={onContinue}
        disabled={cartItems.length === 0 || isProcessing}
      >
        <Text style={[
          styles.mainButtonText,
          isTablet && styles.mainButtonTextTablet,
        ]}>
          {isProcessing ? 'Processing...' : 'Continue to payment'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  stepTitle: {
    color: '#A0A0A0',
    fontSize: responsive.getResponsiveFont(12, {
      small: 11,
      tablet: 14,
    }),
    fontWeight: '600',
    marginBottom: responsive.spacing.xs,
    marginTop: responsive.spacing.sm,
    letterSpacing: 1,
  },
  stepTitleTablet: {
    fontSize: 14,
    marginTop: responsive.spacing.md,
  },
  sectionHeader: {
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(24, {
      small: 22,
      tablet: 30,
      landscape: 22,
    }),
    fontWeight: 'bold',
    marginBottom: responsive.verticalScale(25),
  },
  sectionHeaderTablet: {
    fontSize: 30,
    marginBottom: responsive.verticalScale(30),
  },
  sectionHeaderLandscape: {
    fontSize: 22,
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
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.5,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameRowTablet: {
    gap: responsive.spacing.md,
  },
  cityZipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cityZipRowTablet: {
    gap: responsive.spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  shippingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsive.verticalScale(12),
    paddingHorizontal: responsive.spacing.md,
    borderRadius: responsive.scale(12),
    marginBottom: responsive.spacing.xs,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  shippingOptionTablet: {
    paddingVertical: responsive.verticalScale(15),
    paddingHorizontal: responsive.spacing.lg,
    borderRadius: responsive.scale(15),
    marginBottom: responsive.spacing.sm,
  },
  shippingOptionSelected: {
    backgroundColor: '#1E1E1E',
    borderColor: '#508A7B',
  },
  shippingTitle: { 
    color: '#FFFFFF', 
    fontSize: responsive.getResponsiveFont(15, { tablet: 17 }), 
    fontWeight: '500' 
  },
  shippingTitleTablet: {
    fontSize: 17,
  },
  shippingSubtitle: { 
    color: '#A0A0A0', 
    fontSize: responsive.getResponsiveFont(12, { tablet: 14 }), 
    marginTop: responsive.spacing.xs 
  },
  shippingSubtitleTablet: {
    fontSize: 14,
  },
  shippingPrice: {
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }),
    fontWeight: '600',
  },
  shippingPriceTablet: {
    fontSize: 18,
  },
  couponContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: responsive.scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing.md,
    paddingVertical: responsive.verticalScale(12),
  },
  couponContainerTablet: {
    borderRadius: 15,
    paddingHorizontal: responsive.spacing.lg,
    paddingVertical: responsive.verticalScale(15),
  },
  couponInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
  },
  couponInputTablet: {
    fontSize: 16,
  },
  couponValidate: { 
    color: '#508A7B', 
    fontWeight: '600',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
    marginLeft: responsive.spacing.sm,
  },
  couponValidateTablet: {
    fontSize: 16,
  },
  checkboxRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: responsive.spacing.sm 
  },
  checkboxLabel: { 
    color: '#A0A0A0', 
    marginLeft: responsive.spacing.sm, 
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }) 
  },
  checkboxLabelTablet: {
    fontSize: 16,
  },
};

export default ShippingStep;