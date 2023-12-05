import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Context from '../../Context/Context';
import TopTab from '../../Components/TopTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function ProfileScreen() {
    const Route = useRoute()
    const { text_color, background_color,changfollow, isFollowing} = useContext(Context)
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const handleFollow = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const userIdToFollow = Route.params.id;
            const response = isFollowing
                ? await axios.post(
                      `http://192.168.157.210:5000/api/auth/unfollow/${userIdToFollow}`,
                      {},
                      {
                          headers: {
                              Authorization: `Bearer ${token}`,
                          },
                      }
                  )
                : await axios.post(
                      `http://192.168.157.210:5000/api/auth/follow/${userIdToFollow}`,
                      {},
                      {
                          headers: {
                              Authorization: `Bearer ${token}`,
                          },
                      }
                  );

            changfollow(); // Call changfollow to update the isFollowing state
            console.log(response.data);
            // You might want to update the follower count here or trigger a refresh
            getFollowing();
        } catch (error) {
            console.error('Axios error:', error);
        }
    };

    const getFollowing = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(
                `http://192.168.157.210:5000/api/auth/getfollowing`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setFollowingCount(response.data.following.length);
            console.log(response.data.following.length);
        } catch (error) {
            console.error('Axios error:', error);
        }
    };
    const getFollowers = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(
                `http://192.168.157.210:5000/api/auth/getfollower`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setFollowerCount(response.data.followers.length);
            console.log(response.data.followers.length);
        } catch (error) {
            console.error('Axios error:', error);
        }
    };
    

    useEffect(() => {
        getFollowing();
        getFollowers()
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: background_color }]}>
            <TopTab page={'Profile'} />
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 25, alignContent: 'center', alignSelf: 'center' }}>

                <Image
                    source={require('../../Images/Cartoon.jpg')}
                    style={{ borderRadius: 100, height: 120, width: 120, marginVertical: 15 }}
                />
                <Text style={[styles.headerName, { color: text_color }]}>{Route.params.name}</Text>
                <Pressable
                    style={[
                        styles.btn,
                        { backgroundColor: '#6495ED', shadowColor: background_color },
                    ]}
                    onPress={handleFollow}
                >
                    {isFollowing ? (
                        <Text style={[styles.btntext, { color: background_color }]}>
                            Following
                        </Text>
                    ) : (
                        <Text style={[styles.btntext, { color: background_color }]}>
                            Follow
                        </Text>
                    )}
                </Pressable>
                <View style={[styles.showfollow, { backgroundColor: background_color }]}>
                    <View style={styles.folloing}>
                        <Text style={[styles.text, { color: text_color }]}>
                            Follower
                        </Text>
                        <Text style={[styles.text, { color: text_color }]}>
                            {followerCount}
                        </Text>
                    </View>
                    <View style={{ width: 2, backgroundColor: text_color }}></View>
                    <View style={styles.folloing}>
                        <Text style={[styles.text, { color: text_color }]}>
                            Following
                        </Text>
                        <Text style={[styles.text, { color: text_color }]}>
                            {followingCount} {/* Display follower count here */}
                        </Text>
                    </View>

                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={[styles.headerName, { color: text_color }]}>
                        All Post
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: width / 1.6,
        borderRadius: 25,
        paddingVertical: 13,
        marginTop: 10,
        elevation: 6,
        shadowOffset: { width: -8, height: -7 },
        shadowOpacity: 0.9,
        // backgroundColor:"#FFF",
        alignSelf: 'center',
    },
    btntext: {
        // color:'black',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        letterSpacing: 0.2,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 15,
        fontWeight: '700',
    },
    headerName: {
        fontSize: 24,
        fontWeight: '700',
    },

    showfollow: {
        width: width / 1.6,
        borderRadius: 25,
        paddingVertical: 13,
        marginTop: 10,
        elevation: 6,
        shadowOffset: { width: -8, height: -7 },
        shadowOpacity: 0.9,
        // backgroundColor:"#FFF",
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    folloing: {
        // backgroundColor:'green',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8
    },

})