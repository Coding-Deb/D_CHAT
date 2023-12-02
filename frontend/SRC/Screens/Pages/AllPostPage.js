import { Dimensions, FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import TopTab from '../../Components/TopTab';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../../Context/Context';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function AllPostPage() {
  const { background_color, text_color, isliked, ShowLiked } = useContext(Context);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://192.168.157.210:5000/api/auth/receive_post', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchPostData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: 'grey', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: 'grey' }]}>
      <TopTab page={'AllPost'} />
      {postData.map((post) => (
        <View key={post._id} style={styles.card}>
        <Text style={[styles.cardtexttitle,{color:text_color}]}>{post.userId}</Text>
        <View style={{height:1,width:width-50,backgroundColor:'grey'}}></View>
        <Text style={[styles.cardtextpoststext,{color:text_color}]}>{post.postText}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card:{
    width:width-15,
    backgroundColor:'#FAF9F6',
    padding: 15,
    marginVertical:12
  },
  cardtexttitle:{
    fontSize:20,
    fontWeight:'bold',
  },
  cardtextpoststext:{
    fontSize:17,
    fontWeight:'bold',
  }
});
