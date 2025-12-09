import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsive } from '../constants/responsive';

const { width } = Dimensions.get('window');

// Rating Stars Component
const RatingStars = ({ rating, reviews }) => {
  return (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star, index) => (
        <Ionicons
          key={index}
          name={star <= rating ? 'star' : 'star-outline'}
          size={responsive.getResponsiveValue(14, { tablet: 16 })}
          color={star <= rating ? '#00C853' : '#888'} 
          style={{ marginRight: 2 }}
        />
      ))}
      <Text style={styles.reviewCount}>({reviews || 0})</Text>
    </View>
  );
};

// Individual Product Card Component
const ProductCard = ({ item, index, numColumns, productCardWidth, toggleWishlist, wishlist, navigation }) => {
  const id = item.id || item?.productId || Math.random().toString();
  const title = item.title || item.name || "";
  const price = item.price ?? item?.price ?? 0;
  const oldPrice = (price * 1.15).toFixed(2);
  const productImage = item.images && item.images.length > 0 
    ? item.images[0] 
    : item.image || 'https://via.placeholder.com/300x300';
  const rating = item.rating || 4.5;
  const reviews = item.reviews || Math.floor(Math.random() * 100);

  return (
    <View style={[
      styles.cardContainer,
      { 
        width: productCardWidth,
        marginRight: (index % numColumns === numColumns - 1) ? 0 : responsive.spacing.md
      }
    ]}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.cardWrapper}
        onPress={() => navigation.navigate("ProductDetails", { productId: id })}
      >
        <View style={styles.imageBackground}>
          <Image 
            source={{ uri: productImage }} 
            style={styles.productImage}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.favoriteIcon}
            onPress={() => toggleWishlist(id)}
          >
            <Ionicons
              name={wishlist[id] ? 'heart' : 'heart-outline'}
              size={responsive.getResponsiveValue(24, { tablet: 28 })}
              color={wishlist[id] ? '#FF3D00' : '#888'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle} numberOfLines={1}>
            {title}
          </Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>
              $ {price.toFixed(2)}
            </Text>
            <Text style={styles.originalPrice}>
              $ {oldPrice}
            </Text>
          </View>

          <RatingStars rating={rating} reviews={reviews} />
          
          {item.category && item.category.name && (
            <Text style={styles.categoryText}>
              {item.category.name}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Main ProductsGrid Component
const ProductsGrid = ({
  products,
  loading,
  error,
  navigation,
}) => {
  const [wishlist, setWishlist] = useState({});
  const { isTablet } = responsive.layout;
  
  // Calculate product card width based on responsive layout
  const getProductCardWidth = () => {
    const screenWidth = responsive.layout.window.width;
    
    if (isTablet) {
      return (screenWidth - responsive.spacing.xxl) / 4; // 3 columns on tablet
    }
    
    return (screenWidth - responsive.spacing.xl) / 2.1; // 2 columns on phone
  };
  
  const productCardWidth = getProductCardWidth();
  const numColumns = isTablet ? 3 : 2;

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getItemLayout = (data, index) => {
    return {
      length: productCardWidth + responsive.spacing.md,
      offset: (productCardWidth + responsive.spacing.md) * Math.floor(index / numColumns),
      index,
    };
  };

  // Loading State
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Error State
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={60} color="#FF6B6B" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Empty State
  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cube-outline" size={80} color="#888" />
        <Text style={styles.emptyText}>No products found</Text>
      </View>
    );
  }

  // Main Grid
  return (
    <View style={styles.productsContainer}>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <ProductCard 
            item={item}
            index={index}
            numColumns={numColumns}
            productCardWidth={productCardWidth}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            navigation={navigation}
          />
        )}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Showing {products.length} products
            </Text>
          </View>
        )}
        key={isTablet ? 'tablet' : 'phone'}
      />
    </View>
  );
};

const styles = {
  // Container Styles
  productsContainer: {
    flex: 1,
    paddingHorizontal: responsive.getResponsiveValue(16, {
      tablet: responsive.spacing.lg,
    }),
  },
  listContent: {
    paddingBottom: responsive.verticalScale(20),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: responsive.verticalScale(24),
  },

  // Card Container
  cardContainer: {
    marginBottom: responsive.spacing.md,
  },
  cardWrapper: {
    width: '100%',
  },

  // Image Section
  imageBackground: {
    backgroundColor: '#F0F0F0', 
    borderRadius: responsive.scale(16),
    height: responsive.getResponsiveValue(220, {
      small: 200,
      tablet: 240,
      landscape: 200,
    }),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden', 
    marginBottom: responsive.spacing.sm,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteIcon: {
    position: 'absolute',
    top: responsive.spacing.sm,
    right: responsive.spacing.sm,
    backgroundColor: '#FFF',
    borderRadius: responsive.scale(15),
    width: responsive.scale(30),
    height: responsive.scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  // Details Section
  detailsContainer: {
    paddingHorizontal: responsive.spacing.xs,
  },
  productTitle: {
    color: '#FFF',
    fontSize: responsive.getResponsiveFont(14, {
      small: 13,
      tablet: 16,
    }),
    fontWeight: '600',
    marginBottom: responsive.spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing.xs,
  },
  currentPrice: {
    color: '#FFF',
    fontSize: responsive.getResponsiveFont(16, {
      small: 15,
      tablet: 18,
    }),
    fontWeight: 'bold',
    marginRight: responsive.spacing.sm,
  },
  originalPrice: {
    color: '#888',
    fontSize: responsive.getResponsiveFont(14, {
      small: 13,
      tablet: 16,
    }),
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing.xs,
  },
  reviewCount: {
    color: '#888',
    fontSize: responsive.getResponsiveFont(12, {
      small: 11,
      tablet: 14,
    }),
    marginLeft: responsive.spacing.xs,
  },
  categoryText: {
    color: '#888',
    fontSize: responsive.getResponsiveFont(12, {
      small: 11,
      tablet: 14,
    }),
    fontStyle: 'italic',
  },

  // Loading State
  loadingContainer: {
    padding: responsive.spacing.lg, 
    alignItems: "center",
    justifyContent: 'center',
    flex: 1,
  },

  // Error State
  errorContainer: {
    padding: responsive.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  errorText: { 
    color: "#FF6B6B",
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }),
    textAlign: 'center',
    marginTop: responsive.spacing.md,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing.lg,
  },
  emptyText: {
    color: '#888',
    fontSize: responsive.getResponsiveFont(18, { tablet: 20 }),
    textAlign: 'center',
    marginTop: responsive.spacing.md,
  },

  // Footer
  footer: {
    paddingVertical: responsive.verticalScale(20),
    alignItems: 'center',
  },
  footerText: {
    color: '#888',
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }),
  },
};

export default ProductsGrid;