import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DressesHeader = ({ navigation, productsCount }) => {
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Products</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <View style={styles.subHeader}>
        <View>
          <Text style={styles.foundLabel}>Found</Text>
          <Text style={styles.resultsCount}>{productsCount} Results</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => console.log('Filter pressed')}
        >
          <Text style={styles.filterText}>Filter</Text>
          <Ionicons 
            name="caret-down-sharp" 
            size={16} 
            color="#FFF" 
            style={{marginLeft: 8}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  foundLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsCount: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterButton: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  filterText: {
    color: '#FFF',
    fontWeight: '600',
  },
};

export default DressesHeader;