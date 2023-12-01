import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BottomTab from '../../Components/BottomTab'
import Context from '../../Context/Context'
import TopTab from '../../Components/TopTab'
import { Feather, FontAwesome, Ionicons } from 'react-native-vector-icons'
import { Switch } from '@rneui/themed';
import { BottomSheet } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';


const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

export default function AboutPage() {
  const { background_color, text_color, changeColor, open, settingsColor, showVisible, isVisible } = useContext(Context)
  // const [userName, setUserName] = useState('');
  const [username, setUsername] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation()
  

   // Function to open the image picker
   const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImageUri(imageUri);
      console.log(imageUri);
      // You can use 'imageUri' elsewhere in your code as needed
    }
  };
  

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

        setUsername(response.data.username);
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
      <TopTab page={'About'} />
      {/* <Text style={[styles.text, { color: text_color }]} onPress={changeColor}>AboutPage</Text> */}
      <View style={styles.content}>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 200, width: 200, marginBottom: 12, bottom: 8 }}>
          <View style={{ height: 200, width: 200, alignItems: 'center', justifyContent: 'center', borderRadius: 100, }}>
            <Image
              source={require('../../Images/Cartoon.jpg')}
              style={{ height: 120, width: 120, margin: 15, borderRadius: 100 }}
              resizeMode='contain'
            />
            <Pressable style={{ height: 37, width: 37, borderRadius: 100, bottom: 47, left: 32, justifyContent: 'center', alignItems: 'center', backgroundColor: text_color }} onPress={pickImage}>
              <Feather name='camera' size={18} color={background_color} />
            </Pressable>
          </View>
          <Text style={[styles.username, { color: text_color }]}>{username}</Text>
          <Text style={[styles.desc, { color: text_color }]}>Hey I am using D CHAT </Text>

        </View>
        <View style={[styles.colcontent, ]}>
          <Switch onChange={changeColor} value={open} color={text_color} />
          <Pressable onPress={()=>{navigation.navigate('Update')}}>
            <FontAwesome name='edit' color={text_color} size={25} />
          </Pressable>
        </View>
        {/* <BottomSheet isVisible={isVisible} >
          <View style={[styles.bottomsheetview,{backgroundColor:settingsColor}]}>
            <Pressable style={styles.bottomsheetbtn}>
              <Text style={styles.bottomsheetbtntxt}>
                Change Username
              </Text>
            </Pressable>
            <View style={{height:2,backgroundColor:'grey',width:width-20}}></View>
            <Pressable style={styles.bottomsheetbtn}>
              <Text style={styles.bottomsheetbtntxt}>
                Change Description
              </Text>
            </Pressable>
            <View style={{height:2,backgroundColor:'grey',width:width-20}}></View>
            <Text style={styles.bottomsheetbtncancel} onPress={showVisible}>
              Cancel
            </Text>
          </View>
        </BottomSheet> */}
        
      </View>
      <BottomTab page={'About'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    fontWeight: '600'
  },
  content: {
    height: 'auto',
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  colcontent: {
    height: 60,
    width: width / 3,
    marginHorizontal: 'auto',
    marginVertical: 15,
    paddingHorizontal: 17,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
  },
  rowcontent: {
    height: 60,
    width: width - 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    padding: 15
  },
  divider: {
    height: 2,
    width: width - 40,

  },
  bottomsheetview: {
    // backgroundColor: 'white',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius:22,
    borderTopRightRadius:22,
  },
  bottomsheettitle: {
    fontSize: 22,
    marginLeft: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
    color: '#305F96'
  },
  bottomsheetinput: {
    height: 40,
    width: width / 1.2,
    margin: 10,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#305F96',
    fontSize: 18
  }, 
  bottomsheetbtn: {
    // backgroundColor: '#305F96',
    borderRadius: 14,
    margin: 10,
    padding: 10,
    width: width / 1.4
  },
  bottomsheetbtntxt: {
    fontSize: 22,
    color: '#305F96',
    textAlign: 'center',
    fontWeight: 'bold',
    
  },
  bottomsheetbtncancel: {
    color: '#D22B2B',
    fontSize: 17,
    marginVertical: 8,
    fontWeight: '600'
  },

})