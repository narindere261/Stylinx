import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  StatusBar, TouchableWithoutFeedback, Keyboard, Alert
} from 'react-native';

import { useDispatch, useSelector } from "react-redux";
import { clearError, clearLoading, signupUser } from "../redux/slices/authSlice";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { responsive } from '../constants/responsive';

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("All fields required");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    const resultAction = await dispatch(signupUser({ name, email, password }));

    if (signupUser.fulfilled.match(resultAction)) {
      Alert.alert("Signup Successfully");
      setTimeout(() => {
        navigation.navigate("Login");
      }, 900)
    } else {
      Alert.alert(resultAction.payload as string);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(clearError());
      return () => {
        dispatch(clearError())
        dispatch(clearLoading())
      };
    }, [])
  );

  const { isTablet, isLandscape } = responsive.layout;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={responsive.getResponsiveValue(30, {
          small: 20,
          tablet: 40,
          landscape: 20,
        })}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>

            <View style={styles.contentContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerTextLarge}>Create</Text>
                <Text style={styles.headerTextSmall}>your account</Text>
              </View>

              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#FCFCFD"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="#FCFCFD"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#FCFCFD"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  autoComplete="password-new"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm password"
                  placeholderTextColor="#FCFCFD"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  autoComplete="password-new"
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.mainButton,
                    loading && styles.disabledButton
                  ]}
                  activeOpacity={0.8}
                  onPress={handleSignup}
                  disabled={loading}
                >
                  <Text style={styles.mainButtonText}>
                    {loading ? "Please wait..." : "SIGN UP"}
                  </Text>
                </TouchableOpacity>

                {error && (
                  <Text style={styles.errorText}>{error}</Text>
                )}
              </View>
            </View>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Already have account? </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.7}
              >
                <Text style={styles.footerLinkText}>Log In</Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: responsive.verticalScale(100),
    paddingBottom: responsive.verticalScale(40),
    paddingHorizontal: responsive.getResponsiveValue(0, {
      tablet: responsive.spacing.lg,
    }),
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: responsive.spacing.lg,
    gap: responsive.getResponsiveValue(27, {
      small: 20,
      tablet: 40,
      landscape: 20,
    }),
  },
  headerContainer: {
    gap: responsive.spacing.sm,
    marginTop: responsive.getResponsiveValue(0, {
      tablet: responsive.spacing.xl,
    }),
  },
  headerTextLarge: {
    fontSize: responsive.getResponsiveFont(32, {
      small: 28,
      tablet: 36,
      landscape: 28,
    }),
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: responsive.spacing.xs,
    lineHeight: responsive.lineHeight.h1,
  },
  headerTextSmall: {
    fontSize: responsive.getResponsiveFont(24, {
      small: 20,
      tablet: 28,
      landscape: 22,
    }),
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: responsive.lineHeight.h3,
  },
  formContainer: {
    marginVertical: responsive.getResponsiveValue(30, {
      small: 20,
      tablet: 40,
      landscape: 25,
    }),
  },
  input: {
    height: responsive.verticalScale(50),
    color: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#B1B5C3',
    fontSize: responsive.getResponsiveFont(16, {
      small: 14,
      tablet: 18,
      landscape: 15,
    }),
    marginBottom: responsive.verticalScale(20),
    paddingVertical: responsive.spacing.sm,
    paddingHorizontal: 0,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: responsive.verticalScale(20),
    marginTop: responsive.spacing.md,
  },
  mainButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: responsive.verticalScale(16),
    paddingHorizontal: responsive.scale(20),
    borderRadius: responsive.scale(30),
    width: responsive.getResponsiveValue('45%', {
      small: '50%',
      tablet: '35%',
      landscape: '40%',
    }),
    minWidth: responsive.scale(140),
    maxWidth: responsive.scale(200),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.6,
  },
  mainButtonText: {
    color: '#000000',
    fontSize: responsive.getResponsiveFont(16, {
      small: 14,
      tablet: 18,
      landscape: 15,
    }),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: responsive.verticalScale(30),
    alignItems: 'center',
    paddingHorizontal: responsive.spacing.md,
  },
  footerText: {
    color: '#888888',
    fontSize: responsive.getResponsiveFont(14, {
      small: 12,
      tablet: 16,
      landscape: 13,
    }),
  },
  footerLinkText: {
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(14, {
      small: 12,
      tablet: 16,
      landscape: 13,
    }),
    fontWeight: '700',
    marginLeft: responsive.spacing.xs,
  },
  errorText: {
    color: "red",
    marginTop: responsive.spacing.sm,
    fontSize: responsive.fontSize.bodySmall,
    textAlign: 'center',
    paddingHorizontal: responsive.spacing.md,
  },
});

export default SignUpScreen;