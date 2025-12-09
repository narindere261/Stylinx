import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsive } from '../constants/responsive';

const InputField = React.memo(React.forwardRef(({
  label,
  value,
  placeholder,
  error,
  required,
  onChangeText,
  keyboardType = 'default',
  maxLength,
  secureTextEntry = false,
  returnKeyType = 'next',
  onSubmitEditing,
  blurOnSubmit = false,
  style,
  editable = true,
  onPress,
}, ref) => {
  const { isTablet } = responsive.layout;
  
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[
        styles.inputLabel,
        isTablet && styles.inputLabelTablet,
      ]}>
        {label} {required && <Text style={{ color: '#508A7B' }}>*</Text>}
      </Text>
      {editable ? (
        <TextInput
          ref={ref}
          style={[
            styles.inputBox,
            isTablet && styles.inputBoxTablet,
            error && styles.inputBoxError,
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          autoCapitalize="none"
          autoCorrect={false}
        />
      ) : (
        <TouchableOpacity 
          style={[
            styles.inputBox, 
            styles.dropdownInput, 
            isTablet && styles.inputBoxTablet,
            error && styles.inputBoxError,
          ]} 
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.inputText, 
            isTablet && styles.inputTextTablet,
            !value && { color: '#A0A0A0' }
          ]}>
            {value || placeholder}
          </Text>
          <Ionicons 
            name="chevron-down" 
            size={responsive.getResponsiveValue(20, { tablet: 22 })} 
            color="#A0A0A0" 
          />
        </TouchableOpacity>
      )}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
}));

const styles = {
  inputContainer: { 
    marginBottom: responsive.verticalScale(15) 
  },
  inputLabel: { 
    color: '#A0A0A0', 
    fontSize: responsive.getResponsiveFont(14, { tablet: 16 }), 
    marginBottom: responsive.spacing.xs,
    fontWeight: '500',
  },
  inputLabelTablet: {
    fontSize: 16,
  },
  inputBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }),
    paddingVertical: responsive.verticalScale(10),
    paddingHorizontal: 0,
  },
  inputBoxTablet: {
    fontSize: 18,
    paddingVertical: responsive.verticalScale(12),
  },
  inputBoxError: { 
    borderBottomColor: '#FF4C4C' 
  },
  errorText: { 
    color: '#FF4C4C', 
    fontSize: responsive.getResponsiveFont(12, { tablet: 14 }), 
    marginTop: responsive.spacing.xs 
  },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: { 
    color: '#FFFFFF', 
    fontSize: responsive.getResponsiveFont(16, { tablet: 18 }) 
  },
  inputTextTablet: {
    fontSize: 18,
  },
};

export default InputField;