import React, { useContext } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome, FontAwesome5, Entypo, Feather } from 'react-native-vector-icons';
import { ListItem } from '@rneui/themed';
import { Overlay } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from '../Context/Context';
import { useNavigation, useRoute } from '@react-navigation/native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function TopTab({ page, name, id }) {
  const { background_color, text_color, showVisible } = useContext(Context);
  const navigation = useNavigation()
  const handleLogout = async () => {
    // Remove the token from AsyncStorage
    await AsyncStorage.removeItem('token');
    console.log('User Logged Out');

    // Navigate to the login screen
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, { backgroundColor: '#5D3FD3', borderBottomLeftRadius:17,borderBottomRightRadius:17, }]}>
      {page === 'About' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: 'white' }]}>Profile</Text>
          <Pressable onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={30} color='white' />
          </Pressable>
        </View>
      ) : null}
      {page === 'Allchat' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: 'white' }]}>D CHAT</Text>
          <View style={{ flexDirection: 'row' }}>
            <Pressable style={{ marginHorizontal: 9 }} onPress={() => { navigation.navigate('AllPost') }}>
              <FontAwesome5 name="at" size={25} color='white' />
            </Pressable>
            <Pressable style={{ marginHorizontal: 9 }} onPress={() => { navigation.navigate('Search') }}>
              <Entypo name='magnifying-glass' size={27} color='white' />
            </Pressable>
            <Pressable style={{ marginHorizontal: 9 }} onPress={() => { navigation.navigate('Notification') }}>
              <FontAwesome name="bell" size={25} color='white' />
              <View style={{ backgroundColor: text_color, height: 17, width: 17, borderRadius: 50, position: 'absolute', right: -10, top: -5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: background_color }}>
                  2
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      ) : null}
      {page === 'Allgroup' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: 'white' }]}>Groups</Text>
          <View style={{ flexDirection: 'row' }}>
            <Pressable style={{ marginHorizontal: 9 }} onPress={() => { navigation.navigate('Search') }}>
              <Entypo name='magnifying-glass' size={27} color='white' />
            </Pressable>
            <Pressable style={{ marginHorizontal: 9 }} onPress={showVisible}>
              <FontAwesome name="edit" size={28} color='white' />
            </Pressable>
            <Pressable style={{ marginHorizontal: 9 }}>
              <Ionicons name="ellipsis-vertical-outline" size={28} color='white' />
            </Pressable>
          </View>
        </View>
      ) : null}
      {page === 'AllPost' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: 'white' }]}>
            Posts
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
            <Pressable style={{ marginHorizontal: 7, borderRadius: 50 }} onPress={() => { navigation.navigate('Posts') }}>
              <Feather name="plus-circle" size={29} color='white' />
            </Pressable>
            <Pressable style={{ marginHorizontal: 7 }} onPress={() => { navigation.navigate('Search') }}>
              <Entypo name='magnifying-glass' size={27} color='white' />
            </Pressable>

          </View>
        </View>
      ) : null}
      {page === 'Notification' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: 'white' }]}>
            Notification
          </Text>
        </View>
      ) : null}
      {page === 'Search' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: 'white' }]}>
            Search
          </Text>
        </View>
      ) : null}
      {page === 'Profile' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: 'white' }]}>
            Profile
          </Text>
        </View>
      ) : null}
      {page === 'Users' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: 'white' }]}>
            All Users
          </Text>
          <Pressable style={{ marginHorizontal: 7 }} onPress={() => { navigation.navigate('Search') }}>
            <Entypo name='magnifying-glass' size={27} color='white' />
          </Pressable>
        </View>
      ) : null}
      {page === 'Chat' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: 'white' }]} onPress={() => { navigation.navigate('userProfile', { name: name, id: id }) }}>
            {name}
          </Text>
          <Pressable style={{ marginHorizontal: 7 }} onPress={() => { navigation.navigate('Search') }}>
            <Entypo name='phone' size={27} color='white' />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: width,
    justifyContent: 'center',
    paddingHorizontal: 22,

  }, 
  text: {
    fontSize: 25,
    fontWeight: '800',
  },
  topbar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: width / 5,
  },
});
