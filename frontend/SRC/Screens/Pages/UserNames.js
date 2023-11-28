import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import BottomTab from '../../Components/BottomTab'
import Context from '../../Context/Context'
import TopTab from '../../Components/TopTab'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

export default function UserNames() {
  const {background_color,text_color} = useContext(Context)
  return (
    <View style={[styles.container, { backgroundColor: background_color }]}>
      {/* <TopTab page={'UserNames'} /> */}
      {/* <Text style={[styles.text,{color: text_color}]}>AllChat Page</Text> */}
      <View style={{ justifyContent: 'space-between', height: height - 130 , marginVertical:8}}>
        <View style={styles.main}>
        <View style={styles.inputbox}>
          <TextInput cursorColor={text_color} style={[styles.input]} placeholder='Search Here ...' />
        </View>
          <Text style={[styles.text,{color:text_color}]}>
            Users
          </Text>
        </View>
        {/* <BottomTab page={'UserNames'} /> */}
      </View>
    </View>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  main: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:8
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
})