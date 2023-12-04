import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Context from '../../Context/Context';
import TopTab from '../../Components/TopTab';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function ProfileScreen() {
    const Route = useRoute()
    const { text_color, background_color,isfollow,changfollow  } = useContext(Context)
    return (
        <View style={[styles.container, { backgroundColor: background_color }]}>
            <TopTab page={'Profile'} />
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 25, alignContent: 'center', alignSelf: 'center' }}>

                <Image
                    source={require('../../Images/Cartoon.jpg')}
                    style={{ borderRadius: 100, height: 120, width: 120, marginVertical: 15 }}
                />
                <Text style={[styles.headerName, { color: text_color }]}>{Route.params.name}</Text>
                <Pressable style={[styles.btn, { backgroundColor: '#6495ED', shadowColor: background_color }]} onPress={changfollow}>
                    {
                        isfollow ?
                            <Text style={[styles.btntext, { color: background_color }]}>
                                Follow
                            </Text>
                            :
                            <Text style={[styles.btntext, { color: background_color }]}>
                                Following
                            </Text>
                    }
                </Pressable>
                <View style={[styles.showfollow, { backgroundColor: background_color }]}>
                    <View style={styles.folloing}>
                        <Text style={[styles.text, { color: text_color }]}>
                            Following
                        </Text>
                        <Text style={[styles.text, { color: text_color }]}>
                            25
                        </Text>
                    </View>
                    <View style={{ width: 2, backgroundColor: text_color }}></View>
                    <View style={styles.folloing}>
                        <Text style={[styles.text, { color: text_color }]}>
                            Following
                        </Text>
                        <Text style={[styles.text, { color: text_color }]}>
                            25
                        </Text>
                    </View>

                </View>
                <View style={{marginTop:15}}>
                    <Text style={[styles.headerName,{color: text_color}]}>
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