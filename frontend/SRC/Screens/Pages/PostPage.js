import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from '../../Context/Context';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

export default function PostPage() {
    const [postdata, setPostdata] = useState('');
    const [username, setUsername] = useState('');
    const { background_color, text_color } = useContext(Context)
    const maxLength = 1000
    const navigation = useNavigation()
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
        
        // Call the function to fetch chats when needed
        
        
        
        // Call the fetchUsername function when the component mounts
        fetchUsername();
        // getChats();
          // fetchChat()
        }, []); // The empty dependency array ensures that this effect runs once when the component mounts
    const handleUpdate = async () => {
        try {
            // Get the token from your authentication flow (e.g., AsyncStorage)
            const token = await AsyncStorage.getItem('token');

            if (!postdata || postdata.length>maxLength) {
                navigation.navigate('Posts')
            } else {
                
            }
            // Make the API request to update the user
            const response = await axios.post(
                'http://192.168.157.210:5000/api/auth/send_post',
                { 
                    userId: username,
                    postText:postdata 
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Handle success
            console.log(response.data.post.postText);
            setPostdata('')
            navigation.navigate('AllPost')
        } catch (error) {
            // Handle error
            console.error('Error updating user:', error);
        }
    };
    return (
        <View style={[styles.container, { backgroundColor: background_color }]}>
            <Text style={{ fontSize: 30, color: text_color, fontWeight: 'bold', marginVertical: 15 }}>
                Send Post
            </Text>
            <View style={{ height:130, width: width / 1.2 , borderRadius:22, backgroundColor:'red' }}>
            <TextInput
                style={{ height:130, width: width / 1.2 , paddingHorizontal: 10, borderRadius:22, fontSize: 18, color: text_color , backgroundColor:'#DCDCDC' }}
                placeholder="Enter New Thought"
                multiline= {true}
                placeholderTextColor={text_color}
                cursorColor={text_color}
                maxLength={maxLength}
                value={postdata}
                onChangeText={(txt) => { setPostdata(txt) }}
            />
            <View style={{backgroundColor:'#DCDCDC',padding:8,position:'absolute',bottom:0,right:0,margin:8,borderRadius:15}}>
                <Text>
                    {postdata.length}/{maxLength}
                </Text>
            </View>
            </View>
            <Pressable style={styles.bottomsheetbtn} onPress={handleUpdate}>
                <Text style={styles.bottomsheetbtntxt}>
                    Post
                </Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomsheetbtn: {
        backgroundColor: '#305F96',
        borderRadius: 14,
        margin: 10,
        padding: 10,
        width: width / 1.4
      },
      bottomsheetbtntxt: {
        fontSize: 22,
        color: '#FFF5EE',
        textAlign: 'center',
        fontWeight: 'bold',
        
      },
})