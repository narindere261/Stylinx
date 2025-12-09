import React, { useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { responsive } from '../constants/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CartHeader from '../components/CartHeader';
import CartItemsList from '../components/CartItemsList';
import CartSummary from '../components/CartSummary';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  background: '#181A20',
  cardBg: '#141416',
  footerBg: '#141416',
  textPrimary: '#E6E8EC',
  textSecondary: '#A0A0A0',
  buttonBg: '#FFFFFF',
  buttonText: '#000000',
  accent: '#508A7B',
  divider: '#2A2A2A',
};

const CartScreen = ({navigation}) => {
  const cartItems = useSelector((state) => state.cart.items);
  const [subtotal, setSubtotal] = useState(0);

  const { isTablet } = responsive.layout;

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(total);
  }, [cartItems]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <CartHeader navigation={navigation} />

      {cartItems.length === 0 ? (
        <EmptyCartView />
      ) : (
        <>
          <CartItemsList 
            cartItems={cartItems} 
            isTablet={isTablet}
          />
          <CartSummary 
            subtotal={subtotal} 
            navigation={navigation}
            isTablet={isTablet}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const EmptyCartView = () => (
  <View style={styles.emptyContainer}>
    <Ionicons 
      name="cart-outline" 
      size={responsive.getResponsiveValue(80, { tablet: 100 })} 
      color="#A0A0A0" 
    />
    <Text style={styles.emptyText}>Your cart is empty</Text>
    <Text style={styles.emptySubText}>Add some items to get started!</Text>
  </View>
);

const styles = {
  container: { 
    flex: 1, 
    backgroundColor: '#181A20' 
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: responsive.spacing.lg,
  },
  emptyText: { 
    fontSize: responsive.getResponsiveFont(20, {
      small: 18,
      tablet: 24,
    }), 
    fontWeight: 'bold', 
    color: '#E6E8EC', 
    marginTop: responsive.spacing.md,
    textAlign: 'center',
  },
  emptySubText: { 
    fontSize: responsive.getResponsiveFont(16, {
      small: 14,
      tablet: 18,
    }), 
    color: '#A0A0A0', 
    marginTop: responsive.spacing.xs, 
    textAlign: 'center' 
  },
};

export default CartScreen;