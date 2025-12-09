import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { responsive } from '../constants/responsive';
import InputField from '../components/InputField';

// Assuming you have this image in your assets
// You'll need to adjust the path based on your project structure
const CARD_IMAGE = require('../assets/images/cardimage.png');

const PaymentStep = ({
  paymentMethod,
  paymentInfo,
  termsAgreed,
  errors,
  isProcessing,
  cartItems,
  subtotal,
  shippingCost,
  total,
  onSetPaymentMethod,
  onSetTermsAgreed,
  onPaymentChange,
  onContinue,
}) => {
  const { isTablet, isLandscape } = responsive.layout;
  const halfInputMargin = responsive.getResponsiveValue(10, { tablet: 15 });

  return (
    <View>
      <Text style={[
        styles.stepTitle,
        isTablet && styles.stepTitleTablet,
      ]}>STEP 2</Text>
      <Text style={[
        styles.sectionHeader,
        isTablet && styles.sectionHeaderTablet,
        isLandscape && styles.sectionHeaderLandscape,
      ]}>Payment</Text>

      <View style={[
        styles.paymentTabsRow, 
        isTablet && styles.paymentTabsRowTablet,
      ]}>
       // Update the paymentTabsRow styles
<TouchableOpacity 
  style={[
    styles.paymentTab, 
    isTablet && styles.paymentTabTablet,
    paymentMethod === 'cash' && styles.paymentTabActive,
  ]}
  onPress={() => onSetPaymentMethod('cash')}
>
  <MaterialCommunityIcons 
    name="cash" 
    size={responsive.getResponsiveValue(24, { tablet: 28 })} 
    color={paymentMethod === 'cash' ? '#121212' : '#A0A0A0'} 
  />
  <Text style={[
    styles.paymentTabText,
    isTablet && styles.paymentTabTextTablet,
    paymentMethod === 'cash' && styles.paymentTabTextActive,
  ]}>
    Cash
  </Text>
</TouchableOpacity>

<TouchableOpacity 
  style={[
    styles.paymentTab, 
    isTablet && styles.paymentTabTablet,
    paymentMethod === 'credit' && styles.paymentTabActive,
  ]}
  onPress={() => onSetPaymentMethod('credit')}
>
  <MaterialCommunityIcons 
    name="credit-card-outline" 
    size={responsive.getResponsiveValue(24, { tablet: 28 })} 
    color={paymentMethod === 'credit' ? '#121212' : '#A0A0A0'} 
  />
  <Text style={[
    styles.paymentTabText,
    isTablet && styles.paymentTabTextTablet,
    paymentMethod === 'credit' && styles.paymentTabTextActive,
  ]}>
    Credit Card
  </Text>
</TouchableOpacity>

<TouchableOpacity style={[
  styles.paymentTabThreeDots,
  isTablet && styles.paymentTabThreeDotsTablet,
]}>
  <Ionicons 
    name="ellipsis-horizontal" 
    size={responsive.getResponsiveValue(24, { tablet: 28 })} 
    color="#A0A0A0" 
  />
</TouchableOpacity>
      </View>

      <View style={[
        styles.chooseCardHeader,
        isTablet && styles.chooseCardHeaderTablet,
      ]}>
        <Text style={[
          styles.chooseCardTitle,
          isTablet && styles.chooseCardTitleTablet,
        ]}>Choose your card</Text>
        <TouchableOpacity>
          <Text style={[
            styles.addNewText,
            isTablet && styles.addNewTextTablet,
          ]}>Add new+</Text>
        </TouchableOpacity>
      </View>

      {/* Replace the entire credit card UI with an Image component */}
      <View style={[
        styles.creditCardImageContainer,
        isTablet && styles.creditCardImageContainerTablet,
      ]}>
        <Image
          source={CARD_IMAGE}
          style={[
            styles.creditCardImage,
            isTablet && styles.creditCardImageTablet,
          ]}
          resizeMode="stretch"
        />
      </View>

      {paymentMethod === 'credit' && (
        <View style={styles.cardFormContainer}>
          <InputField 
            label="Card Number" 
            value={paymentInfo.cardNumber}
            placeholder="1234 5678 9012 3456"
            onChangeText={(text) => onPaymentChange('cardNumber', text)}
            keyboardType="number-pad"
            maxLength={19}
            error={errors.cardNumber}
            required
          />

          <InputField 
            label="Card Holder Name" 
            value={paymentInfo.cardHolder}
            placeholder="Enter card holder name"
            onChangeText={(text) => onPaymentChange('cardHolder', text)}
            error={errors.cardHolder}
            required
          />

          <View style={[
            styles.cardDetailsRow,
            isTablet && styles.cardDetailsRowTablet,
          ]}>
            <View style={styles.halfInput}>
              <InputField 
                label="Expiry Date" 
                value={paymentInfo.expiryDate}
                placeholder="MM/YY"
                onChangeText={(text) => onPaymentChange('expiryDate', text)}
                keyboardType="number-pad"
                maxLength={5}
                error={errors.expiryDate}
                required
              />
            </View>
            <View style={[styles.halfInput, { marginLeft: halfInputMargin }]}>
              <InputField 
                label="CVV" 
                value={paymentInfo.cvv}
                placeholder="123"
                onChangeText={(text) => onPaymentChange('cvv', text)}
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
                error={errors.cvv}
                required
              />
            </View>
          </View>
        </View>
      )}

      <Text style={[
        styles.orCheckoutText,
        isTablet && styles.orCheckoutTextTablet,
      ]}>or check out with</Text>
      <View style={[
        styles.paymentMethodsImageContainer,
        isTablet && styles.paymentMethodsImageContainerTablet,
      ]}>
        <Image
          source={require('../assets/images/paymentsdark.png')} // Update with your image path
          style={[
            styles.paymentMethodsImage,
            isTablet && styles.paymentMethodsImageTablet,
          ]}
          resizeMode="contain"
        />
      </View>

      <View style={[
        styles.orderSummaryContainer,
        isTablet && styles.orderSummaryContainerTablet,
      ]}>
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={[
              styles.summaryLabel,
              isTablet && styles.summaryLabelTablet,
            ]}>Product price</Text>
            <Text style={[
              styles.summaryValue,
              isTablet && styles.summaryValueTablet,
            ]}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={[
            styles.highlightedSummaryBox,
            isTablet && styles.highlightedSummaryBoxTablet,
          ]}>
            <View style={styles.summaryRow}>
              <Text style={[
                styles.summaryLabel,
                isTablet && styles.summaryLabelTablet,
              ]}>Shipping</Text>
              <Text style={[
                styles.summaryValue,
                isTablet && styles.summaryValueTablet,
              ]}>
                {shippingCost === 0 ? 'Freeship' : `$${shippingCost.toFixed(2)}`}
              </Text>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryRow}>
              <Text style={[
                styles.subtotalLabel,
                isTablet && styles.subtotalLabelTablet,
              ]}>Subtotal</Text>
              <Text style={[
                styles.subtotalValue,
                isTablet && styles.subtotalValueTablet,
              ]}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity 
              style={[
                styles.termsRow, 
                isTablet && styles.termsRowTablet,
              ]} 
              onPress={() => onSetTermsAgreed(!termsAgreed)}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={termsAgreed ? "checkbox" : "square-outline"} 
                size={responsive.getResponsiveValue(24, { tablet: 28 })} 
                color={termsAgreed ? '#4DB6AC' : '#A0A0A0'} 
              />
              <Text style={[
                styles.termsText,
                isTablet && styles.termsTextTablet,
              ]}>
                I agree to <Text style={{textDecorationLine: 'underline'}}>Terms and conditions</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.mainButton, 
                (!termsAgreed || isProcessing) && styles.buttonDisabled,
                isTablet && styles.mainButtonTablet,
              ]}
              onPress={onContinue}
              disabled={!termsAgreed || isProcessing}
            >
              <Text style={[
                styles.mainButtonText,
                isTablet && styles.mainButtonTextTablet,
              ]}>
                {isProcessing ? 'Processing Order...' : 'Place my order'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
    // Add these new styles
paymentMethodsImageContainer: {
    width: '100%',
    height: responsive.getResponsiveValue(50, {
      tablet: 60,
      landscape: 45,
    }),
    marginBottom: responsive.verticalScale(25),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentMethodsImageContainerTablet: {
    height: 60,
    marginBottom: responsive.verticalScale(30),
  },
  paymentMethodsImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  paymentMethodsImageTablet: {
    width: '100%',
    height: '100%',
  },
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
  paymentTabsRow: { 
    flexDirection: 'row', 
    marginBottom: responsive.verticalScale(25),
    gap: responsive.spacing.xs,
  },
  paymentTabsRowTablet: {
    gap: responsive.spacing.sm,
    marginBottom: responsive.verticalScale(30),
  },
  paymentTab: {
    flex: 1,
    backgroundColor: '#23262F', // Default background color
    borderRadius: responsive.scale(12),
    paddingVertical: responsive.verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: responsive.spacing.xs,
  },
  paymentTabTablet: {
    borderRadius: 15,
    paddingVertical: responsive.verticalScale(15),
    gap: responsive.spacing.sm,
  },
  paymentTabActive: { 
    backgroundColor: '#FFFFFF' // White when selected
  },
  paymentTabThreeDots: {
    width: responsive.scale(60),
    backgroundColor: '#23262F', // Same default background
    borderRadius: responsive.scale(12),
    paddingVertical: responsive.verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentTabThreeDotsTablet: {
    width: responsive.scale(70),
    borderRadius: 15,
    paddingVertical: responsive.verticalScale(15),
  },
  paymentTabText: { 
    color: '#A0A0A0', 
    fontSize: responsive.getResponsiveFont(13, { tablet: 15 }),
    fontWeight: '500',
  },
  paymentTabTextTablet: { 
    fontSize: 15,
  },
  paymentTabTextActive: { 
    color: '#121212',
    fontWeight: '600',
  },
  chooseCardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: responsive.verticalScale(15),
    marginTop: responsive.spacing.xs,
  },
  chooseCardHeaderTablet: {
    marginBottom: responsive.verticalScale(20),
    marginTop: responsive.spacing.sm,
  },
  chooseCardTitle: { 
    color: '#FFFFFF', 
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }), 
    fontWeight: '600' 
  },
  chooseCardTitleTablet: {
    fontSize: 18,
  },
  addNewText: { 
    color: '#4DB6AC', 
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
    fontWeight: '500',
  },
  addNewTextTablet: {
    fontSize: 16,
  },
  // New styles for the credit card image
  creditCardImageContainer: {
    width: '100%', // Explicit full width
    height: responsive.getResponsiveValue(230, {
      tablet: 240,
      landscape: 180,
    }),
    borderRadius: responsive.scale(16),
    overflow: 'hidden',
    marginBottom: responsive.verticalScale(25),
    backgroundColor: 'transparent',
    alignSelf: 'center', // Force stretch to parent width
  },
  creditCardImageContainerTablet: {
    width: '100%',
    height: 240,
    borderRadius: 20,
  },
  creditCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Change from resizeMode prop to style
  },
  creditCardImageTablet: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // Remove old credit card styles
  cardFormContainer: {
    marginTop: responsive.verticalScale(15),
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetailsRowTablet: {
    gap: responsive.spacing.md,
  },
  orCheckoutText: { 
    color: '#A0A0A0', 
    textAlign: 'left', 
    marginVertical: responsive.verticalScale(15),
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
  },
  orCheckoutTextTablet: {
    fontSize: 16,
    marginVertical: responsive.verticalScale(20),
  },
  paymentLogosRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: responsive.spacing.sm, 
    marginBottom: responsive.verticalScale(25),
    flexWrap: 'wrap',
  },
  paymentLogosRowTablet: {
    gap: responsive.spacing.md,
    marginBottom: responsive.verticalScale(30),
  },
  paymentLogoPlaceholder: { 
    backgroundColor: '#1E1E1E', 
    borderRadius: responsive.scale(8), 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: responsive.spacing.sm,
    paddingVertical: responsive.verticalScale(6),
  },
  paymentLogoPlaceholderTablet: {
    borderRadius: 10,
    paddingHorizontal: responsive.spacing.md,
    paddingVertical: responsive.verticalScale(8),
  },
  paymentLogoText: {
    color: '#A0A0A0',
    fontSize: responsive.getResponsiveFont(10, { tablet: 12 }),
    fontWeight: '500',
  },
  paymentLogoTextTablet: {
    fontSize: 12,
  },
  orderSummaryContainer: { 
    marginTop: responsive.verticalScale(10),
  },
  orderSummaryContainerTablet: {
    marginTop: responsive.verticalScale(20),
  },
  summarySection: {
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: responsive.verticalScale(20),
  },
  highlightedSummaryBox: {
    backgroundColor: 'rgba(0, 174, 239, 0.1)',
    borderRadius: responsive.scale(12),
    padding: responsive.getResponsiveValue(15, { tablet: 20 }),
    marginTop: responsive.verticalScale(15),
    borderWidth: 1,
    borderColor: '#00AEEF',
  },
  highlightedSummaryBoxTablet: {
    borderRadius: 16,
    padding: 20,
    marginTop: responsive.verticalScale(20),
  },
  summaryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: responsive.verticalScale(10) 
  },
  summaryLabel: { 
    color: '#A0A0A0', 
    fontSize: responsive.getResponsiveFont(15, { tablet: 17 }) 
  },
  summaryLabelTablet: {
    fontSize: 17,
  },
  summaryValue: { 
    color: '#FFFFFF', 
    fontSize: responsive.getResponsiveFont(15, { tablet: 17 }), 
    fontWeight: '500' 
  },
  summaryValueTablet: {
    fontSize: 17,
  },
  summaryDivider: { 
    height: 1, 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    marginVertical: responsive.verticalScale(10) 
  },
  subtotalLabel: { 
    color: '#FFFFFF', 
    fontSize: responsive.getResponsiveFont(17, { tablet: 20 }), 
    fontWeight: '700' 
  },
  subtotalLabelTablet: {
    fontSize: 20,
  },
  subtotalValue: { 
    color: '#FFFFFF', 
    fontSize: responsive.getResponsiveFont(22, { tablet: 26 }), 
    fontWeight: '700' 
  },
  subtotalValueTablet: {
    fontSize: 26,
  },
  termsRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: responsive.verticalScale(15), 
    marginBottom: responsive.verticalScale(15) 
  },
  termsRowTablet: {
    marginTop: responsive.verticalScale(20),
    marginBottom: responsive.verticalScale(20),
  },
  termsText: { 
    color: '#A0A0A0', 
    marginLeft: responsive.spacing.sm, 
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }), 
    flex: 1 
  },
  termsTextTablet: {
    fontSize: 16,
  },
};

export default PaymentStep;