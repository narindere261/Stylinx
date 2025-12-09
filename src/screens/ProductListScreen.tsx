import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';
import { filterProducts } from '../services/api';

const ProductListScreen = ({ route, navigation }) => {
  const { categoryId, query, title } = route.params || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [categoryId, query]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Build API params based on route args
      const params = {};
      if (categoryId) params.categoryId = categoryId;
      if (query) params.title = query;
      
      const res = await filterProducts(params);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.rating}>★ 4.8</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      [cite_start]{/* Header [cite: 144-149] */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title || 'Products'}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Icon name="options-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      [cite_start]{/* Results Count [cite: 147-148] */}
      <View style={styles.subHeader}>
        <Text style={styles.foundText}>Found {products.length} Results</Text>
        <TouchableOpacity style={styles.filterChip} onPress={() => navigation.navigate('Filter')}>
          <Text style={styles.filterText}>Filter</Text>
          <Icon name="chevron-down" size={12} color="#fff" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  subHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  foundText: { fontSize: 20, fontWeight: 'bold' },
  filterChip: { flexDirection: 'row', backgroundColor: '#000', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20, alignItems: 'center' },
  filterText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  card: { width: '47%', marginBottom: 20 },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10, backgroundColor: '#f0f0f0' },
  title: { fontSize: 14, fontWeight: '500', marginBottom: 5 },
  price: { fontSize: 16, fontWeight: 'bold' },
  rating: { fontSize: 12, color: COLORS.secondary }
});

export default ProductListScreen;