import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadingState = () => {
  return (
    <SafeAreaView style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#1A1A1A' 
    }}>
      <ActivityIndicator size="large" color="#FFF" />
      <Text style={{ color: '#FFF', marginTop: 10 }}>Loading products...</Text>
    </SafeAreaView>
  );
};

export default LoadingState;