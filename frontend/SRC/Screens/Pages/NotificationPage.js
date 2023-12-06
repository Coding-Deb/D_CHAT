import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import TopTab from '../../Components/TopTab'
import Context from '../../Context/Context'
import axios from 'axios'

export default function NotificationPage() {
  const {background_color, text_color,} = useContext(Context)
  const [data, setData] = useState([]);
  // const getNotifications = async ()=>{
  //   let response = await axios.get('http://192.168.157.210:5000/api/auth/656f1ef434ea0d5f39b47a0c')
  //   console.log(response.data);
  //   setData(response.data)
  // }
  // useEffect(() => {
  //   getNotifications()
  // }, []);
  return (
    <View style={[styles.container,{backgroundColor:background_color}]}>
      <TopTab page={'Notification'}/>
      <Text style={{color:text_color}}>NotificationPage</Text>
      {/* {
        data ?
        data.map((item)=>{
          return(
            <View>
              <Text>
                {item.message}
              </Text>
              </View>
          )
        })
        :
        <Text>
          No Notificatin
        </Text>
      } */}
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