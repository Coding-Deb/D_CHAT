import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatsCards({ senderId, receiverId }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://192.168.157.210:5000/api/auth/receiveChats', {
          params: {
            senderId: senderId,
            receiverId: '656ac7e03b6af8bd981d36d6',
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setChats(response.data.chats);

      } catch (error) {
        console.error('Error fetching chats:', error.message);
      }
    };

    fetchChats();
  }, []);

  return (
    <View>
      {
        chats && chats.length > 0 ? (
          chats.map((item) => (
            <View key={item._id}>
              <Text>
                {item.message}
              </Text>
            </View>
          ))
        ) : (
          <Text>No chats available</Text>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({});
