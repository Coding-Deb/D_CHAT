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

export default function TopTab({ page }) {
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
    <View style={[styles.container, { backgroundColor: background_color, borderBottomWidth: 2, borderBottomColor: 'grey' }]}>
      {page === 'About' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: text_color }]}>Profile</Text>
          <Pressable onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={30} color={text_color} />
          </Pressable>
        </View>
      ) : null}
      {page === 'Allchat' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: text_color }]}>D CHAT</Text>
          <View style={{ flexDirection: 'row' }}>
            <Pressable style={{ marginHorizontal: 9 }} onPress={() => { navigation.navigate('AllPost') }}>
              <FontAwesome5 name="at" size={25} color={text_color} />
            </Pressable>
            <Pressable style={{ marginHorizontal: 9 }} onPress={() => { navigation.navigate('Search') }}>
              <Entypo name='magnifying-glass' size={27} color={text_color} />
            </Pressable>
            <Pressable style={{ marginHorizontal: 9 }} onPress={() => { navigation.navigate('Notification') }}>
              <FontAwesome name="bell" size={25} color={text_color} />
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
          <Text style={[styles.text, { color: text_color }]}>Groups</Text>
          <View style={{ flexDirection: 'row' }}>
            <Pressable style={{ marginHorizontal: 9 }} onPress={() => { navigation.navigate('Search') }}>
              <Entypo name='magnifying-glass' size={27} color={text_color} />
            </Pressable>
            <Pressable style={{ marginHorizontal: 9 }} onPress={showVisible}>
              <FontAwesome name="edit" size={28} color={text_color} />
            </Pressable>
            <Pressable style={{ marginHorizontal: 9 }}>
              <Ionicons name="ellipsis-vertical-outline" size={28} color={text_color} />
            </Pressable>
          </View>
        </View>
      ) : null}
      {page === 'AllPost' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: text_color }]}>
            Posts
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
            <Pressable style={{ marginHorizontal: 7, backgroundColor: '#D3D3D3', borderRadius: 50 }} onPress={()=>{navigation.navigate('Posts')}}>
              <Entypo name="plus" size={32} color={text_color} />
            </Pressable>
            <Pressable style={{ marginHorizontal: 7 }} onPress={() => { navigation.navigate('Search') }}>
              <Entypo name='magnifying-glass' size={27} color={text_color} />
            </Pressable>

          </View>
        </View>
      ) : null}
      {page === 'Notification' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: text_color }]}>
            Notification
          </Text>
        </View>
      ) : null}
      {page === 'Search' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: text_color }]}>
            Search
          </Text>
        </View>
      ) : null}
      {page === 'Users' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: text_color }]}>
            All Users
          </Text>
          <Pressable style={{ marginHorizontal: 7 }} onPress={() => { navigation.navigate('Search') }}>
              <Entypo name='magnifying-glass' size={27} color={text_color} />
            </Pressable>
        </View>
      ) : null}
      {page === 'Chat' ? (
        <View style={styles.topbar}>
          <Text style={[styles.text, { color: text_color }]}>
            Tridip
          </Text>
          <Pressable style={{ marginHorizontal: 7 }} onPress={() => { navigation.navigate('Search') }}>
              <Entypo name='phone' size={27} color={text_color} />
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
