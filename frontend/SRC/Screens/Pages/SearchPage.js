import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context/Context';
import TopTab from '../../Components/TopTab';
import axios from 'axios';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function SearchPage() {
  const { text_color, background_color } = useContext(Context)
  const [searchText, setSearchText] = useState("");
  const [userdata, setUserdata] = useState([])
  const [chatdata, setChatdata] = useState([])
  const [postdata, setPostdata] = useState([])

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await axios.get(`http://192.168.157.210:5000/api/auth/search/${searchText}`);
        // setData(response.data.chatResults);
        // console.log(response.data.chatResults);
        // console.log(response.data.postResults);
        // console.log(response.data.userResults);
        setChatdata(response.data.chatResults);
        setPostdata(response.data.postResults);
        setUserdata(response.data.userResults);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Only trigger the API call if searchText is not empty
    if (searchText.trim() !== "") {
      fetchSearch();
    }
  }, [searchText]);



  return (
    <View style={[styles.container, { backgroundColor: background_color }]}>
      <TopTab page={'Search'} />
      <View style={styles.inputbox}>
        <TextInput
          cursorColor={text_color}
          style={[styles.input]}
          placeholder='Search Here ...'
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cards}>
          <Text style={[styles.cardtext, { color: text_color }]}>
            CHAT:
          </Text>
        </View>

        {searchText != '' ?
          chatdata.map((item) => {
            return (
              <View key={item._id} style={[styles.mapdata,{backgroundColor: '#097969'}]}>
                <Text style={[styles.cardtextfetch, { color: 'white' }]}>
                  {item.message}
                </Text>
              </View>
            )
          })
          :
          null
        }
        <View style={styles.cards}>
          <Text style={[styles.cardtext, { color: text_color }]}>
            POST:
          </Text>
        </View>
          {searchText != '' ?
            postdata.map((item) => {
              return (
                <View key={item._id} style={[styles.mapdata,{backgroundColor: '#00008B'}]}>
                  <Text style={[styles.cardtextfetch, { color: 'white' }]}>
                    {item.postText}
                  </Text>
                </View>
              )
            })
            :
            null
          }
        <View style={styles.cards}>
          <Text style={[styles.cardtext, { color: text_color }]}>
            USER:
          </Text>
        </View>
          {searchText != '' ?
            userdata.map((item) => {
              return (
                <View key={item._id} style={[styles.mapdata,{backgroundColor: '#800020'}]}>
                  <Text style={[styles.cardtextfetch, { color: 'white' }]}>
                    {item.username}
                  </Text>
                </View>
              )
            })
            :
            null
          }

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
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
  cards: {
    width: width,
    // backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 8
  },
  cardtext: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  cardtextfetch: {
    fontSize: 15,
    fontWeight: '700'
  },
  mapdata:{
    padding:12,
    marginVertical:8,

  }
})
