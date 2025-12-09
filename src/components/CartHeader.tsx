import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsive } from '../constants/responsive';

const CartHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons 
          name="chevron-back" 
          size={responsive.getResponsiveValue(24, { tablet: 28 })} 
          color="#E6E8EC" 
        />
      </TouchableOpacity>
      
      <Text style={styles.headerTitle}>Your Cart</Text>
      
      <View style={styles.rightPlaceholder} />
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
    }),
    paddingVertical: responsive.getResponsiveValue(10, {
      tablet: 15,
    }),
  },
  backButton: {
    width: responsive.getResponsiveValue(40, {
      tablet: 50,
    }),
    height: responsive.getResponsiveValue(40, {
      tablet: 50,
    }),
    borderRadius: responsive.scale(20),
    backgroundColor: '#141416',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { 
    fontSize: responsive.getResponsiveFont(20, {
      small: 18,
      tablet: 24,
      landscape: 18,
    }), 
    fontWeight: '700', 
    color: '#E6E8EC' 
  },
  rightPlaceholder: { 
    width: responsive.getResponsiveValue(40, {
      tablet: 50,
    }) 
  },
};

export default CartHeader;