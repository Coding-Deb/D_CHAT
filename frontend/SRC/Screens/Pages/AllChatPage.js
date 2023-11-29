import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'; // Import the icon from the vector icon library
import BottomTab from '../../Components/BottomTab';
import Context from '../../Context/Context';
import TopTab from '../../Components/TopTab';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function AllChatPage() {
  const { background_color, text_color } = useContext(Context);
  const navigation = useNavigation()
  const [usernames, setUsernames] = useState([]);
  useEffect(() => {
    // Fetch the username using the token
    const fetchUsername = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Replace with the actual token

        // Make a request to your server's endpoint
        const response = await axios.get('http://192.168.157.210:5000/api/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsernames(response.data.usernames);
        console.log(usernames);
      } catch (error) {
        console.error('Error fetching username:', error.message);
        // Handle errors as needed
      }
    };

    // Call the fetchUsername function when the component mounts
    fetchUsername();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <View style={[styles.container, { backgroundColor: background_color }]}>
      <TopTab page={'Allchat'} />
      <View style={{ justifyContent: 'space-between', height: height - 130 }}>
        <View style={styles.inputbox}>
          
        </View>
        <BottomTab page={'Allchat'} />

        {/* Floating button */}
        <TouchableOpacity
          style={[styles.floatingButton, { backgroundColor: text_color }]}
          onPress={() => { navigation.navigate('UserName') }}
        >
          <Feather name="plus" size={30} color={background_color} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    width: width - 30,
    height: 50,
    backgroundColor: '#DCDCDC',
    borderRadius: 24,
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: '600',

  },
  inputbox: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: height / 7,
    right: width / 12,
    borderRadius: 12,
    padding: 10,
    elevation: 5,
  },
});
