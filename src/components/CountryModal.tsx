import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsive } from '../constants/responsive';

const COUNTRIES = [
  { code: 'VN', name: 'Vietnam' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'TH', name: 'Thailand' },
  { code: 'PH', name: 'Philippines' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IN', name: 'India' },
  { code: 'CN', name: 'China' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
];

const CountryModal = ({ visible, onClose, onSelectCountry, selectedCountry }) => {
  const { isTablet } = responsive.layout;
  const modalHeight = responsive.verticalScale(500);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[
          styles.modalContent,
          { maxHeight: modalHeight, minHeight: modalHeight * 0.7 }
        ]}>
          <View style={styles.modalHeader}>
            <Text style={[
              styles.modalTitle,
              isTablet && styles.modalTitleTablet,
            ]}>Select Country</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons 
                name="close" 
                size={responsive.getResponsiveValue(24, { tablet: 28 })} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={COUNTRIES}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.countryItem,
                  isTablet && styles.countryItemTablet,
                ]}
                onPress={() => onSelectCountry(item.name)}
              >
                <Text style={[
                  styles.countryName,
                  isTablet && styles.countryNameTablet,
                ]}>{item.name}</Text>
                {selectedCountry === item.name && (
                  <Ionicons 
                    name="checkmark" 
                    size={responsive.getResponsiveValue(20, { tablet: 24 })} 
                    color="#508A7B" 
                  />
                )}
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={true}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: responsive.scale(20),
    borderTopRightRadius: responsive.scale(20),
    paddingTop: responsive.verticalScale(20),
    paddingBottom: responsive.verticalScale(40),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    paddingBottom: responsive.verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    marginBottom: responsive.spacing.sm,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(18, { tablet: 22 }),
    fontWeight: '600',
  },
  modalTitleTablet: {
    fontSize: 22,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
    paddingVertical: responsive.verticalScale(15),
  },
  countryItemTablet: {
    paddingHorizontal: 30,
    paddingVertical: responsive.verticalScale(18),
  },
  countryName: {
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }),
  },
  countryNameTablet: {
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginHorizontal: responsive.getResponsiveValue(20, { tablet: 30 }),
  },
};

export default CountryModal;