import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { responsive } from '../constants/responsive';

const AddToCartButton = ({ product, selectedColor, selectedSize, isTablet, isLandscape }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        images: product.images || ['https://images.unsplash.com/photo-1627916960810-9f1e403d52c7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
      })
    );
    
    Alert.alert(
      "Item Added",
      `${product.title} (${selectedSize}, ${selectedColor}) has been added to your cart!`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={[
      styles.addToCartContainer,
      isTablet && styles.addToCartContainerTablet,
      isLandscape && styles.addToCartContainerLandscape,
    ]}>
      <TouchableOpacity 
        style={[
          styles.addToCartButton,
          isTablet && styles.addToCartButtonTablet,
        ]} 
        onPress={handleAddToCart}
      >
        <Ionicons 
          name="bag-handle" 
          size={responsive.getResponsiveValue(20, { tablet: 24 })} 
          color="black" 
          style={{ marginRight: responsive.spacing.sm }} 
        />
        <Text style={[
          styles.addToCartText,
          isTablet && styles.addToCartTextTablet,
        ]}>
          Add to Cart
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  addToCartContainer: {
    position: "absolute",
    bottom: responsive.verticalScale(30),
    left: 0,
    right: 0,
    backgroundColor: '#1E1E1E',
    paddingVertical: responsive.verticalScale(20),
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  addToCartContainerTablet: {
    paddingHorizontal: 40,
    bottom: responsive.verticalScale(40),
  },
  addToCartContainerLandscape: {
    bottom: responsive.verticalScale(20),
  },
  addToCartButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: responsive.verticalScale(56),
    borderRadius: responsive.scale(28),
  },
  addToCartButtonTablet: {
    height: responsive.verticalScale(64),
    borderRadius: responsive.scale(32),
  },
  addToCartText: {
    color: "black",
    fontSize: responsive.getResponsiveFont(18, {
      small: 16,
      tablet: 20,
    }),
    fontWeight: "bold",
  },
  addToCartTextTablet: {
    fontSize: 20,
  },
};

export default AddToCartButton;