import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { decreaseQty, increaseQty, removeFromCart } from '../redux/slices/cartSlice';
import { responsive } from '../constants/responsive';

const CartItemsList = ({ cartItems, isTablet }) => {
  const dispatch = useDispatch();

  const handleQuantity = (id, type) => {
    if (type === 'increase') dispatch(increaseQty(id));
    else dispatch(decreaseQty(id));
  };

  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id));
    Alert.alert('Removed', `${title} has been removed from your cart.`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      </View>

      <View style={styles.productDetails}>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => handleRemove(item.id, item.title)}
        >
          <Ionicons 
            name="trash" 
            size={responsive.getResponsiveValue(24, { tablet: 28 })} 
            color="#508A7B" 
          />
        </TouchableOpacity>
        
        <View style={styles.topRow}>
          <Text numberOfLines={isTablet ? 1 : 2} style={styles.productTitle}>
            {item.title}
          </Text>
        </View>

        <Text style={styles.productPrice}>$ {item.price.toFixed(2)}</Text>
        <Text style={styles.productSizeColor}>Size: L  |  Color: Cream</Text>

        <View style={styles.quantityWrapper}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => handleQuantity(item.id, 'decrease')}
              style={styles.qtyButton}
            >
              <Ionicons 
                name="remove" 
                size={responsive.getResponsiveValue(16, { tablet: 18 })} 
                color="#E6E8EC" 
              />
            </TouchableOpacity>

            <Text style={styles.qtyText}>{item.quantity}</Text>

            <TouchableOpacity
              onPress={() => handleQuantity(item.id, 'increase')}
              style={styles.qtyButton}
            >
              <Ionicons 
                name="add" 
                size={responsive.getResponsiveValue(16, { tablet: 18 })} 
                color="#E6E8EC" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={cartItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = {
  listContent: { 
    padding: responsive.getResponsiveValue(20, {
      small: 16,
      tablet: 30,
      landscape: 16,
    }) 
  },
  cartItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#141416',
    borderRadius: responsive.scale(24),
    marginBottom: responsive.getResponsiveValue(20, {
      tablet: 25,
      landscape: 15,
    }),
    alignItems: 'center',
    minHeight: responsive.verticalScale(110),
  },
  imageContainer: { 
    backgroundColor: '#F0F0F0', 
    borderTopLeftRadius: responsive.scale(20),
    borderBottomLeftRadius: responsive.scale(20), 
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  productImage: { 
    width: responsive.getResponsiveValue(100, {
      small: 90,
      tablet: 130,
      landscape: 90,
    }), 
    height: responsive.verticalScale(110),
    resizeMode: 'cover' 
  },
  productDetails: { 
    flex: 1, 
    marginLeft: responsive.getResponsiveValue(16, {
      tablet: 20,
    }), 
    height: responsive.verticalScale(110), 
    justifyContent: 'space-between',
    paddingVertical: responsive.getResponsiveValue(15, {
      tablet: 18,
    }),
    paddingRight: responsive.spacing.md,
  },
  removeButton: {
    position: 'absolute',
    top: responsive.getResponsiveValue(10, { tablet: 12 }),
    right: responsive.getResponsiveValue(10, { tablet: 15 }),
    zIndex: 1,
  },
  topRow: { 
    width: '70%', 
    paddingRight: responsive.spacing.lg,
  },
  productTitle: { 
    fontSize: responsive.getResponsiveFont(13, {
      small: 12,
      tablet: 15,
      landscape: 12,
    }), 
    fontWeight: 'bold', 
    color: '#E6E8EC',
    lineHeight: responsive.getResponsiveValue(18, {
      tablet: 22,
    }),
  },
  productPrice: { 
    fontSize: responsive.getResponsiveFont(15, {
      small: 14,
      tablet: 18,
      landscape: 14,
    }), 
    fontWeight: 'bold', 
    color: '#E6E8EC', 
    marginTop: responsive.spacing.xs 
  },
  productSizeColor: {
    fontSize: responsive.getResponsiveFont(12, {
      small: 11,
      tablet: 14,
      landscape: 11,
    }),
    color: '#A0A0A0',
    marginTop: responsive.spacing.xs,
  },
  quantityWrapper: { 
    position: 'absolute',
    bottom: responsive.getResponsiveValue(10, { tablet: 12 }),
    right: responsive.getResponsiveValue(10, { tablet: 15 }),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181A20',
    borderRadius: responsive.scale(20),
    paddingVertical: responsive.getResponsiveValue(3, { tablet: 5 }),
    paddingHorizontal: responsive.getResponsiveValue(3, { tablet: 5 }),
    borderWidth: 1,
    borderColor: '#E6E8EC',
    minWidth: responsive.scale(100),
  },
  qtyButton: { 
    paddingHorizontal: responsive.getResponsiveValue(5, { tablet: 8 }) 
  },
  qtyText: { 
    color: '#E6E8EC', 
    fontSize: responsive.getResponsiveFont(14, {
      small: 13,
      tablet: 16,
    }), 
    fontWeight: '600', 
    marginHorizontal: responsive.getResponsiveValue(10, { tablet: 12 }) 
  },
};

export default CartItemsList;