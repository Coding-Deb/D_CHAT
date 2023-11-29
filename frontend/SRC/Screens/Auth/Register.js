import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon, Input, Button } from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function Register() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // const handleRegister = () => {
  //   // Basic validation
  //   if (!email || !username || !password || !confirmPassword) {
  //     alert('Please fill in all the fields');
  //     return;
  //   }

  //   // You can add more specific validation here if needed

  //   // If all validations pass, navigate to the next screen
  //   navigation.navigate('Home');
  // };
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

  const handleRegister = async () => {
    if (validateInputs()) {
      try {
        const response = await axios.post('http://192.168.157.210:5000/api/auth/register', {
          email,
          username,
          password,
        });
        navigation.navigate('Login');
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        console.log('User Registered');
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle specific error cases if needed
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>D CHAT</Text>
      <Input
        placeholder="Email"
        leftIcon={<Icon name="email" type="material" size={24} />}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Input
        placeholder="Username"
        leftIcon={<FontAwesome name="user" size={24} />}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        leftIcon={<FontAwesome name="lock" size={24} />}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Input
        placeholder="Confirm Password"
        secureTextEntry
        leftIcon={<FontAwesome name="lock" size={24} />}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <Pressable style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btntext}>Register</Text>
      </Pressable>
      <Button
        title="Already have an account? Sign In"
        type="clear"
        onPress={() => navigation.navigate('Login')}
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
    height: 70,
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
});
