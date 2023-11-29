import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingPage() {
  const navigation = useNavigation()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check AsyncStorage for the token during app initialization
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Token is present, consider the user as authenticated
          setIsAuthenticated(true);
          // Navigate to 'AllChat' if authenticated
          setTimeout(() => {
            navigation.navigate('AllChat')
          }, 3000);
        } else {
          // Token is not present, navigate to 'Login'
          setTimeout(() => {
            navigation.navigate('Login')
          }, 3000);
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };

    checkToken();
  }, []); // Run this effect only once during component mount

  return (
    <View style={styles.container}>
      <Text>OnboardingPage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
