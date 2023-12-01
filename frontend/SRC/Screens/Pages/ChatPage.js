import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Context from '../../Context/Context';
import TopTab from '../../Components/TopTab';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function ChatPage() {
  const { text_color, background_color } = useContext(Context);
  const Route = useRoute()
  const [username, setUsername] = useState('');
  const [chat, setChat] = useState('');
  const [getchat, setGetchat] = useState('');
  const id = Route.params.id
  useEffect(() => {
    // Fetch the username using the token
    const fetchUsername = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Replace with the actual token

        // Make a request to your server's endpoint
        const response = await axios.get('http://192.168.157.210:5000/api/auth/login', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsername(response.data.logged_id);
      } catch (error) {
        console.error('Error fetching username:', error.message);
        // Handle errors as needed
      }
    };

    // const fetchChat = async () => {
    //       try {
    //         const token = await AsyncStorage.getItem('token'); // Replace with the actual token

    //         // Make a request to your server's endpoint
    //         const response = await axios.get("http://192.168.157.210:5000/api/auth/get_chats", {
    //           senderId: username,
    //           receiverId: id,
    //         }, {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         });

    //         setGetchat(response.data.message.message);
    //       } catch (error) {
    //         console.error('Error fetching username:', error.message);
    //         // Handle errors as needed
    //       }
    //     };

      // Call the fetchUsername function when the component mounts
      fetchUsername();
      // fetchChat()
    }, []); // The empty dependency array ensures that this effect runs once when the component mounts


  const sendChat = async () => {
    try {
      await axios.post('http://192.168.157.210:5000/api/auth/send_chat', {
        senderId: username,
        receiverId: id,
        message: chat
      });
      setChat('')
      console.log(chat);
    } catch (error) {
      console.error('Chat Send failed:', error);
      // Handle specific error cases if needed
    }
  }
  return (
    <View style={[styles.container, { backgroundColor: background_color }]}>
      <TopTab page={'Chat'} />
      <View style={{ backgroundColor: '#DCDCDC', padding: 20, marginVertical: 10, borderRadius: 10 }}>
        <Text style={{ fontSize: 18, color: '#333' }}>
          {username}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 }}>
        <TextInput
          style={[styles.input]}
          placeholder='Search Here ...'
          placeholderTextColor='#888'
          value={chat}
          onChangeText={(text) => { setChat(text) }}
        />
        <Pressable style={[styles.bottomsheetbtn, { backgroundColor: '#305F96' }]} onPress={sendChat}>
          <Feather name='send' size={25} color='white' />
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10, // Add padding to the container for a consistent spacing
  },
  usernameContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#EFEFEF',
    borderRadius: 24,
    width: width - 60,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    // marginHorizontal:15
  },
  bottomsheetbtn: {
    // Add a background color to the Send button
    borderRadius: 22, // Make it circular
    padding: 12,
    marginLeft: 0, // Add some spacing between the input and the button
  },
});
