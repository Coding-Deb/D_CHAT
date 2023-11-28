import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import TopTab from '../../Components/TopTab'
import Context from '../../Context/Context'
import SampleApi from '../../Api/SampleApi'
import { FontAwesome, Entypo } from '@expo/vector-icons'; // Import the icon from the vector icon library

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function AllPostPage() {
    const { background_color, text_color, isliked, ShowLiked } = useContext(Context)
    const [data, setData] = useState(SampleApi);
    return (
        <View style={[styles.container, { backgroundColor: 'grey' }]}>
            <TopTab page={'AllPost'} />
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width: width, marginVertical: 5, backgroundColor: background_color }}>
                            <View style={{ width: width, paddingHorizontal: 12 }}>
                                <Text style={{ color: text_color, fontSize: 22, fontWeight: 'bold' }}>
                                    {item.Name}
                                </Text>
                                <Text style={{ color: text_color, fontSize: 17, fontWeight: 'bold' }}>
                                    {item.Email}
                                </Text>
                            </View>
                            <Image
                                source={item.imgurl}
                                style={{ width: width }}
                            />
                            <View style={{ backgroundColor: background_color, padding: 14, flexDirection: 'row' }}>
                                        <Pressable style={{ marginHorizontal: 8 }} onPress={ShowLiked}>
                                            <FontAwesome name={isliked === true ? 'heart' : 'heart-o'} size={25} color={text_color} />
                                        </Pressable>
                                        
                                <Pressable style={{ marginHorizontal: 8 }}>
                                    <Entypo name='share' size={25} color={text_color} />
                                </Pressable>

                            </View>
                        </View>
                    )
                }
                }
            />
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