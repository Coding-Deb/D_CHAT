import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopTab from '../../Components/TopTab'

export default function ChatPage() {
  return (
    <View style={styles.container}>
        <TopTab page={'Chat'}/>
      <Text>ChatPage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        alignItems:'center',

    }
})