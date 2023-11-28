import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import TopTab from '../../Components/TopTab'
import Context from '../../Context/Context'

export default function NotificationPage() {
  const {background_color, text_color,} = useContext(Context)
  return (
    <View style={[styles.container,{backgroundColor:background_color}]}>
      <TopTab page={'Notification'}/>
      <Text style={{color:text_color}}>NotificationPage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent:'center'
      },
})