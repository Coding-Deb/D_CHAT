import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import {Ionicons, AntDesign , Feather} from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native'
import Context from '../Context/Context'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

export default function BottomTab({ page }) {
  const {background_color,text_color} = useContext(Context)
  const navigation = useNavigation()
  return (
    <View style={[styles.container,{backgroundColor:background_color}]}>
      {
        page === 'Allchat' ?
          <Pressable onPress={()=>{navigation.navigate('AllChat')}}>
            <Ionicons name='chatbox-outline' size={24} color={text_color}/>
            <View style={[styles.btn,{backgroundColor: text_color}]}>

            </View>
          </Pressable>
          :
          <Pressable onPress={()=>{navigation.navigate('AllChat')}}>
            <Ionicons name='chatbox-outline' size={24} color={text_color}/>
          </Pressable>
      }
      {
        page === 'Allgroup' ?
          <Pressable onPress={()=>{navigation.navigate('AllGroup')}}>
            <Feather name='users' size={24} color={text_color}/>
            <View style={[styles.btn,{backgroundColor: text_color}]}>

            </View>
          </Pressable>
          :
          <Pressable onPress={()=>{navigation.navigate('AllGroup')}}>
            <Feather name='users' size={24} color={text_color}/>
          </Pressable>
      }
      {
        page === 'About' ?
          <Pressable onPress={()=>{navigation.navigate('About')}}>
            <AntDesign name='user' size={24} color={text_color}/>
            <View style={[styles.btn,{backgroundColor: text_color}]}>

            </View>
          </Pressable>
          :
          <Pressable onPress={()=>{navigation.navigate('About')}}>
            <AntDesign name='user' size={24} color={text_color}/>
          </Pressable>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: width ,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    bottom:0
  },
  btn:{
    height:2,
    // width:50,
    marginTop:5,
    justifyContent:'center',
    alignItems:'center'
  }
})