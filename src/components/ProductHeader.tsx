import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsive } from '../constants/responsive';

const { width } = Dimensions.get("window");

const DEFAULT_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1627916960810-9f1e403d52c7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ProductHeader = ({ 
  navigation, 
  isTablet, 
  isLandscape, 
  imageUri, // New prop for dynamic image
  imageArray = [] // Optional: array of images for multiple image support
}) => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For multiple images

  // Use dynamic image if provided, otherwise use default
  const imageSource = imageUri || DEFAULT_PRODUCT_IMAGE;
  
  // If imageArray is provided, use it for image dots
  const images = imageArray.length > 0 ? imageArray : [imageSource];
  const showDots = images.length > 1;

  // Handle next/previous image if multiple images
  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <View style={[
      styles.imageContainer,
      isTablet && styles.imageContainerTablet,
      isLandscape && styles.imageContainerLandscape,
    ]}>
      <Image 
        source={{ uri: images[currentImageIndex] }} 
        style={[
          styles.productImage,
          isTablet && styles.productImageTablet,
        ]} 
        resizeMode="cover" 
      />
      
      <View style={[
        styles.headerOverlay,
        isTablet && styles.headerOverlayTablet,
        isLandscape && styles.headerOverlayLandscape,
      ]}>
        <TouchableOpacity
          style={[styles.iconButton, isTablet && styles.iconButtonTablet]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="chevron-back" 
            size={responsive.getResponsiveValue(24, { tablet: 28 })} 
            color="#FCFCFD" 
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.iconLoveButton, isTablet && styles.iconButtonTablet]}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={responsive.getResponsiveValue(24, { tablet: 28 })}
            color={isFavorite ? "#FF3D00" : "#000"}
          />
        </TouchableOpacity>
      </View>
      
      {/* Image navigation arrows (only show if multiple images) */}
      {showDots && currentImageIndex > 0 && (
        <TouchableOpacity
          style={[styles.navArrow, styles.leftArrow]}
          onPress={handlePrevImage}
        >
          <Ionicons 
            name="chevron-back" 
            size={responsive.getResponsiveValue(20, { tablet: 24 })} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      )}
      
      {showDots && currentImageIndex < images.length - 1 && (
        <TouchableOpacity
          style={[styles.navArrow, styles.rightArrow]}
          onPress={handleNextImage}
        >
          <Ionicons 
            name="chevron-forward" 
            size={responsive.getResponsiveValue(20, { tablet: 24 })} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      )}
      
      {/* Image dots indicator */}
      {showDots && (
        <View style={styles.imageDots}>
          {images.map((_, index) => (
            <View 
              key={index}
              style={[
                styles.dot,
                currentImageIndex === index && styles.dotActive
              ]} 
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = {
  imageContainer: {
    height: responsive.getResponsiveValue(width * 1.25, {
      tablet: width * 1.1,
      landscape: width * 0.9,
    }),
    width: '100%',
    position: "relative",
    backgroundColor: 'black'
  },
  imageContainerTablet: {
    height: width * 1.1,
  },
  imageContainerLandscape: {
    height: width * 0.9,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: responsive.scale(30),
    borderBottomRightRadius: responsive.scale(30),
  },
  productImageTablet: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerOverlay: {
    position: "absolute",
    top: responsive.verticalScale(60),
    left: responsive.getResponsiveValue(30, { tablet: 40 }),
    right: responsive.getResponsiveValue(30, { tablet: 40 }),
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  headerOverlayTablet: {
    top: responsive.verticalScale(60),
  },
  headerOverlayLandscape: {
    top: responsive.verticalScale(40),
  },
  iconButton: {
    width: responsive.getResponsiveValue(40, { tablet: 48 }),
    height: responsive.getResponsiveValue(40, { tablet: 48 }),
    borderRadius: responsive.scale(20),
    backgroundColor: "#141416",
    justifyContent: "center",
    alignItems: "center",
  },
  iconLoveButton: {
    width: responsive.getResponsiveValue(40, { tablet: 48 }),
    height: responsive.getResponsiveValue(40, { tablet: 48 }),
    borderRadius: responsive.scale(20),
    backgroundColor: "#FFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4
  },
  iconButtonTablet: {
    borderRadius: 24,
  },
  navArrow: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  leftArrow: {
    left: responsive.spacing.sm,
  },
  rightArrow: {
    right: responsive.spacing.sm,
  },
  imageDots: {
    position: 'absolute',
    bottom: responsive.verticalScale(20),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  dot: {
    width: responsive.getResponsiveValue(8, { tablet: 10 }),
    height: responsive.getResponsiveValue(8, { tablet: 10 }),
    borderRadius: responsive.scale(4),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: responsive.spacing.xs,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: responsive.getResponsiveValue(12, { tablet: 14 }),
  },
};

export default ProductHeader;