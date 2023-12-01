import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from '../../Context/Context';

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

export default function UpdatePage() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const {background_color,text_color} = useContext(Context)
    const handleuserNameChange = (text) => {
        setUsername(text);
      };
      const handlePasswordChange = (text) => {
        setPassword(text);
      };

      const handleUpdate = async () => {
        try {
          // Get the token from your authentication flow (e.g., AsyncStorage)
          const token = await AsyncStorage.getItem('token');
    
          // Make the API request to update the user
          const response = await axios.put(
            'http://192.168.157.210:5000/api/auth/update',
            { username, password },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          // Handle success
          console.log(response.data.message);
        } catch (error) {
          // Handle error
          console.error('Error updating user:', error.message);
        }
      };
      
    return (
        <View style={[styles.container,{backgroundColor: background_color}]}>
            <Text style={{fontSize:30,color:text_color,fontWeight:'bold',marginVertical:15}}>
                Update Profile
            </Text>
            <TextInput
                style={{ height: 40, width: width / 1.2, margin: 10, padding: 10, borderBottomWidth: 2, borderBottomColor: text_color, fontSize: 18,color: text_color }}
                placeholder="Enter New Username"
                placeholderTextColor={text_color}
                cursorColor={text_color}
                value={username}
                onChangeText={handleuserNameChange}
            />
            <TextInput
                style={{ height: 40, width: width / 1.2, margin: 10, padding: 10, borderBottomWidth: 2, borderBottomColor: text_color, fontSize: 18,color: text_color}}
                placeholder="Enter New Password"
                placeholderTextColor={text_color}
                cursorColor={text_color}
                secureTextEntry={true}
                value={password}
                onChangeText={handlePasswordChange}
            />
            <Pressable style={styles.bottomsheetbtn} onPress={handleUpdate}>
              <Text style={styles.bottomsheetbtntxt}>
                Update
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