import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform
} from 'react-native';

import { useDispatch, useSelector } from "react-redux";
import { clearError, clearLoading, loginUser } from "../redux/slices/authSlice";
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { responsive } from '../constants/responsive';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Email & password required");
      return;
    }

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((res) => {
        if (res.token) {
          Alert.alert(res.message || "Login Successfully");
          setTimeout(() => {
            navigation.replace("Home");
          }, 900)
        } else {
          Alert.alert(res.message || "Login failed");
        }
      })
      .catch((err) => {
        Alert.alert("Login failed: " + err);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(clearError());
      return () => {
        dispatch(clearError());
        dispatch(clearLoading());
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={responsive.getResponsiveValue(30, {
          small: 20,
          tablet: 40
        })}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>

            <View style={styles.contentContainer}>

              <View style={styles.headerContainer}>
                <Text style={styles.headerTextLarge}>Log into</Text>
                <Text style={styles.headerTextSmall}>your account</Text>
              </View>

              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="#FCFCFD"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#FCFCFD"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                {error && (
                  <Text style={styles.errorText}>
                    {error}
                  </Text>
                )}
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  disabled={loading}
                  style={[
                    styles.mainButton,
                    loading && styles.disabledButton
                  ]}
                  activeOpacity={0.8}
                  onPress={handleLogin}
                >
                  <Text style={styles.mainButtonText}>
                    {loading ? "Loading..." : "LOGIN"}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate("Signup")}
                activeOpacity={0.7}
              >
                <Text style={styles.footerLinkText}>Sign Up</Text>
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
    paddingBottom: responsive.verticalScale(40),
    paddingTop: responsive.verticalScale(100),
    justifyContent: 'space-between',
    paddingHorizontal: responsive.getResponsiveValue(0, {
      tablet: responsive.spacing.lg,
    }),
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: responsive.spacing.lg,
    gap: responsive.getResponsiveValue(35, {
      small: 25,
      tablet: 50,
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
    marginVertical: responsive.getResponsiveValue(40, {
      small: 30,
      tablet: 50,
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
    paddingHorizontal: responsive.scale(60),
    borderRadius: responsive.scale(30),
    alignItems: 'center',
    width: responsive.getResponsiveValue('auto', {
      tablet: responsive.scale(300),
    }),
    minWidth: responsive.scale(200),
  },
  disabledButton: {
    opacity: 0.6,
  },
  mainButtonText: {
    color: '#000000',
    fontSize: responsive.getResponsiveFont(16, {
      small: 14,
      tablet: 18,
    }),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: responsive.verticalScale(40),
    alignItems: 'center',
    paddingHorizontal: responsive.spacing.md,
  },
  footerText: {
    color: '#FCFCFD',
    fontSize: responsive.getResponsiveFont(14, {
      small: 12,
      tablet: 16,
    }),
  },
  footerLinkText: {
    color: '#FFFFFF',
    fontSize: responsive.getResponsiveFont(14, {
      small: 12,
      tablet: 16,
    }),
    fontWeight: '700',
    marginLeft: responsive.spacing.xs,
  },
  errorText: {
    color: "red",
    marginTop: responsive.spacing.sm,
    fontSize: responsive.fontSize.bodySmall,
    textAlign: 'center',
  },
});

export default LoginScreen;