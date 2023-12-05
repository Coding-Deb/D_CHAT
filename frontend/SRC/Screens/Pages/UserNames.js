import { Dimensions, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BottomTab from '../../Components/BottomTab'
import Context from '../../Context/Context'
import TopTab from '../../Components/TopTab'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

export default function UserNames() {
  const { background_color, text_color } = useContext(Context)
  const [usernames, setUsernames] = useState([]);
  const navigation = useNavigation()
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
        console.log(response.data.usernames); // Update this line to log the response data directly
      } catch (error) {
        console.error('Error fetching username:', error.message);
        // Handle errors as needed
      }
    };

    // Call the fetchUsername function when the component mounts
    fetchUsername();
  }, []); // Remove usernames from the dependency array
  return (
    <View style={[styles.container, { backgroundColor: background_color }]}>
      {/* <TopTab page={'UserNames'} /> */}
      {/* <Text style={[styles.text,{color: text_color}]}>AllChat Page</Text> */}
      <View style={{ justifyContent: 'space-between', height: height - 130, marginVertical: 8 }}>
        <View style={styles.main}>
          <TopTab page={'Users'} />
          <FlatList
            data={usernames}
            renderItem={({ item }) => {
              return (
                <Pressable key={item._id} style={{ marginVertical: 10, borderBottomColor: 'grey', borderBottomWidth: 0.5, justifyContent: 'center' }} onPress={() => { navigation.navigate('Chat', { id: item._id, username: item.username }) }}>
                  <Text style={{ fontSize: 18, fontWeight: '800', color: text_color, margin: 12 }}>
                    {item.username}
                  </Text>
                </Pressable>
              )
            }}
          />
        </View>
        {/* <BottomTab page={'UserNames'} /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  main: {
    width: width,
    justifyContent: 'center',
    marginVertical: 8
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
})