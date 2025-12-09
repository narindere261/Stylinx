import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { responsive } from '../constants/responsive';

const CartSummary = ({ subtotal, navigation, isTablet }) => {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Product price</Text>
        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Shipping</Text>
        <Text style={styles.summaryValue}>Freeship</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <Text style={styles.subtotalLabel}>Subtotal</Text>
        <Text style={styles.subtotalValue}>${subtotal.toFixed(2)}</Text>
      </View>

      <TouchableOpacity 
        style={styles.checkoutButton} 
        onPress={() => navigation.navigate("CheckoutScreen")}
      >
        <Text style={styles.checkoutButtonText}>Proceed to checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  summaryContainer: {
    padding: responsive.getResponsiveValue(24, {
      small: 20,
      tablet: 30,
    }),
    paddingTop: responsive.getResponsiveValue(44, {
      tablet: 50,
    }),
    paddingBottom: responsive.getResponsiveValue(34, {
      tablet: 40,
    }),
    backgroundColor: '#141416',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    borderTopLeftRadius: responsive.scale(30),
    borderTopEndRadius: responsive.scale(30),
  },
  summaryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: responsive.getResponsiveValue(15, { tablet: 18 }) 
  },
  summaryLabel: { 
    color: '#E6E8EC', 
    fontSize: responsive.getResponsiveFont(16, {
      small: 15,
      tablet: 18,
    }) 
  },
  summaryValue: { 
    color: '#E6E8EC', 
    fontSize: responsive.getResponsiveFont(16, {
      small: 15,
      tablet: 18,
    }), 
    fontWeight: '600' 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#2A2A2A', 
    marginVertical: responsive.getResponsiveValue(15, { tablet: 18 }) 
  },
  subtotalLabel: { 
    color: '#E6E8EC', 
    fontSize: responsive.getResponsiveFont(18, {
      small: 17,
      tablet: 22,
    }), 
    fontWeight: '600' 
  },
  subtotalValue: { 
    color: '#E6E8EC', 
    fontSize: responsive.getResponsiveFont(24, {
      small: 22,
      tablet: 28,
    }), 
    fontWeight: 'bold' 
  },
  checkoutButton: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: responsive.scale(30), 
    paddingVertical: responsive.verticalScale(18),
    alignItems: 'center', 
    marginTop: responsive.getResponsiveValue(25, { tablet: 30 }),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  checkoutButtonText: { 
    color: '#000000', 
    fontSize: responsive.getResponsiveFont(16, {
      small: 15,
      tablet: 18,
    }), 
    fontWeight: 'bold' 
  },
};

export default CartSummary;