import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productsSlice';
import { responsive } from '../constants/responsive';

import ProductHeader from '../components/ProductHeader';
import ProductInfoSection from '../components/ProductInfoSection';
import ReviewsAndSimilarProducts from '../components/ReviewsAndSimilarProducts';
import AddToCartButton from '../components/AddToCartButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { productId } = route.params;

  const { selectedProduct: product, loading } = useSelector(
    (state) => state.products
  );

  const { isTablet, isLandscape } = responsive.layout;
  const [selectedColor, setSelectedColor] = useState('light-pink');
  const [selectedSize, setSelectedSize] = useState('L');

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (loading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#1E1E1E' 
      }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const currentProduct = product || {
    id: productId || 'fallback',
    title: 'Sportwear Set',
    price: 80.00,
    description: 'Sportswear is no longer under culture, it is no longer inside or outside and together as it was worn. A fashionable day. The top is oversized in fit and style, may need to size down.',
    rating: 4.9,
    reviews: 83,
    images: ['https://images.unsplash.com/photo-1627916960810-9f1e403d52c7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']
  };

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        <ProductHeader 
          navigation={navigation}
          isTablet={isTablet}
          isLandscape={isLandscape}
          imageUri={currentProduct.images?.[0] || currentProduct.image}
  imageArray={currentProduct.images || []}
        />
        
        <ProductInfoSection
          title={currentProduct.title}
          price={currentProduct.price}
          rating={currentProduct.rating}
          reviewCount={currentProduct.reviews}
          description={currentProduct.description}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          onColorSelect={setSelectedColor}
          onSizeSelect={setSelectedSize}
          isTablet={isTablet}
          isLandscape={isLandscape}
        />
        
        <ReviewsAndSimilarProducts
          rating={currentProduct.rating}
          reviewCount={currentProduct.reviews}
          navigation={navigation}
          isTablet={isTablet}
          isLandscape={isLandscape}
        />
        
        <View style={{ height: responsive.verticalScale(100) }} />
      </ScrollView>
      
      <AddToCartButton
        product={currentProduct}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        isTablet={isTablet}
        isLandscape={isLandscape}
      />
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;