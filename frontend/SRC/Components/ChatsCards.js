import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatsCards({ senderId, receiverId }) {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.157.210:5000/api/auth/receiveChats', {
        params: {
          senderId: "656ac7e03b6af8bd981d36d6",
          receiverId: "656c81b03db6e3089fc0c522"
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setChats(response.data.chats);
      console.log(response.data.chats);
      

    } catch (error) {
      console.error('Error fetching chats:', error.message);
    }
  };


  return (
    <View>
      <Text onPress={fetchChats}>
        show
      </Text>
      <FlatList
        data={chats}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
            return (
              <View key={item._id}>
                <Text>
                  {item.message}
                </Text>
              </View>
            )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
