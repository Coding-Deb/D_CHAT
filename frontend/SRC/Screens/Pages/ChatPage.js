import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Context from '../../Context/Context';
import TopTab from '../../Components/TopTab';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ChatsCards from '../../Components/ChatsCards';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function ChatPage() {
  const { text_color, background_color } = useContext(Context);
  const Route = useRoute();
  const [username, setUsername] = useState('');
  const [chat, setChat] = useState('');
  const [chats, setChats] = useState([]);
  const id = Route.params.id;
  const Username = Route.params.username;

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://192.168.157.210:5000/api/auth/login', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsername(response.data);
        // console.log(response.data);
        // Fetch chats once the username is obtained
      } catch (error) {
        console.error('Error fetching username:', error.message);
      }
    };

    fetchUsername();
  }, []);

  

  const sendChat = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        'http://192.168.157.210:5000/api/auth/send_chat',
        {
          senderId: username.logged_id, // Assuming username.logged_id is the correct senderId
          receiverId: id,
          message: chat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setChat('');
      // After sending the chat, fetch the updated chats if needed
      // fetchChats();
    } catch (error) {
      console.error('Chat Send failed:', error);
    }
  };
  

  return (
    <View style={[styles.container, { backgroundColor: background_color }]}>
      <TopTab page={'Chat'} name={Username} id={id} />
      <View style={{ backgroundColor: '#DCDCDC', padding: 20, marginVertical: 10, borderRadius: 10 }}>
        <Text style={{ fontSize: 18, color: '#333' }}>
          {username.username}
        </Text>
         <Text style={{ fontSize: 18, color: '#333' }}>
          {Username}
        </Text>
        
        <ChatsCards senderId={username.logged_id} receiverId={id}/>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 }}>
        <TextInput
          style={[styles.input]}
          placeholder='Search Here ...'
          placeholderTextColor='#888'
          value={chat}
          onChangeText={(text) => { setChat(text); }}
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
    padding: 10,
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
  },
  bottomsheetbtn: {
    borderRadius: 22,
    padding: 12,
    marginLeft: 0,
  },
});
