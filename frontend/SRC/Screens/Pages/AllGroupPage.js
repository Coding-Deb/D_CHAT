import { Dimensions, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import BottomTab from '../../Components/BottomTab'
import Context from '../../Context/Context'
import TopTab from '../../Components/TopTab'
import { BottomSheet } from '@rneui/themed'
// import { TouchableOpacity } from '@gorhom/bottom-sheet'


const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

export default function AllGroupPage() {
  const { background_color, text_color, showVisible, isVisible , settingsColor} = useContext(Context)
  const [groupName, setGroupName] = useState('');

  const handleGroupNameChange = (text) => {
    setGroupName(text);
  };

  const handleSubmit = () => {
    // Add your logic for handling the submitted group name here
    console.log('Submitted Group Name:', groupName);
    setGroupName('')
  };
  return (
    <View style={[styles.container, { backgroundColor: background_color }]}>
      <TopTab page={'Allgroup'} />

      <View style={{ justifyContent: 'space-between', height: height - 130 }}>
        <View style={styles.main}>
          <View style={styles.inputbox}>
           </View>
          <Text style={styles.text}>
            Groups
          </Text>
          <BottomSheet isVisible={isVisible} >
            <View style={{
              backgroundColor: settingsColor, width: width, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
            }}>
              <View>
                <Text style={{ fontSize: 22, marginLeft: 10, paddingVertical: 10, fontWeight: 'bold', color: '#305F96' }}>Name Of Group</Text>
              </View>

              <TextInput
                style={{ height: 40, width: width / 1.2, margin: 10, padding: 10, borderBottomWidth: 2, borderBottomColor: '#305F96', fontSize: 18 }}
                placeholder="Enter Group Name"
                placeholderTextColor='#305F96'
                cursorColor='#305F96'
                value={groupName}
                onChangeText={handleGroupNameChange}
              />

              <TouchableOpacity
                style={{ backgroundColor: '#305F96', borderRadius: 14, margin: 10, padding: 10, width: width / 1.4 }}
                onPress={handleSubmit}
              >
                <Text style={{ fontSize: 22, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Create Group</Text>
              </TouchableOpacity>
              <Text style={{ color: '#D22B2B', fontSize: 17, marginVertical: 8, fontWeight: '600' }} onPress={showVisible}>
                Cancel
              </Text>
            </View>
          </BottomSheet>

        </View>

        <BottomTab page={'Allgroup'} />
      </View>
    </View>
  );
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
    marginVertical: 8
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