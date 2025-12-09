import React, { useState } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, StatusBar 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const FilterScreen = ({ navigation }) => {
  const [priceRange, setPriceRange] = useState({ min: 10, max: 80 });
  const [selectedColor, setSelectedColor] = useState('#D9A046'); // Default Mustard
  const [selectedRating, setSelectedRating] = useState(5);
  
  // Mock Data matching the image
  const COLORS = ['#D9A046', '#D64045', '#1D2432', '#3B575D', '#E8E8E8', '#5D463C', '#EAAEB1'];
  const DISCOUNTS = ['50% off', '40% off', '30% off', '25% off'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#181920" />
      
      {/* 1. HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filter</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="options-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* 2. PRICE RANGE SLIDER (Custom Visual Implementation) */}
        <Text style={styles.label}>Price</Text>
        <View style={styles.sliderContainer}>
           {/* Visual Track */}
           <View style={styles.trackInactive} />
           <View style={styles.trackActive} />
           
           {/* Knobs */}
           <View style={[styles.knob, { left: '10%' }]} /> 
           <View style={[styles.knob, { left: '60%' }]} />

           {/* Labels */}
           <View style={styles.priceLabels}>
             <Text style={styles.priceText}>${priceRange.min}</Text>
             <Text style={styles.priceText}>${priceRange.max}</Text>
           </View>
        </View>

        {/* 3. COLORS */}
        <Text style={styles.label}>Color</Text>
        <View style={styles.colorRow}>
          {COLORS.map((color, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.colorCircle, 
                { backgroundColor: color },
                selectedColor === color && styles.activeColorBorder
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>

        {/* 4. STAR RATING */}
        <Text style={styles.label}>Star Rating</Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => {
            const isActive = selectedRating === star;
            return (
              <TouchableOpacity 
                key={star} 
                style={[styles.starCircle, isActive ? styles.activeStar : styles.inactiveStar]}
                onPress={() => setSelectedRating(star)}
              >
                <Icon name="star" size={12} color={isActive ? "#000" : "#fff"} style={{marginRight: 4}} />
                <Text style={[styles.starText, { color: isActive ? "#000" : "#fff" }]}>{star}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 5. CATEGORY DROPDOWN */}
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity style={styles.dropdown}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
             <Icon name="shirt-outline" size={18} color="#fff" style={{marginRight: 10}} />
             <Text style={styles.dropdownText}>Crop Tops</Text>
          </View>
          <Icon name="chevron-down" size={18} color="#fff" />
        </TouchableOpacity>

        {/* 6. DISCOUNT CHIPS */}
        <Text style={styles.label}>Discount</Text>
        <View style={styles.discountRow}>
          {DISCOUNTS.map((disc, index) => (
            <TouchableOpacity key={index} style={styles.discountChip}>
              <Text style={styles.chipText}>{disc}</Text>
              <Icon name="close" size={14} color="#fff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* 7. APPLY BUTTON (Footer) */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={() => navigation.goBack()}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#181920', padding: 20 },
  
  // Header
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 30,
    marginTop: 10
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },

  // General Text
  label: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 15, marginTop: 10 },

  // Slider (Visual)
  sliderContainer: { height: 60, marginBottom: 10, justifyContent: 'center' },
  trackInactive: { position: 'absolute', top: 20, width: '100%', height: 2, backgroundColor: '#333' },
  trackActive: { position: 'absolute', top: 20, left: '10%', width: '50%', height: 2, backgroundColor: '#fff' },
  knob: { 
    position: 'absolute', top: 11, width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', 
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, elevation: 5
  },
  priceLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 },
  priceText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  // Color Swatches
  colorRow: { flexDirection: 'row', marginBottom: 20 },
  colorCircle: { width: 36, height: 36, borderRadius: 18, marginRight: 15 },
  activeColorBorder: { borderWidth: 2, borderColor: '#fff' },

  // Star Rating
  ratingRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  starCircle: { 
    width: 50, height: 50, borderRadius: 25, 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1 
  },
  activeStar: { backgroundColor: '#fff', borderColor: '#fff' },
  inactiveStar: { backgroundColor: 'transparent', borderColor: '#333' },
  starText: { fontWeight: 'bold', fontSize: 16 },

  // Dropdown
  dropdown: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#181920', borderWidth: 1, borderColor: '#333',
    padding: 15, borderRadius: 30, marginBottom: 20
  },
  dropdownText: { color: '#fff', fontSize: 14 },

  // Discount Chips
  discountRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 },
  discountChip: { 
    flexDirection: 'row', alignItems: 'center', 
    borderColor: '#fff', borderWidth: 1, borderRadius: 20,
    paddingVertical: 10, paddingHorizontal: 16,
    marginRight: 10, marginBottom: 10
  },
  chipText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  // Footer Button
  footer: { position: 'absolute', bottom: 30, left: 20, right: 20 },
  applyButton: { 
    backgroundColor: '#fff', 
    height: 55, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  applyButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' }
});

export default FilterScreen;