import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const RatingStars = ({ rating, reviews }) => {
  return (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star, index) => (
        <Ionicons
          key={index}
          name={star <= rating ? 'star' : 'star-outline'}
          size={14}
          color={star <= rating ? '#00C853' : '#888'} 
          style={{ marginRight: 2 }}
        />
      ))}
      <Text style={styles.reviewCount}>({reviews})</Text>
    </View>
  );
};

const ProductCard = ({ item }) => {
  const productImage = item.images && item.images.length > 0 
    ? item.images[0] 
    : 'https://via.placeholder.com/300x300';

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageBackground}>
        <Image 
          source={{ uri: productImage }} 
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.favoriteIcon}>
          <Ionicons
            name={item.isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={item.isFavorite ? '#FF3D00' : '#888'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title || 'Product Name'}
        </Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.currentPrice}>
            $ {item.price ? item.price.toFixed(2) : '0.00'}
          </Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>
              $ {item.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>

        <RatingStars rating={item.rating} reviews={item.reviews} />
        
        {item.category && item.category.name && (
          <Text style={styles.categoryText}>
            {item.category.name}
          </Text>
        )}
      </View>
    </View>
  );
};

const ProductGrid = ({ products, loading, onRefresh }) => {
  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cube-outline" size={80} color="#888" />
        <Text style={styles.emptyText}>No products found</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductCard item={item} />}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshing={loading}
      onRefresh={onRefresh}
      ListFooterComponent={() => (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Showing {products.length} products
          </Text>
        </View>
      )}
    />
  );
};

const styles = {
  listContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 24, 
  },
  cardContainer: {
    width: cardWidth,
  },
  imageBackground: {
    backgroundColor: '#F0F0F0', 
    borderRadius: 16,
    height: 220, 
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden', 
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  detailsContainer: {
    paddingHorizontal: 4,
  },
  productTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  currentPrice: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  originalPrice: {
    color: '#888',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewCount: {
    color: '#888',
    fontSize: 12,
    marginLeft: 4,
  },
  categoryText: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#888',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  retryText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  },
};

export default ProductGrid;