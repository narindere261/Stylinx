import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const orders = [
  { id: '1', date: '2025-09-20', total: 110, status: 'Delivered', items: 'Sportswear Set x1' },
  { id: '2', date: '2025-08-15', total: 45, status: 'Processing', items: 'Long Sleeve Dress x1' },
];

const MyOrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
               <Text style={styles.id}>Order #{item.id}</Text>
               <Text style={[styles.status, { color: item.status === 'Delivered' ? 'green' : 'orange' }]}>{item.status}</Text>
            </View>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.items}>{item.items}</Text>
            <Text style={styles.total}>Total: ${item.total}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 10, marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  id: { fontWeight: 'bold', fontSize: 16 },
  status: { fontWeight: 'bold' },
  date: { color: COLORS.secondary, marginBottom: 10 },
  items: { fontSize: 14, marginBottom: 5 },
  total: { fontWeight: 'bold', fontSize: 16, color: COLORS.primary, marginTop: 5 }
});

export default MyOrdersScreen;