import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import TopTab from '../../Components/TopTab'
import Context from '../../Context/Context'

export default function AllPostPage() {
    const {background_color, text_color,} = useContext(Context)
    return (
        <View style={[styles.container,{backgroundColor:background_color}]}>
            <TopTab page={'AllPost'} />
            <Text style={{color:text_color}}>AllPostPage</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        
    }
})