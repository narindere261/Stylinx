import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';

const OrderSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Icon name="checkmark-circle-outline" size={100} color={COLORS.primary} />
      <Text style={styles.title}>Order Completed</Text>
      <Text style={styles.message}>Thank you for your purchase.{'\n'}You can view your order in 'My Orders' section.</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('HomeTab')}
      >
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  message: { textAlign: 'center', color: COLORS.secondary, marginVertical: 15, lineHeight: 22 },
  button: { backgroundColor: COLORS.primary, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});

export default OrderSuccessScreen;