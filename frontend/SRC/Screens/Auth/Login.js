import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon, Input, Button } from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateInputs = () => {
    let isValid = true;

    // Email validation
    if (!email || !email.includes('@')) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    } 

    // Password validation
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  }; 

  const handleLogin = async () => {
    if (validateInputs()) {
      try {
        const response = await axios.post('http://192.168.157.210:5000/api/auth/login', { email, password });
        const token = response.data.token;
        await AsyncStorage.setItem('token', token);
        navigation.navigate('AllChat');
        setEmail('')
        setPassword('')
        console.log(token);
      } catch (error) {
        console.log(error);
      }
      
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>D CHAT</Text>
      <Input
        placeholder="Email"
        leftIcon={<Icon name="email" type="material" size={24} />}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <Input
        placeholder="Password"
        secureTextEntry
        leftIcon={<FontAwesome name="lock" size={24} />}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <Pressable style={styles.btn} >
        <Text style={styles.btntext} onPress={handleLogin}>Login</Text>
      </Pressable>
      <Button
        title="Don't have an account? Sign Up"
        type="clear"
        onPress={() => {
          setEmail('')
          setPassword('')
          navigation.navigate('Register')
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 35,
    color: '#305F96',
    fontWeight: 'bold',
  },
  btn: {
    height: 55,
    width: width / 2,
    backgroundColor: '#305F96',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    marginVertical: 10,
  },
  btntext: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});
