import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { responsive } from '../constants/responsive';

import CheckoutHeader from '../components/CheckoutHeader';
import ShippingStep from '../components/ShippingStep';
import PaymentStep from '../components/PaymentStep';
import OrderCompletedStep from '../components/OrderCompletedStep';
import CountryModal from '../components/CountryModal';

const COLORS = {
  bgMain: '#121212',
  textWhite: '#FFFFFF',
};

const MultiStepCheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: any) => state.cart.items);
  
  const { isTablet, isLandscape } = responsive.layout;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('free');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [copyBillingAddress, setCopyBillingAddress] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset to step 1 when screen is focused
      setCurrentStep(1);
      
      // Also reset other states if needed
      setIsProcessing(false);
      setCouponCode('');
    });

    // Clean up the listener when component unmounts
    return unsubscribe;
  }, [navigation]);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: 'Narinder',
    lastName: '',
    country: 'India',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    country: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '4364 1345 8932 8378',
    cardHolder: 'Sunie Pham',
    expiryDate: '05/24',
    cvv: '',
  });

  const [errors, setErrors] = useState({
    shipping: {},
    billing: {},
    payment: {},
  });

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [currentStep]);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0);
  };

  const calculateShippingCost = () => {
    switch(shippingMethod) {
      case 'free': return 0;
      case 'standard': return 9.90;
      case 'fast': return 9.90;
      default: return 0;
    }
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShippingCost();
  };

  const validateShippingStep = () => {
    const newErrors = {};
    let isValid = true;

    if (!shippingInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!shippingInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!shippingInfo.country.trim()) {
      newErrors.country = 'Country is required';
      isValid = false;
    }

    if (!shippingInfo.street.trim()) {
      newErrors.street = 'Street name is required';
      isValid = false;
    }

    if (!shippingInfo.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!shippingInfo.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
      isValid = false;
    }

    if (!shippingInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10,15}$/.test(shippingInfo.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
      isValid = false;
    }

    setErrors(prev => ({ ...prev, shipping: newErrors }));
    return isValid;
  };

  const validatePaymentStep = () => {
    const newErrors = {};
    let isValid = true;

    if (paymentMethod === 'credit') {
      if (!paymentInfo.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
        isValid = false;
      } else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\D/g, ''))) {
        newErrors.cardNumber = 'Invalid card number (16 digits required)';
        isValid = false;
      }

      if (!paymentInfo.cardHolder.trim()) {
        newErrors.cardHolder = 'Card holder name is required';
        isValid = false;
      }

      if (!paymentInfo.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
        isValid = false;
      } else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
        newErrors.expiryDate = 'Invalid format (MM/YY)';
        isValid = false;
      }

      if (!paymentInfo.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
        isValid = false;
      } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
        newErrors.cvv = 'Invalid CVV';
        isValid = false;
      }
    }

    if (!termsAgreed) {
      Alert.alert('Terms Required', 'You must agree to the terms and conditions');
      isValid = false;
    }

    setErrors(prev => ({ ...prev, payment: newErrors }));
    return isValid;
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      if (validateShippingStep()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validatePaymentStep()) {
        processOrder();
      }
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleCopyAddress = () => {
    const newCopyState = !copyBillingAddress;
    setCopyBillingAddress(newCopyState);
    
    if (newCopyState) {
      setBillingInfo({ ...shippingInfo });
    } else {
      setBillingInfo({
        firstName: '',
        lastName: '',
        country: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
      });
    }
  };

  const processOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Your cart is empty. Please add items before checking out.');
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: cartItems,
        shippingInfo,
        billingInfo: copyBillingAddress ? shippingInfo : billingInfo,
        paymentInfo,
        shippingMethod,
        paymentMethod,
        subtotal: calculateSubtotal(),
        shippingCost: calculateShippingCost(),
        total: calculateTotal(),
        status: 'completed'
      };

      console.log('Order placed:', order);

      dispatch({ type: 'cart/clearCart' });
      setCurrentStep(3);
      
    } catch (error) {
      Alert.alert('Order Failed', 'There was an error processing your order. Please try again.');
      console.error('Order processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinueShopping = () => {
    navigation.navigate('HomeTabs', {
      screen: 'Discover',
    });
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      Alert.alert('Coupon Applied', `Coupon code "${couponCode}" has been applied!`);
    } else {
      Alert.alert('Enter Code', 'Please enter a coupon code first');
    }
  };

  const handleShippingChange = (field, value) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (copyBillingAddress) {
      setBillingInfo(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    if (errors.shipping[field]) {
      setErrors(prev => ({
        ...prev,
        shipping: { ...prev.shipping, [field]: '' }
      }));
    }
  };

  const handlePaymentChange = (field, value) => {
    if (field === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '');
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
      value = formatted.slice(0, 19);
    }
    else if (field === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        value = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
      } else {
        value = cleaned;
      }
    }

    setPaymentInfo(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors.payment[field]) {
      setErrors(prev => ({
        ...prev,
        payment: { ...prev.payment, [field]: '' }
      }));
    }
  };

  const selectCountry = (countryName) => {
    setShippingInfo(prev => ({ ...prev, country: countryName }));
    if (copyBillingAddress) {
      setBillingInfo(prev => ({ ...prev, country: countryName }));
    }
    setShowCountryModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgMain} />
      
      <CheckoutHeader 
        currentStep={currentStep}
        cartItems={cartItems}
        goToPrevStep={goToPrevStep}
      />
      
      <CountryModal 
        visible={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        onSelectCountry={selectCountry}
        selectedCountry={shippingInfo.country}
      />

      <ScrollView 
        ref={scrollViewRef} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.scrollContentTablet,
          isLandscape && styles.scrollContentLandscape,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {currentStep === 1 && (
          <ShippingStep
            shippingInfo={shippingInfo}
            shippingMethod={shippingMethod}
            couponCode={couponCode}
            copyBillingAddress={copyBillingAddress}
            errors={errors.shipping}
            cartItems={cartItems}
            isProcessing={isProcessing}
            onShippingChange={handleShippingChange}
            onSetShippingMethod={setShippingMethod}
            onSetCouponCode={setCouponCode}
            onToggleCopyAddress={handleCopyAddress}
            onApplyCoupon={handleApplyCoupon}
            onShowCountryModal={() => setShowCountryModal(true)}
            onContinue={goToNextStep}
          />
        )}
        
        {currentStep === 2 && (
          <PaymentStep
            paymentMethod={paymentMethod}
            paymentInfo={paymentInfo}
            termsAgreed={termsAgreed}
            errors={errors.payment}
            isProcessing={isProcessing}
            cartItems={cartItems}
            subtotal={calculateSubtotal()}
            shippingCost={calculateShippingCost()}
            total={calculateTotal()}
            onSetPaymentMethod={setPaymentMethod}
            onSetTermsAgreed={setTermsAgreed}
            onPaymentChange={handlePaymentChange}
            onContinue={goToNextStep}
          />
        )}
        
        {currentStep === 3 && (
          <OrderCompletedStep
            onContinueShopping={handleContinueShopping}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
    }),
    paddingBottom: responsive.verticalScale(40),
  },
  scrollContentTablet: {
    paddingHorizontal: 40,
    paddingBottom: responsive.verticalScale(60),
  },
  scrollContentLandscape: {
    paddingHorizontal: responsive.spacing.xl,
  },
};

export default MultiStepCheckoutScreen;