import { Dimensions, FlatList, StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import TopTab from '../../Components/TopTab';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../../Context/Context';
import { FontAwesome, MaterialIcons, Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function AllPostPage() {
  const { background_color, text_color, isliked, ShowLiked } = useContext(Context);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likesStatus, setLikesStatus] = useState({});

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://192.168.157.210:5000/api/auth/receive_all_post', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const posts = response.data.posts; // Extract posts from the response data

        // Initialize likesStatus with default values (false) for each post
        const initialLikesStatus = posts.reduce((acc, post) => {
          acc[post._id] = false;
          return acc;
        }, {});
        setLikesStatus(initialLikesStatus);

        setPostData(posts);
      } catch (error) {
        console.error('Error fetching post data:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchPostData();
  }, []);

  const handleLikeToggle = (postId) => {
    setLikesStatus((prevLikesStatus) => ({
      ...prevLikesStatus,
      [postId]: !prevLikesStatus[postId],
    }));
  };

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
      <FlatList
        data={postData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: post }) => {
          const isPostLiked = likesStatus[post._id];

          return (
            <View key={post._id} style={[styles.card, { backgroundColor: background_color }]}>
              <Text style={[styles.cardtextpoststext, { color: text_color }]}>{post.userId.username}</Text>
              <View style={{ height: 1, width: width - 50, backgroundColor: 'grey' }}></View>
              <Text style={[styles.cardtextpoststext, { color: text_color }]}>{post.postText}</Text>
              <View style={styles.iconRow}>
                <Pressable onPress={() => handleLikeToggle(post._id)}>
                  <MaterialCommunityIcons
                    name={isPostLiked ? 'thumb-up' : 'thumb-up-outline'}
                    size={24}
                    color="blue"
                    style={styles.icon}
                  />
                </Pressable>
                <Pressable>
                  <MaterialIcons name="share" size={24} color="green" style={styles.icon} />
                </Pressable>
                <Pressable>
                  <MaterialIcons name="delete" size={24} color="red" style={styles.icon} />
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: width - 15,
    backgroundColor: '#FAF9F6',
    padding: 15,
    marginVertical: 5,
  },
  cardtexttitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardtextpoststext: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});
