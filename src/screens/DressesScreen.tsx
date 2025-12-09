import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DressesHeader from '../components/DressesHeader';
import ProductGrid from '../components/ProductGrid';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';

const DressesScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();

      const formattedData = json.map(item => ({
        id: item.id.toString(),
        title: item.title || 'Untitled Product', 
        price: item.price || 0,
        originalPrice: item.price ? item.price * 1.2 : 0,
        rating: Math.floor(Math.random() * 5) + 1,
        reviews: Math.floor(Math.random() * 100),
        isFavorite: Math.random() > 0.5,
        image: item.images && item.images.length > 0 ? item.images[0] : null,
        images: item.images || [],
        description: item.description || '',
        category: item.category || null,
      }));

      setProducts(formattedData);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchProducts();
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
        <ErrorState 
          error={error} 
          onRetry={handleRefresh}
          onGoBack={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      <View style={styles.container}>
        <DressesHeader 
          navigation={navigation}
          productsCount={products.length}
        />
        
        <ProductGrid 
          products={products}
          loading={loading}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A1A', 
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
};

export default DressesScreen;