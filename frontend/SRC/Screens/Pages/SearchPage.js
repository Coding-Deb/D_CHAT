import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import Context from '../../Context/Context';
import TopTab from '../../Components/TopTab';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function SearchPage() {
  const {text_color , background_color} = useContext(Context)
  return (
    <View style={[styles.container,{backgroundColor:background_color}]}>
      <TopTab page={'Search'}/>
      <View style={styles.inputbox}>
        <TextInput cursorColor={text_color} style={[styles.input]} placeholder='Search Here ...' />
      </View>
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
})